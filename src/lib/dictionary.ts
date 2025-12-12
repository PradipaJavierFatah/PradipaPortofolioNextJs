export type Locale = 'en' | 'id';

export const DICTIONARY = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            projects: "Projects",
            contact: "Contact",
        },
        hero: {
            badge: "Generating Insights from Data",
            greeting: "Hi, I'm",
            rolePrefix: "I am a",
            roles: ["Data Analyst", "Business Analyst", "Software Engineer"],
            description: "Transforming raw data into actionable business strategies and building the systems that power them.",
            viewProjects: "View Projects",
            downloadCV: "Download CV",
            status: "Open to Work",
        },
        about: {
            title: "About Me",
            bio1: "I'm Pradipa Javier Fatah, a Computer Science student driven by the challenge of building complex, scalable software systems. My journey started with a curiosity about how things work under the hood, leading me to specialize in modern web technologies and performant front-end architecture.",
            bio2: "I am passionate about the intersection of technology, business, and product development where innovative solutions meet real user needs. I enjoy exploring modern technologies to build efficient systems, applying data driven thinking to support strategic decisions, and shaping product experiences that align user value with business goals. My focus is on creating impactful, scalable solutions that drive meaningful outcomes.",
            educationTitle: "Education",
            university: "Binus University",
            major: "Computer Science, 2021 - 2025",
            gpa: "GPA: 3.85/4.00",
        },
        experience: {
            title: "My Journey",
            description: "Milestones that define my professional and academic path.",
            list: [
                {
                    company: "Adira Finance",
                    role: "Data Analyst Intern",
                    period: "Feb 2025 - Feb 2026",
                    description: "Analyzing financial data trends and generating actionable business insights to support decision making processes.",
                },
                {
                    company: "FILE",
                    role: "Social Media Specialist",
                    period: "Nov 2023 - Nov 2024",
                    description: "Managed social media content strategy, increased engagement, and analyzed audience metrics.",
                },
                {
                    company: "BNCC",
                    role: "Staff",
                    period: "Nov 2022 - Nov 2024",
                    description: "Contributed to the tech community by organizing events and facilitating knowledge sharing among students.",
                },
                {
                    company: "Binus University",
                    role: "Computer Science Student",
                    period: "Aug 2022 - Aug 2026",
                    description: "Majoring in Computer Science. Focusing on Software Engineering and Data Science fundamentals.",
                },
            ]
        },
        skills: {
            title: "Skills",
            description: "Expertise across Data Science, Software Development, and Design.",
            categories: {
                data: "Data",
                dev: "Developer",
                design: "Design",
                soft: "Soft Skills",
            },
            dataList: ["Python", "R", "Excel", "Looker Studio", "Tableau", "SQL"],
            devList: ["Python", "C", "Java", "SQL", "PHP", "R", "HTML", "CSS", "JavaScript", "Tailwind CSS", "Jira"],
            designList: ["Figma", "PowerPoint", "Canva"],
            softList: ["Communication", "Problem Solving", "Teamwork", "Time Management", "Adaptability", "Leadership"],
        },
        interests: {
            title: "My Interests",
            description: "At the intersection of Technology, Business, and Product.",
            diagram: {
                tech: "Technology",
                biz: "Business",
                prod: "Product",
                innovation: "Innovation",
            },
        },
        links: {
            instagram: "https://www.instagram.com/pprraaddiippaa/",
            linkedin: "https://www.linkedin.com/in/pradipajavierfatah/",
            github: "https://github.com/PradipaJavierFatah",
            cv: "https://drive.google.com/file/d/1t-r2kmtFKNNoYeTzi6sVxHe7-nLWJcYr/view?usp=sharing",
        },
        projects: {
            title: "Projects",
            description: "A showcase of my projects in Software Engineering and Data Science.",
            viewProject: "View Project",
            viewCode: "View Code",
            confidentialMsg: "This project is confidential and cannot be viewed publicly.",
            categories: {
                data: "Data Science & Analytics",
                web: "Web Development",
                design: "UI/UX Design",
            },
            data: [
                {
                    title: "Adira Finance Data Analyst",
                    description: "Analyzed financial data trends and generated actionable business insights to support decision-making processes.",
                    techStack: ["Python", "SQL", "Tableau", "Data Analysis"],
                    link: "CONFIDENTIAL",
                    github: "#",
                    image: "/images/Portofolio_DataAnalyst_Adira.png",
                },
                {
                    title: "Data Mining Project",
                    description: "Extracted patterns and insights from large datasets using advanced data mining techniques.",
                    techStack: ["Python", "Pandas", "Scikit-learn"],
                    link: "https://steadfast-beard-007.notion.site/Data-Mining-213e97aa4e8a8034b1c3ed93a81f5e7f",
                    github: "#",
                    image: "/images/Portofolio_DataMining.png",
                },
                {
                    title: "Data Visualization Dashboard",
                    description: "Created interactive dashboards to visualize complex datasets, enabling easier data interpretation.",
                    techStack: ["Tableau/Looker", "Data Viz", "SQL"],
                    link: "https://public.tableau.com/app/profile/pradipa.javier.fatah/viz/WashingtonHouseSalesDashboard_17276018771800/Dashboard",
                    github: "#",
                    image: "/images/Portofolio_DataVisualization.png",
                }
            ],
            web: [
                {
                    title: "Sistem Layanan Penyaluran Sampah (SILAP)",
                    description: "A comprehensive reporting system dashboard for managing data analytics and generating insights.",
                    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
                    link: "#",
                    github: "#",
                    image: "/images/Portofolio_SILAP.png",
                },
                {
                    title: "Kawan Project",
                    description: "A web application designed to connect people and foster community engagement.",
                    techStack: ["React", "Node.js", "MongoDB"],
                    link: "#",
                    github: "#",
                    image: "/images/Portofolio_KawanProject.png",
                }
            ],
            design: [
                {
                    title: "Adira Finance App Redesign",
                    description: "Redesigned the user interface for Adira's mobile application to improve user experience and accessibility.",
                    techStack: ["Figma", "UI/UX", "Prototyping"],
                    link: "CONFIDENTIAL",
                    github: "#",
                    image: "/images/Portofolio_Design_Adira.png",
                },
                {
                    title: "Diswipe",
                    description: "Designed a clean and modern user interface for a digital swiping application.",
                    techStack: ["Figma", "UI Design", "Business Development"],
                    link: "https://steadfast-beard-007.notion.site/diswipe-213e97aa4e8a80e5b807e23ff9e6529d",
                    github: "#",
                    image: "/images/Portofolio_Diswipe.png",
                },
                {
                    title: "FILE Magazine Design",
                    description: "Created layout and visual assets for FILE Magazine's digital presence.",
                    techStack: ["Adobe Creative Cloud", "Layout Design"],
                    link: "https://www.instagram.com/filemagz/",
                    github: "#",
                    image: "/images/Portofolio_Design_FILE.png",
                },
                {
                    title: "Technoscape Design",
                    description: "Designed promotional materials and visual identity for the Technoscape event.",
                    techStack: ["Graphic Design", "Branding"],
                    link: "https://www.instagram.com/technoscapebncc/",
                    github: "#",
                    image: "/images/Portofolio_Design_Technoscape.png",
                }
            ]
        },
        socials: {
            title: "Connect With Me",
            description: "Find me on these platforms.",
            linkedin: "Professional Network",
            instagram: "Daily Life & Hobbies",
            github: "Code & Contributions",
        },
        contact: {
            title: "Get in Touch",
            subtitle: "Have a project in mind or just want to say hi? I'd love to hear from you.",
            name: "Name",
            email: "Email",
            subject: "Subject",
            message: "Message",
            send: "Send Message",
            sending: "Sending...",
            success: "Opening Email Client...",
            note: "Note: This will open your default email client to send the message.",
            successMsg: "Message sent! I'll get back to you soon. 🚀",
            errorMsg: "Something went wrong. Please try again.",
        },
        footer: {
            builtBy: "Built by",
            sourceCode: "The source code is available on",
        },
        projectsPage: {
            title: "Projects",
            description: "A collection of projects that demonstrate my ability to tackle complex problems. From full stack web applications to algorithmic visualizations.",
        },
    },
    id: {
        nav: {
            home: "Beranda",
            about: "Tentang",
            projects: "Proyek",
            contact: "Kontak",
        },
        hero: {
            badge: "Menghasilkan Wawasan dari Data",
            greeting: "Halo, saya",
            rolePrefix: "Saya seorang",
            roles: ["Analis Data", "Analis Bisnis", "Software Engineer"],
            description: "Mengubah data mentah menjadi strategi bisnis yang dapat ditindaklanjuti dan membangun sistem yang mendukungnya.",
            viewProjects: "Lihat Proyek",
            downloadCV: "Unduh CV",
            status: "Siap Bekerja",
        },
        about: {
            title: "Tentang Saya",
            bio1: "Saya Pradipa Javier Fatah, mahasiswa Ilmu Komputer yang termotivasi oleh tantangan membangun sistem perangkat lunak yang kompleks dan skalabel. Perjalanan saya dimulai dari rasa ingin tahu tentang bagaimana segala sesuatu bekerja, yang membawa saya untuk berspesialisasi dalam teknologi web modern dan arsitektur front-end yang berkinerja tinggi.",
            bio2: "Ketika tidak sedang coding, saya mengeksplorasi pola desain sistem baru, berkontribusi pada open source, atau belajar tentang infrastruktur cloud. Saya percaya pada pembelajaran berkelanjutan dan penerapan praktik terbaik rekayasa untuk memecahkan masalah dunia nyata.",
            educationTitle: "Pendidikan",
            university: "Universitas Binus",
            major: "Ilmu Komputer, 2021 - 2025",
            gpa: "IPK: 3.85/4.00",
        },
        experience: {
            title: "Perjalanan Saya",
            description: "Pencapaian yang menentukan jalur profesional dan akademik saya.",
            list: [
                {
                    company: "Adira Finance",
                    role: "Magang Analis Data",
                    period: "Feb 2025 - Feb 2026",
                    description: "Menganalisis tren data keuangan dan menghasilkan wawasan bisnis yang dapat ditindaklanjuti untuk mendukung pengambilan keputusan.",
                },
                {
                    company: "FILE",
                    role: "Spesialis Media Sosial",
                    period: "Nov 2023 - Nov 2024",
                    description: "Mengelola strategi konten media sosial, meningkatkan keterlibatan, dan menganalisis metrik audiens.",
                },
                {
                    company: "BNCC",
                    role: "Staf",
                    period: "Nov 2022 - Nov 2024",
                    description: "Berkontribusi pada komunitas teknologi dengan mengorganisir acara dan memfasilitasi berbagi pengetahuan antar mahasiswa.",
                },
                {
                    company: "Universitas Binus",
                    role: "Mahasiswa Ilmu Komputer",
                    period: "Agu 2022 - Agu 2026",
                    description: "Jurusan Ilmu Komputer. Fokus pada dasar-dasar Rekayasa Perangkat Lunak dan Sains Data.",
                },
            ]
        },
        skills: {
            title: "Arsenalt Teknis",
            description: "Keahlian dalam Sains Data, Pengembangan Perangkat Lunak, dan Desain.",
            categories: {
                data: "Data",
                dev: "Developer",
                design: "Desain",
                soft: "Soft Skills",
            },
            dataList: ["Python", "R", "Excel", "Looker Studio", "Tableau", "SQL"],
            devList: ["Python", "C", "Java", "SQL", "PHP", "R", "HTML", "CSS", "JavaScript", "Tailwind CSS", "Jira"],
            designList: ["Figma", "PowerPoint", "Canva"],
            softList: ["Komunikasi", "Pemecahan Masalah", "Kerjasama Tim", "Manajemen Waktu", "Adaptabilitas", "Kepemimpinan"],
        },
        interests: {
            title: "Minat Saya",
            description: "Berada di persimpangan Teknologi, Bisnis, dan Produk.",
            diagram: {
                tech: "Teknologi",
                biz: "Bisnis",
                prod: "Produk",
                innovation: "Inovasi",
            },
        },
        links: {
            instagram: "https://www.instagram.com/pprraaddiippaa/",
            linkedin: "https://www.linkedin.com/in/pradipajavierfatah/",
            github: "https://github.com/PradipaJavierFatah",
            cv: "https://drive.google.com/file/d/1t-r2kmtFKNNoYeTzi6sVxHe7-nLWJcYr/view?usp=sharing",
        },
        projects: {
            title: "Proyek Unggulan",
            description: "Pameran proyek saya dalam Rekayasa Perangkat Lunak dan Sains Data.",
            viewProject: "Lihat Proyek",
            viewCode: "Lihat Kode",
            confidentialMsg: "Proyek ini bersifat rahasia dan tidak dapat dilihat secara publik.",
            categories: {
                data: "Sains Data & Analitik",
                web: "Pengembangan Web",
                design: "Desain UI/UX",
            },
            data: [
                {
                    title: "Adira Finance Data Analyst",
                    description: "Menganalisis tren data keuangan dan menghasilkan wawasan bisnis yang dapat ditindaklanjuti untuk mendukung pengambilan keputusan.",
                    techStack: ["Python", "SQL", "Tableau", "Analisis Data"],
                    link: "CONFIDENTIAL",
                    github: "#",
                    image: "/images/Portofolio_DataAnalyst_Adira.png",
                },
                {
                    title: "Proyek Data Mining",
                    description: "Mengekstrak pola dan wawasan dari kumpulan data besar menggunakan teknik data mining tingkat lanjut.",
                    techStack: ["Python", "Pandas", "Scikit-learn"],
                    link: "#",
                    github: "#",
                    image: "/images/Portofolio_DataMining.png",
                },
                {
                    title: "Dashboard Visualisasi Data",
                    description: "Membuat dashboard interaktif untuk memvisualisasikan data kompleks, memudahkan interpretasi data.",
                    techStack: ["Tableau/Looker", "Visualisasi Data", "SQL"],
                    link: "#",
                    github: "#",
                    image: "/images/Portofolio_DataVisualization.png",
                }
            ],
            web: [
                {
                    title: "Sistem Layanan Penyaluran Sampah (SILAP)",
                    description: "Dashboard sistem laporan komprehensif untuk mengelola analitik data dan menghasilkan wawasan.",
                    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
                    link: "#",
                    github: "#",
                    image: "/images/Portofolio_SILAP.png",
                },
                {
                    title: "Kawan Project",
                    description: "Aplikasi web yang dirancang untuk menghubungkan orang-orang dan meningkatkan keterlibatan komunitas.",
                    techStack: ["React", "Node.js", "MongoDB"],
                    link: "https://github.com/PradipaJavierFatah/kawan_project_v2",
                    github: "#",
                    image: "/images/Portofolio_KawanProject.png",
                }
            ],
            design: [
                {
                    title: "Desain Ulang Aplikasi Adira",
                    description: "Mendesain ulang antarmuka pengguna untuk aplikasi mobile Adira guna meningkatkan pengalaman pengguna.",
                    techStack: ["Figma", "UI/UX", "Prototyping"],
                    link: "CONFIDENTIAL",
                    github: "#",
                    image: "/images/Portofolio_Design_Adira.png",
                },
                {
                    title: "Diswipe",
                    description: "Mendesain antarmuka pengguna yang bersih dan modern untuk aplikasi swiping digital.",
                    techStack: ["Figma", "Desain UI", "Riset Pengguna"],
                    link: "#",
                    github: "#",
                    image: "/images/Portofolio_Diswipe.png",
                },
                {
                    title: "Desain Majalah FILE",
                    description: "Membuat tata letak dan aset visual untuk kehadiran digital Majalah FILE.",
                    techStack: ["Adobe Creative Cloud", "Desain Tata Letak"],
                    link: "#",
                    github: "#",
                    image: "/images/Portofolio_Design_FILE.png",
                },
                {
                    title: "Desain Technoscape",
                    description: "Mendesain materi promosi dan identitas visual untuk acara Technoscape.",
                    techStack: ["Desain Grafis", "Branding"],
                    link: "#",
                    github: "#",
                    image: "/images/Portofolio_Design_Technoscape.png",
                }
            ]
        },
        socials: {
            title: "Terhubung Dengan Saya",
            description: "Temukan saya di platform berikut.",
            linkedin: "Jaringan Profesional",
            instagram: "Keseharian & Hobi",
            github: "Kode & Kontribusi",
        },

        contact: {
            title: "Hubungi Saya",
            subtitle: "Punya proyek atau hanya ingin menyapa? Saya ingin mendengar dari Anda.",
            name: "Nama",
            email: "Email",
            subject: "Subjek",
            message: "Pesan",
            send: "Kirim Pesan",
            sending: "Mengirim...",
            success: "Membuka Email...",
            note: "Catatan: Ini akan membuka aplikasi email default Anda untuk mengirim pesan.",
            successMsg: "Pesan terkirim! Saya akan membalas secepatnya. 🚀",
            errorMsg: "Terjadi kesalahan. Silakan coba lagi.",
        },
        footer: {
            builtBy: "Dibuat oleh",
            sourceCode: "Kode sumber tersedia di",
        },
        projectsPage: {
            title: "Proyek",
            description: "Kumpulan proyek yang mendemonstrasikan kemampuan saya dalam memecahkan masalah kompleks. Mulai dari aplikasi web full stack hingga visualisasi algoritmik.",
        },
    }
};

export const getDictionary = (locale: Locale) => DICTIONARY[locale];
