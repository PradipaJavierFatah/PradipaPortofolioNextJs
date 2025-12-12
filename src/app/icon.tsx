import { ImageResponse } from 'next/og'
import { join } from 'path'
import { readFileSync } from 'fs'

export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
    const filePath = join(process.cwd(), 'public/images/Favicon_White.png')
    const file = readFileSync(filePath)
    const base64 = file.toString('base64')

    // Use data URI for the image source
    const src = `data:image/png;base64,${base64}`

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: '50%', // Make it round
                }}
            >
                <img
                    src={src}
                    width="100%"
                    height="100%"
                    style={{
                        objectFit: 'cover'
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
