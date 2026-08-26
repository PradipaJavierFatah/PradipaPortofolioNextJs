"use client";

import { useEffect, useMemo, useRef } from "react";

export type DitherRenderMode =
    | "characters" | "dither" | "mosaic" | "pixel" | "dots" | "cross" | "diamond"
    | "voxel" | "lego" | "mixed" | "lines" | "diagonal" | "braille" | "disco"
    | "hexdump" | "matrix" | "rings" | "hearts" | "stars" | "hexagons"
    | "triangles" | "bubbles" | "hatch" | "contour" | "halfblocks";

type AnimStyle = "wave" | "pulse" | "shimmer" | "ripple" | "flicker";
type BgMode = "none" | "blurred" | "solid" | "source";
type BlurType = "off" | "gaussian" | "directional" | "progressive" | "lens" | "tilt";
type BlendMode = GlobalCompositeOperation;

type ToggleIntensity = { enabled: boolean; intensity: number };
type PfxConfig = Record<
    "scanLines" | "vignette" | "bloom" | "chromatic" | "filmGrain" | "glitch" | "halftone" | "pixelate" | "filmDust",
    ToggleIntensity
>;

type LightPoint = { x: number; y: number; radius: number; intensity: number };
type TonePoint = { x: number; y: number };

type MaskConfig = {
    enabled: boolean;
    invert: boolean;
    dataUrl: string;
};

export type DitherRecipe = {
    renderMode: DitherRenderMode;
    bgMode: BgMode;
    bgBlur: number;
    bgOpacity: number;
    cellSize: number;
    coverage: number;
    invert: boolean;
    styleBlend: BlendMode;
    charSet: "standard" | "blocks" | "minimal" | "custom";
    customChars: string;
    brightness: number;
    contrast: number;
    edgeEmphasis: number;
    density: number;
    toneCurve: TonePoint[];
    tint: string;
    tintOpacity: number;
    overlayBlend: "multiply" | "screen" | "overlay" | "source-over";
    saturation: number;
    grayscale: number;
    blurType: BlurType;
    blurAmount: number;
    blurAngle: number;
    directionalBothSides: boolean;
    tiltFocus: number;
    tiltPosition: number;
    tiltFeather: number;
    lensFocus: number;
    blurCenterX: number;
    blurCenterY: number;
    progressivePosition: number;
    progressiveReverse: boolean;
    pfx: PfxConfig;
    animated: boolean;
    animStyle: AnimStyle;
    animSpeed: ToggleIntensity;
    animIntensity: ToggleIntensity;
    lights: { enabled: boolean; points: LightPoint[] };
    mask: MaskConfig;
};

export const defaultDitherRecipe: DitherRecipe = {
    renderMode: "dither",
    bgMode: "none",
    bgBlur: 12,
    bgOpacity: 90,
    cellSize: 9,
    coverage: 100,
    invert: false,
    styleBlend: "source-over",
    charSet: "standard",
    customChars: "",
    brightness: 100,
    contrast: 100,
    edgeEmphasis: 0,
    density: 24,
    toneCurve: [{ x: 0, y: 0 }, { x: 0.28, y: 0.14 }, { x: 0.72, y: 0.86 }, { x: 1, y: 1 }],
    tint: "#d8b46a",
    tintOpacity: 0,
    overlayBlend: "multiply",
    saturation: 100,
    grayscale: 0,
    blurType: "off",
    blurAmount: 35,
    blurAngle: 0,
    directionalBothSides: false,
    tiltFocus: 35,
    tiltPosition: 50,
    tiltFeather: 15,
    lensFocus: 40,
    blurCenterX: 50,
    blurCenterY: 50,
    progressivePosition: 55,
    progressiveReverse: false,
    pfx: {
        vignette: { enabled: false, intensity: 38 },
        scanLines: { enabled: false, intensity: 40 },
        chromatic: { enabled: true, intensity: 15 },
        bloom: { enabled: false, intensity: 25 },
        filmGrain: { enabled: false, intensity: 30 },
        glitch: { enabled: false, intensity: 20 },
        pixelate: { enabled: false, intensity: 15 },
        halftone: { enabled: false, intensity: 20 },
        filmDust: { enabled: false, intensity: 20 },
    },
    animated: true,
    animStyle: "flicker",
    animSpeed: { enabled: true, intensity: 80 },
    animIntensity: { enabled: true, intensity: 30 },
    lights: { enabled: true, points: [] },
    mask: { enabled: false, invert: true, dataUrl: "" },
};

type DitherRecipeOverrides = Omit<Partial<DitherRecipe>, "pfx" | "animSpeed" | "animIntensity" | "lights" | "mask"> & {
    pfx?: Partial<PfxConfig>;
    animSpeed?: Partial<ToggleIntensity>;
    animIntensity?: Partial<ToggleIntensity>;
    lights?: Partial<DitherRecipe["lights"]>;
    mask?: Partial<MaskConfig>;
};

type DitherEffectProps = {
    src: string;
    recipe?: DitherRecipeOverrides;
    className?: string;
};

type Cell = { r: number; g: number; b: number; lum: number; edge: number };

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function mergeRecipe(recipe?: DitherRecipeOverrides): DitherRecipe {
    return {
        ...defaultDitherRecipe,
        ...recipe,
        pfx: { ...defaultDitherRecipe.pfx, ...(recipe?.pfx ?? {}) },
        animSpeed: { ...defaultDitherRecipe.animSpeed, ...(recipe?.animSpeed ?? {}) },
        animIntensity: { ...defaultDitherRecipe.animIntensity, ...(recipe?.animIntensity ?? {}) },
        lights: { ...defaultDitherRecipe.lights, ...(recipe?.lights ?? {}) },
        mask: { ...defaultDitherRecipe.mask, ...(recipe?.mask ?? {}) },
    };
}

function parseHex(hex: string) {
    const value = hex.replace("#", "");
    const normalized = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
    const number = Number.parseInt(normalized, 16);
    return {
        r: Number.isNaN(number) ? 216 : (number >> 16) & 255,
        g: Number.isNaN(number) ? 180 : (number >> 8) & 255,
        b: Number.isNaN(number) ? 106 : number & 255,
    };
}

function overlayChannel(base: number, layer: number) {
    const normalized = base / 255;
    const tint = layer / 255;
    return (normalized < 0.5 ? 2 * normalized * tint : 1 - 2 * (1 - normalized) * (1 - tint)) * 255;
}

function toneMap(value: number, points: TonePoint[]) {
    if (points.length < 2) return value;
    const sorted = [...points].sort((a, b) => a.x - b.x);
    for (let index = 1; index < sorted.length; index += 1) {
        const left = sorted[index - 1];
        const right = sorted[index];
        if (value <= right.x) {
            const range = right.x - left.x || 1;
            return clamp(lerp(left.y, right.y, (value - left.x) / range));
        }
    }
    return sorted[sorted.length - 1].y;
}

function coverImage(ctx: CanvasRenderingContext2D, image: CanvasImageSource, width: number, height: number) {
    const imageElement = image instanceof HTMLImageElement ? image : null;
    const dimensions = image as unknown as { width?: number; height?: number };
    const imageWidth = imageElement?.naturalWidth ?? dimensions.width ?? 0;
    const imageHeight = imageElement?.naturalHeight ?? dimensions.height ?? 0;
    if (!imageWidth || !imageHeight) return;
    const scale = Math.max(width / imageWidth, height / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function colorForCell(cell: Cell, recipe: DitherRecipe) {
    const brightness = recipe.brightness / 100;
    const contrast = recipe.contrast / 100;
    const saturation = recipe.saturation / 100;
    let r = 128 + ((cell.r * brightness) - 128) * contrast;
    let g = 128 + ((cell.g * brightness) - 128) * contrast;
    let b = 128 + ((cell.b * brightness) - 128) * contrast;
    const average = (r + g + b) / 3;
    r = lerp(average, r, saturation);
    g = lerp(average, g, saturation);
    b = lerp(average, b, saturation);
    const gray = (r * 0.299 + g * 0.587 + b * 0.114);
    r = lerp(r, gray, recipe.grayscale / 100);
    g = lerp(g, gray, recipe.grayscale / 100);
    b = lerp(b, gray, recipe.grayscale / 100);
    if (recipe.tintOpacity > 0) {
        const tint = parseHex(recipe.tint);
        const opacity = clamp(recipe.tintOpacity / 100);
        const blend = recipe.overlayBlend === "overlay"
            ? [overlayChannel(r, tint.r), overlayChannel(g, tint.g), overlayChannel(b, tint.b)]
            : recipe.overlayBlend === "multiply"
                ? [(r * tint.r) / 255, (g * tint.g) / 255, (b * tint.b) / 255]
                : [tint.r, tint.g, tint.b];
        r = lerp(r, blend[0], opacity);
        g = lerp(g, blend[1], opacity);
        b = lerp(b, blend[2], opacity);
    }
    return { r: Math.round(clamp(r, 0, 255)), g: Math.round(clamp(g, 0, 255)), b: Math.round(clamp(b, 0, 255)) };
}

function rgba(color: { r: number; g: number; b: number }, alpha: number) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${clamp(alpha)})`;
}

function charsFor(recipe: DitherRecipe) {
    if (recipe.charSet === "custom" && recipe.customChars) return recipe.customChars;
    if (recipe.charSet === "blocks") return "█▓▒░ ";
    if (recipe.charSet === "minimal") return "@#. ";
    return "@%#*+=-:. ";
}

function drawShape(
    ctx: CanvasRenderingContext2D,
    mode: DitherRenderMode,
    x: number,
    y: number,
    size: number,
    lum: number,
    color: { r: number; g: number; b: number },
    cellX: number,
    cellY: number,
    time: number,
    recipe: DitherRecipe,
) {
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const fill = rgba(color, 0.3 + lum * 0.7);
    const stroke = rgba(color, 0.45 + lum * 0.45);
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = Math.max(0.7, size * 0.08);

    if (mode === "mixed") {
        const modes: DitherRenderMode[] = ["dots", "diamond", "cross", "lines", "triangles"];
        mode = modes[(cellX + cellY) % modes.length];
    }

    switch (mode) {
        case "characters": {
            const chars = charsFor(recipe);
            const char = chars[Math.min(chars.length - 1, Math.floor(lum * chars.length))] ?? " ";
            ctx.font = `${Math.max(8, size * (0.72 + recipe.density / 100))}px ui-monospace, monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(char, centerX, centerY);
            break;
        }
        case "hexdump": {
            const hex = Math.floor(lum * 15).toString(16).toUpperCase();
            ctx.font = `${Math.max(7, size * 0.65)}px ui-monospace, monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(hex, centerX, centerY);
            break;
        }
        case "matrix": {
            const green = { r: 175, g: 238, b: 7 };
            ctx.fillStyle = rgba(green, 0.35 + lum * 0.65);
            ctx.font = `${Math.max(8, size * 0.72)}px ui-monospace, monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const code = "01アイカタ"[(cellX * 7 + cellY * 3 + Math.floor(time * 3)) % 8];
            ctx.fillText(code, centerX, centerY + Math.sin(time + cellX) * size * 0.12);
            break;
        }
        case "dither": {
            const pattern = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
            const threshold = pattern[cellY % 4][cellX % 4] / 16;
            if (lum < threshold * 0.95) return;
            const dot = size * (0.13 + lum * 0.36);
            ctx.fillRect(centerX - dot / 2, centerY - dot / 2, dot, dot);
            break;
        }
        case "mosaic":
            ctx.fillRect(x + size * 0.04, y + size * 0.04, size * (0.84 + lum * 0.12), size * (0.84 + lum * 0.12));
            break;
        case "pixel":
            ctx.fillRect(centerX - size * 0.18, centerY - size * 0.18, size * (0.32 + lum * 0.42), size * (0.32 + lum * 0.42));
            break;
        case "dots":
        case "bubbles":
        case "disco": {
            const radius = size * (0.1 + lum * 0.38);
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
            if (mode === "bubbles") {
                ctx.globalAlpha *= 0.65;
                ctx.stroke();
                ctx.globalAlpha /= 0.65;
            }
            if (mode === "disco") {
                ctx.fillStyle = rgba({ r: 216, g: 180, b: 106 }, 0.24 + lum * 0.45);
                ctx.fillRect(centerX - radius * 0.35, centerY - radius * 0.35, radius * 0.7, radius * 0.7);
            }
            break;
        }
        case "cross":
            ctx.fillRect(centerX - size * 0.08, y + size * 0.18, size * 0.16, size * 0.64);
            ctx.fillRect(x + size * 0.18, centerY - size * 0.08, size * 0.64, size * 0.16);
            break;
        case "diamond":
            ctx.beginPath();
            ctx.moveTo(centerX, y + size * 0.12);
            ctx.lineTo(x + size * 0.88, centerY);
            ctx.lineTo(centerX, y + size * 0.88);
            ctx.lineTo(x + size * 0.12, centerY);
            ctx.closePath();
            ctx.fill();
            break;
        case "voxel":
        case "lego":
            ctx.fillRect(x + size * 0.12, y + size * 0.2, size * 0.76, size * 0.64);
            ctx.fillStyle = rgba(color, 0.3 + lum * 0.45);
            ctx.fillRect(x + size * 0.18, y + size * 0.1, size * 0.22, size * 0.16);
            ctx.fillRect(x + size * 0.58, y + size * 0.1, size * 0.22, size * 0.16);
            break;
        case "lines":
            ctx.fillRect(x + size * 0.12, centerY - size * (0.04 + lum * 0.2), size * 0.76, size * (0.08 + lum * 0.25));
            break;
        case "diagonal":
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(-Math.PI / 4);
            ctx.fillRect(-size * 0.42, -size * (0.04 + lum * 0.18), size * 0.84, size * (0.08 + lum * 0.22));
            ctx.restore();
            break;
        case "braille": {
            const dots = [[0.25, 0.25], [0.25, 0.5], [0.25, 0.75], [0.7, 0.25], [0.7, 0.5], [0.7, 0.75]];
            dots.slice(0, Math.max(1, Math.ceil(lum * dots.length))).forEach(([dotX, dotY]) => {
                ctx.beginPath();
                ctx.arc(x + size * dotX, y + size * dotY, size * 0.08, 0, Math.PI * 2);
                ctx.fill();
            });
            break;
        }
        case "rings":
            ctx.beginPath();
            ctx.arc(centerX, centerY, size * (0.14 + lum * 0.34), 0, Math.PI * 2);
            ctx.stroke();
            if (lum > 0.55) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, size * 0.12, 0, Math.PI * 2);
                ctx.stroke();
            }
            break;
        case "hearts":
        case "stars": {
            const points = mode === "hearts" ? 6 : 5;
            ctx.beginPath();
            for (let index = 0; index < points * 2; index += 1) {
                const angle = -Math.PI / 2 + (index * Math.PI) / points;
                const radius = index % 2 === 0 ? size * (0.18 + lum * 0.3) : size * 0.08;
                const pointX = centerX + Math.cos(angle) * radius;
                const pointY = centerY + Math.sin(angle) * radius;
                if (index === 0) {
                    ctx.moveTo(pointX, pointY);
                } else {
                    ctx.lineTo(pointX, pointY);
                }
            }
            ctx.closePath();
            ctx.fill();
            break;
        }
        case "hexagons":
            ctx.beginPath();
            for (let index = 0; index < 6; index += 1) {
                const angle = (Math.PI / 3) * index;
                const pointX = centerX + Math.cos(angle) * size * (0.18 + lum * 0.28);
                const pointY = centerY + Math.sin(angle) * size * (0.18 + lum * 0.28);
                if (index === 0) {
                    ctx.moveTo(pointX, pointY);
                } else {
                    ctx.lineTo(pointX, pointY);
                }
            }
            ctx.closePath();
            ctx.stroke();
            break;
        case "triangles":
            ctx.beginPath();
            ctx.moveTo(centerX, y + size * (0.12 + (1 - lum) * 0.12));
            ctx.lineTo(x + size * 0.86, y + size * 0.84);
            ctx.lineTo(x + size * 0.14, y + size * 0.84);
            ctx.closePath();
            ctx.fill();
            break;
        case "hatch":
            ctx.save();
            ctx.globalAlpha *= 0.35 + lum * 0.65;
            for (let offset = -size; offset < size * 2; offset += Math.max(3, size * 0.24)) {
                ctx.beginPath();
                ctx.moveTo(x + offset, y);
                ctx.lineTo(x + offset + size, y + size);
                ctx.moveTo(x + offset + size, y);
                ctx.lineTo(x + offset, y + size);
                ctx.stroke();
            }
            ctx.restore();
            break;
        case "contour": {
            const rings = 1 + Math.floor(lum * 3);
            for (let ring = 1; ring <= rings; ring += 1) {
                ctx.strokeRect(x + ring * size * 0.12, y + ring * size * 0.12, size * (1 - ring * 0.24), size * (1 - ring * 0.24));
            }
            break;
        }
        case "halfblocks":
            ctx.font = `${Math.max(8, size * 0.95)}px ui-monospace, monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(lum > 0.5 ? "▀" : "▄", centerX, centerY);
            break;
        default:
            ctx.fillRect(x, y, size, size);
    }
}

export function DitherEffect({ src, recipe, className }: DitherEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const config = useMemo(() => mergeRecipe(recipe), [recipe]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement ?? canvas;
        const sourceCanvas = document.createElement("canvas");
        const effectCanvas = document.createElement("canvas");
        const maskCanvas = document.createElement("canvas");
        const output = canvas.getContext("2d", { alpha: true });
        const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
        const effectCtx = effectCanvas.getContext("2d");
        const maskCtx = maskCanvas.getContext("2d");
        if (!output || !sourceCtx || !effectCtx || !maskCtx) return;

        const image = new Image();
        const maskImage = new Image();
        image.decoding = "async";
        image.src = src;
        if (config.mask.enabled && config.mask.dataUrl) {
            maskImage.crossOrigin = "anonymous";
            maskImage.src = config.mask.dataUrl;
        }

        let width = 1;
        let height = 1;
        let dpr = 1;
        let animationFrame = 0;
        let mounted = true;
        let loaded = false;
        let maskLoaded = false;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const shouldAnimate = config.animated && !reduceMotion;

        const resize = () => {
            const bounds = parent.getBoundingClientRect();
            width = Math.max(1, Math.floor(bounds.width));
            height = Math.max(1, Math.floor(bounds.height));
            dpr = Math.min(2, window.devicePixelRatio || 1);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            sourceCanvas.width = width;
            sourceCanvas.height = height;
            effectCanvas.width = width;
            effectCanvas.height = height;
            maskCanvas.width = width;
            maskCanvas.height = height;
        };

        const drawBackground = () => {
            sourceCtx.clearRect(0, 0, width, height);
            coverImage(sourceCtx, image, width, height);
        };

        const drawLights = () => {
            if (!config.lights.enabled) return;
            output.save();
            output.globalCompositeOperation = "screen";
            config.lights.points.forEach((point) => {
                const radius = Math.max(1, point.radius);
                const gradient = output.createRadialGradient(point.x * width, point.y * height, 0, point.x * width, point.y * height, radius);
                gradient.addColorStop(0, `rgba(216, 180, 106, ${clamp(point.intensity / 100)})`);
                gradient.addColorStop(1, "rgba(216, 180, 106, 0)");
                output.fillStyle = gradient;
                output.fillRect(0, 0, width, height);
            });
            output.restore();
        };

        const drawPostEffects = (time: number, cells: Cell[], cellsX: number, cellsY: number) => {
            const intensity = (name: keyof PfxConfig) => config.pfx[name].enabled ? config.pfx[name].intensity / 100 : 0;
            const scan = intensity("scanLines");
            if (scan > 0) {
                output.save();
                output.fillStyle = `rgba(0, 0, 0, ${scan * 0.18})`;
                for (let y = 0; y < height; y += 4) output.fillRect(0, y, width, 1);
                output.restore();
            }
            const vignette = intensity("vignette");
            if (vignette > 0) {
                const gradient = output.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.16, width / 2, height / 2, Math.max(width, height) * 0.75);
                gradient.addColorStop(0, "rgba(0,0,0,0)");
                gradient.addColorStop(1, `rgba(0,0,0,${vignette * 0.62})`);
                output.fillStyle = gradient;
                output.fillRect(0, 0, width, height);
            }
            const chromatic = intensity("chromatic");
            if (chromatic > 0) {
                output.save();
                output.globalCompositeOperation = "screen";
                output.globalAlpha = chromatic * 0.08;
                output.drawImage(sourceCanvas, -chromatic * 2, 0);
                output.globalCompositeOperation = "multiply";
                output.drawImage(sourceCanvas, chromatic * 2, 0);
                output.restore();
            }
            const bloom = intensity("bloom");
            if (bloom > 0) {
                output.save();
                output.globalCompositeOperation = "screen";
                output.globalAlpha = bloom * 0.12;
                output.filter = `blur(${2 + bloom * 8}px)`;
                output.drawImage(canvas, 0, 0, width, height);
                output.restore();
            }
            const grain = intensity("filmGrain");
            if (grain > 0) {
                output.save();
                output.fillStyle = `rgba(255,255,255,${grain * 0.08})`;
                const count = Math.floor(width * height * grain * 0.00008);
                for (let index = 0; index < count; index += 1) {
                    const x = (Math.sin(index * 12.9898 + time * 8.1) * 43758.5453) % 1;
                    const y = (Math.sin(index * 78.233 + time * 5.7) * 43758.5453) % 1;
                    output.fillRect(Math.abs(x) * width, Math.abs(y) * height, 1, 1);
                }
                output.restore();
            }
            const glitch = intensity("glitch");
            if (glitch > 0 && Math.floor(time * 8) % 7 === 0) {
                output.save();
                output.globalAlpha = glitch * 0.28;
                const slices = Math.max(1, Math.floor(glitch * 7));
                for (let index = 0; index < slices; index += 1) {
                    const y = ((index * 97) % Math.max(1, height - 8));
                    const sliceHeight = Math.max(2, Math.floor(2 + glitch * 8));
                    output.drawImage(canvas, 0, y, width, sliceHeight, (index % 2 ? 1 : -1) * glitch * 16, y, width, sliceHeight);
                }
                output.restore();
            }
            const halftone = intensity("halftone");
            if (halftone > 0) {
                output.save();
                output.fillStyle = `rgba(216,180,106,${halftone * 0.16})`;
                const step = Math.max(5, config.cellSize * 1.8);
                for (let y = step / 2; y < height; y += step) {
                    for (let x = step / 2; x < width; x += step) {
                        const cell = cells[Math.min(cells.length - 1, Math.floor(y / config.cellSize) * cellsX + Math.floor(x / config.cellSize))];
                        output.beginPath();
                        output.arc(x, y, step * (cell?.lum ?? 0.5) * halftone * 0.24, 0, Math.PI * 2);
                        output.fill();
                    }
                }
                output.restore();
            }
            const pixelate = intensity("pixelate");
            if (pixelate > 0) {
                output.save();
                output.strokeStyle = `rgba(216,180,106,${pixelate * 0.12})`;
                const step = Math.max(10, config.cellSize * 2);
                for (let x = 0; x < width; x += step) output.strokeRect(x, 0, step, height);
                for (let y = 0; y < height; y += step) output.strokeRect(0, y, width, step);
                output.restore();
            }
            const dust = intensity("filmDust");
            if (dust > 0) {
                output.save();
                output.fillStyle = `rgba(255,255,255,${dust * 0.17})`;
                const count = Math.floor(4 + dust * 32);
                for (let index = 0; index < count; index += 1) {
                    const x = Math.abs((Math.sin(index * 4.7 + time * 0.4) * 0.5 + 0.5) * width);
                    const y = Math.abs((Math.cos(index * 8.1 + time * 0.3) * 0.5 + 0.5) * height);
                    output.beginPath();
                    output.arc(x, y, 0.5 + dust * 2, 0, Math.PI * 2);
                    output.fill();
                }
                output.restore();
            }
            void cellsY;
        };

        const revealWithMask = () => {
            if (!config.mask.enabled || !maskLoaded) return;
            maskCtx.clearRect(0, 0, width, height);
            coverImage(maskCtx, sourceCanvas, width, height);
            maskCtx.globalCompositeOperation = config.mask.invert ? "destination-out" : "destination-in";
            coverImage(maskCtx, maskImage, width, height);
            maskCtx.globalCompositeOperation = "source-over";
            output.drawImage(maskCanvas, 0, 0);
        };

        const draw = (now: number) => {
            if (!mounted || !loaded) return;
            const speed = config.animSpeed.enabled ? 0.45 + config.animSpeed.intensity / 100 * 2 : 0.35;
            const time = shouldAnimate ? now * 0.001 * speed : 0;
            resize();
            drawBackground();
            const pixels = sourceCtx.getImageData(0, 0, width, height).data;
            const cellSize = Math.max(3, Math.round(config.cellSize));
            const cellsX = Math.ceil(width / cellSize);
            const cellsY = Math.ceil(height / cellSize);
            const cells: Cell[] = [];
            const sampleStep = Math.max(1, Math.floor(cellSize / 3));

            for (let cellY = 0; cellY < cellsY; cellY += 1) {
                for (let cellX = 0; cellX < cellsX; cellX += 1) {
                    let r = 0;
                    let g = 0;
                    let b = 0;
                    let count = 0;
                    const startX = cellX * cellSize;
                    const startY = cellY * cellSize;
                    for (let y = startY; y < Math.min(height, startY + cellSize); y += sampleStep) {
                        for (let x = startX; x < Math.min(width, startX + cellSize); x += sampleStep) {
                            const offset = (y * width + x) * 4;
                            r += pixels[offset];
                            g += pixels[offset + 1];
                            b += pixels[offset + 2];
                            count += 1;
                        }
                    }
                    r /= Math.max(1, count);
                    g /= Math.max(1, count);
                    b /= Math.max(1, count);
                    const lum = toneMap(clamp((r * 0.2126 + g * 0.7152 + b * 0.0722) / 255), config.toneCurve);
                    cells.push({ r, g, b, lum: config.invert ? 1 - lum : lum, edge: 0 });
                }
            }

            for (let cellY = 0; cellY < cellsY; cellY += 1) {
                for (let cellX = 0; cellX < cellsX; cellX += 1) {
                    const index = cellY * cellsX + cellX;
                    const cell = cells[index];
                    const left = cells[cellY * cellsX + Math.max(0, cellX - 1)]?.lum ?? cell.lum;
                    const right = cells[cellY * cellsX + Math.min(cellsX - 1, cellX + 1)]?.lum ?? cell.lum;
                    const up = cells[Math.max(0, cellY - 1) * cellsX + cellX]?.lum ?? cell.lum;
                    const down = cells[Math.min(cellsY - 1, cellY + 1) * cellsX + cellX]?.lum ?? cell.lum;
                    cell.edge = clamp((Math.abs(right - left) + Math.abs(down - up)) * 0.5);
                }
            }

            effectCtx.clearRect(0, 0, width, height);
            try {
                effectCtx.globalCompositeOperation = config.styleBlend;
            } catch {
                effectCtx.globalCompositeOperation = "source-over";
            }
            const animationAmount = (config.animIntensity.enabled ? config.animIntensity.intensity / 100 : 0) * 0.18;
            const coverage = clamp(config.coverage / 100);
            for (let cellY = 0; cellY < cellsY; cellY += 1) {
                for (let cellX = 0; cellX < cellsX; cellX += 1) {
                    const cell = cells[cellY * cellsX + cellX];
                    const random = Math.abs(Math.sin(cellX * 12.9898 + cellY * 78.233));
                    if (random > coverage) continue;
                    let lum = cell.lum;
                    const offsetX = 0;
                    let offsetY = 0;
                    if (config.animStyle === "wave") offsetY = Math.sin(time * 2 + cellX * 0.24) * config.cellSize * animationAmount;
                    if (config.animStyle === "ripple") {
                        const distance = Math.hypot(cellX - cellsX / 2, cellY - cellsY / 2);
                        offsetY = Math.sin(time * 3 - distance * 0.25) * config.cellSize * animationAmount;
                    }
                    if (config.animStyle === "shimmer") lum = clamp(lum + Math.sin(time * 2 + cellX * 0.3) * animationAmount);
                    if (config.animStyle === "pulse") lum = clamp(lum * (1 + Math.sin(time * 2) * animationAmount));
                    if (config.animStyle === "flicker") lum = clamp(lum + Math.sin(time * 11 + cellX * 0.7 + cellY) * animationAmount * 0.7);
                    lum = clamp(lum + cell.edge * (config.edgeEmphasis / 100));
                    const color = colorForCell(cell, config);
                    const density = clamp(config.density / 100);
                    const shapeSize = cellSize * (0.55 + density * 0.45);
                    const shapeOffset = (cellSize - shapeSize) / 2;
                    const alpha = config.animStyle === "flicker" ? 0.72 + Math.sin(time * 15 + cellX) * 0.18 : 0.9;
                    effectCtx.globalAlpha = clamp(alpha);
                    drawShape(effectCtx, config.renderMode, cellX * cellSize + shapeOffset + offsetX, cellY * cellSize + shapeOffset + offsetY, shapeSize, lum, color, cellX, cellY, time, config);
                }
            }
            effectCtx.globalAlpha = 1;
            effectCtx.globalCompositeOperation = "source-over";

            output.setTransform(dpr, 0, 0, dpr, 0, 0);
            output.clearRect(0, 0, width, height);
            output.globalCompositeOperation = "source-over";
            if (config.bgMode !== "none") {
                output.save();
                output.globalAlpha = clamp(config.bgOpacity / 100);
                if (config.bgMode === "solid") {
                    output.fillStyle = "#0c262d";
                    output.fillRect(0, 0, width, height);
                } else {
                    output.filter = config.bgMode === "blurred" ? `blur(${config.bgBlur}px)` : "none";
                    output.drawImage(sourceCanvas, 0, 0);
                }
                output.restore();
            }
            output.save();
            output.globalCompositeOperation = config.styleBlend;
            output.filter = config.blurType === "off" ? "none" : `blur(${Math.max(0, config.blurAmount / 10)}px)`;
            output.drawImage(effectCanvas, 0, 0);
            if (config.blurType === "directional" && config.directionalBothSides) {
                output.globalAlpha = 0.25;
                output.drawImage(effectCanvas, Math.cos(config.blurAngle) * 3, Math.sin(config.blurAngle) * 3);
            }
            output.restore();
            drawLights();
            drawPostEffects(time, cells, cellsX, cellsY);
            revealWithMask();
            output.globalAlpha = 1;
        };

        const onLoad = () => {
            loaded = true;
            resize();
            draw(0);
        };
        image.addEventListener("load", onLoad);
        maskImage.addEventListener("load", () => { maskLoaded = true; });
        const observer = new ResizeObserver(resize);
        observer.observe(parent);
        if (image.complete && image.naturalWidth > 0) onLoad();
        if (shouldAnimate) {
            const tick = (now: number) => {
                if (!mounted) return;
                draw(now);
                animationFrame = window.requestAnimationFrame(tick);
            };
            animationFrame = window.requestAnimationFrame(tick);
        }

        return () => {
            mounted = false;
            window.cancelAnimationFrame(animationFrame);
            observer.disconnect();
            image.removeEventListener("load", onLoad);
        };
    }, [config, src]);

    return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
