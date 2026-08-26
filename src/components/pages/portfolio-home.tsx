"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    BriefcaseBusiness,
    Check,
    Download,
    ExternalLink,
    Github,
    GraduationCap,
    Instagram,
    Linkedin,
    Mail,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ProjectDetailModal } from "@/components/ui/project-detail-modal";
import { useLanguage } from "@/lib/language-context";
import { SITE_CONFIG } from "@/lib/data";

type Project = {
    title: string;
    description: string;
    problem: string;
    thinking: string;
    role: string;
    workflow: string[];
    impact: string;
    techStack: string[];
    link: string;
    github?: string;
    image?: string;
    badge?: string;
};

const reveal = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

export function PortfolioHome() {
    const { t, locale, toggleLanguage } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const allProjects = [...t.projects.data, ...t.projects.web, ...t.projects.design] as Project[];
    const featuredProjects = allProjects.slice(0, 6);

    const navItems = [
        { href: "#about", label: t.about.title },
        { href: "#experience", label: t.experience.title },
        { href: "#skills", label: t.skills.title },
        { href: "#work", label: t.projects.title },
        { href: "#contact", label: t.contact.title },
    ];

    return (
        <div className="portfolio-page">
            <div className="portfolio-layout">
                <header className="portfolio-mobile-header">
                    <Link href="#top" className="portfolio-wordmark" onClick={() => setMenuOpen(false)}>
                        PJF<span>.</span>
                    </Link>
                    <div className="portfolio-mobile-actions">
                        <button
                            type="button"
                            className="icon-button"
                            onClick={toggleLanguage}
                            aria-label={locale === "en" ? "Switch to Indonesian" : "Switch to English"}
                        >
                            {locale === "en" ? "ID" : "EN"}
                        </button>
                        <ThemeToggle className="icon-button" />
                        <button
                            type="button"
                            className="icon-button"
                            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            {menuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </header>

                <aside className={`portfolio-rail ${menuOpen ? "is-open" : ""}`}>
                    <div className="rail-profile">
                        <Image
                            src="/images/profileDipa1.jpg"
                            alt="Pradipa Javier Fatah"
                            width={112}
                            height={112}
                            className="rail-avatar"
                            priority
                        />
                        <div className="rail-name-row">
                            <Link href="#top" className="rail-name" onClick={() => setMenuOpen(false)}>
                                {SITE_CONFIG.name}
                            </Link>
                            <span className="verified-mark" aria-label="Verified portfolio owner"><Check size={12} /></span>
                        </div>
                        <p className="rail-handle">@pradipajavier</p>
                        <p className="rail-role">{SITE_CONFIG.description}</p>
                        <a className="rail-cv" href={t.links.cv} target="_blank" rel="noreferrer">
                            <Download size={14} />
                            {t.hero.downloadCV}
                        </a>
                    </div>

                    <div className="rail-rule" />

                    <nav className="rail-nav" aria-label="Primary navigation">
                        {navItems.map((item, index) => (
                            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                                <span className="rail-nav-index">0{index + 1}</span>
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="rail-controls">
                        <button type="button" className="language-switch" onClick={toggleLanguage}>
                            <span className={locale === "en" ? "active" : ""}>EN</span>
                            <span className={locale === "id" ? "active" : ""}>ID</span>
                        </button>
                        <ThemeToggle className="rail-theme-toggle" />
                    </div>

                    <div className="rail-socials" aria-label="Social links">
                        <a href={t.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
                        <a href={t.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
                        <a href={t.links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
                    </div>
                </aside>

                <main id="top" className="portfolio-content">
                    <section className="portfolio-intro" aria-labelledby="intro-title">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={reveal}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="intro-copy"
                        >
                            <p className="section-kicker">{t.hero.badge}</p>
                            <h1 id="intro-title">{t.hero.greeting} <span>{SITE_CONFIG.name}</span>.</h1>
                            <p className="intro-role">{t.hero.rolePrefix} <strong>{t.hero.roles[0]}</strong> with a builder&apos;s mindset.</p>
                            <p className="intro-description">{t.hero.description}</p>
                            <div className="intro-actions">
                                <a className="button-primary" href="#work">{t.hero.viewProjects} <ArrowUpRight size={16} /></a>
                                <a className="button-secondary" href="#contact">{t.contact.title} <ArrowUpRight size={16} /></a>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            className="intro-portrait-wrap"
                        >
                            <Image
                                src="/images/profileDipa1.jpg"
                                alt="Portrait of Pradipa Javier Fatah"
                                fill
                                priority
                                className="intro-portrait"
                                sizes="(max-width: 900px) 80vw, 34vw"
                            />
                            <span className="portrait-caption">Computer Science / Binus University</span>
                        </motion.div>
                    </section>

                    <div className="content-rule" />

                    <motion.section
                        id="about"
                        className="portfolio-section about-section"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.18 }}
                        variants={reveal}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="section-heading">
                            <span className="section-index">01</span>
                            <h2>{t.about.title}</h2>
                        </div>
                        <div className="about-copy">
                            <p>{t.about.bio1}</p>
                            <p>{t.about.bio2}</p>
                            <div className="education-line">
                                <GraduationCap size={19} />
                                <div>
                                    <strong>{t.about.university}</strong>
                                    <span>{t.about.major} · {t.about.gpa}</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section
                        id="experience"
                        className="portfolio-section"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12 }}
                        variants={reveal}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="section-heading">
                            <span className="section-index">02</span>
                            <h2>{t.experience.title}</h2>
                        </div>
                        <div className="journey-list">
                            {t.experience.list.map((item) => (
                                <article className="journey-item" key={`${item.company}-${item.period}`}>
                                    <div className="journey-period">{item.period}</div>
                                    <div className="journey-marker" />
                                    <div className="journey-body">
                                        <p className="journey-company">{item.company}</p>
                                        <h3>{item.role}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        id="skills"
                        className="portfolio-section skills-section"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12 }}
                        variants={reveal}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="section-heading">
                            <span className="section-index">03</span>
                            <h2>{t.skills.title}</h2>
                        </div>
                        <div className="skills-grid">
                            <SkillGroup title={t.skills.categories.data} items={t.skills.dataList} />
                            <SkillGroup title={t.skills.categories.dev} items={t.skills.devList} />
                            <SkillGroup title={t.skills.categories.design} items={t.skills.designList} />
                            <SkillGroup title={t.skills.categories.soft} items={t.skills.softList} />
                        </div>
                    </motion.section>

                    <motion.section
                        id="work"
                        className="portfolio-section work-section"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.08 }}
                        variants={reveal}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="section-heading section-heading-with-action">
                            <div>
                                <span className="section-index">04</span>
                                <h2>{t.projects.title}</h2>
                            </div>
                            <Link href="/projects" className="text-link">{t.projects.viewAll} <ArrowUpRight size={15} /></Link>
                        </div>
                        <p className="section-lede">{t.projects.description}</p>
                        <div className="project-feature-grid">
                            {featuredProjects.map((project, index) => (
                                <ProjectPreview
                                    key={`${project.title}-${index}`}
                                    project={project}
                                    index={index}
                                    onSelect={setSelectedProject}
                                    category={categoryForIndex(index, t)}
                                />
                            ))}
                        </div>
                    </motion.section>

                    <section id="contact" className="contact-block">
                        <div>
                            <p className="section-kicker">{t.contact.title}</p>
                            <h2>{t.contact.subtitle}</h2>
                        </div>
                        <a className="button-primary" href="/contact">
                            <Mail size={16} /> {t.contact.title} <ArrowUpRight size={16} />
                        </a>
                    </section>

                    <footer className="portfolio-footer">
                        <span>© 2026 {SITE_CONFIG.name}</span>
                        <span>{t.hero.status}</span>
                    </footer>
                </main>
            </div>

            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                labels={{
                    problem: t.projects.labels.problem,
                    thinking: t.projects.labels.thinking,
                    role: t.projects.labels.role,
                    workflow: t.projects.labels.workflow,
                    impact: t.projects.labels.impact,
                    viewProject: t.projects.viewProject,
                    viewCode: t.projects.viewCode,
                    confidentialMsg: t.projects.confidentialMsg,
                }}
            />
        </div>
    );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="skill-group">
            <div className="skill-group-title"><BriefcaseBusiness size={15} /> {title}</div>
            <div className="skill-list">
                {items.map((item) => <span key={item}>{item}</span>)}
            </div>
        </div>
    );
}

function ProjectPreview({
    project,
    index,
    category,
    onSelect,
}: {
    project: Project;
    index: number;
    category: string;
    onSelect: (project: Project) => void;
}) {
    const isFeatured = index === 0;
    const isConfidential = project.link === "CONFIDENTIAL";

    return (
        <article className={`project-preview ${isFeatured ? "is-featured" : ""}`} onClick={() => onSelect(project)}>
            <div className="project-image-wrap">
                {project.image && <Image src={project.image} alt={project.title} fill className="project-image" sizes={isFeatured ? "(max-width: 900px) 100vw, 55vw" : "(max-width: 900px) 100vw, 28vw"} />}
                <span className="project-category">{category}</span>
            </div>
            <div className="project-preview-body">
                <div>
                    <p className="project-number">0{index + 1}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                </div>
                <div className="project-meta">
                    <div className="tech-list">{project.techStack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div>
                    {isConfidential ? <span className="project-link-label">Private <ExternalLink size={14} /></span> : <span className="project-link-label">Details <ArrowUpRight size={14} /></span>}
                </div>
            </div>
        </article>
    );
}

function categoryForIndex(index: number, t: ReturnType<typeof useLanguage>["t"]) {
    if (index < t.projects.data.length) return t.projects.categories.data;
    if (index < t.projects.data.length + t.projects.web.length) return t.projects.categories.web;
    return t.projects.categories.design;
}
