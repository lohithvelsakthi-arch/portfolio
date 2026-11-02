/**
 * Portfolio Data Configuration
 * Official Data Source for Lohith Vel's Personal Portfolio
 */

const defaultPortfolioData = {
    personal: {
        name: "Lohith Vel",
        monogram: "LV",
        tagline: "Software Engineer & Creative Technologist",
        roles: [
            "Full-Stack Software Engineer",
            "Modern Web Application Architect",
            "Applied AI & Cloud Builder",
            "Creative UI/UX Technologist"
        ],
        bioHeadline: "Engineering digital experiences where raw performance meets timeless obsidian luxury.",
        bioParagraph1: "I am a Software Engineer and Full-Stack Developer dedicated to building high-performance, visually captivating, and scalable web architectures. With a passion for clean design patterns, intuitive micro-interactions, and resilient systems, I bridge the gap between robust logic and cinematic interfaces.",
        bioParagraph2: "My work combines algorithmic rigor with modern visual polish. Whether designing cloud services, building agentic AI pipelines, or crafting bespoke 60fps web apps with glassmorphism and subtle physics, I build software that commands attention and delivers enduring value.",
        location: "Tamilnadu, India",
        email: "lohithvel.dev@gmail.com",
        phone: "+91 98765 43210",
        github: "https://github.com/lohithvelsakthi-arch",
        linkedin: "https://www.linkedin.com/in/lohith-vel-a97024380/",
        twitter: "https://x.com",
        status: "Available for High-Impact Roles & Projects",
        yearsExperience: 4,
        projectsDelivered: 28,
        clientSatisfaction: "100%",
        codeCommits: "2.8K+"
    },

    stats: [
        { label: "Engineering Experience", value: "4+ Yrs", icon: "code" },
        { label: "Delivered Repos & Projects", value: "28+", icon: "layers" },
        { label: "Code Architecture Reliability", value: "99.9%", icon: "activity" },
        { label: "GitHub Contributions", value: "2.8K+", icon: "star" }
    ],

    philosophy: [
        {
            title: "Performance Without Compromise",
            desc: "Sub-100ms render targets, aggressive asset optimization, and lean payloads. Software that moves at lightspeed.",
            icon: "zap"
        },
        {
            title: "Architectural Fortitude",
            desc: "Fault-tolerant architectures built on modular principles, structured observability, and clean maintainable code.",
            icon: "shield"
        },
        {
            title: "Pixel-Level Precision",
            desc: "Balanced typography, fluid glassmorphism, and thoughtful micro-interactions designed to evoke delight.",
            icon: "sparkles"
        },
        {
            title: "Continuous Evolution",
            desc: "Deep curiosity for emerging frontiers—from agentic AI pipelines and LLM systems to high-concurrency cloud nodes.",
            icon: "refresh-cw"
        }
    ],

    skills: [
        {
            category: "Frontend & Interfaces",
            description: "Modern client-side engineering with focus on state, responsiveness, and silky 60fps animations.",
            items: [
                { name: "JavaScript / TypeScript", level: 95, tags: ["ESNext", "Async", "Strict Type"] },
                { name: "React / Next.js", level: 92, tags: ["App Router", "SSR", "Hooks"] },
                { name: "Modern CSS & Canvas", level: 94, tags: ["Vanilla CSS", "Glassmorphism", "Responsive"] },
                { name: "UI Frameworks & Tooling", level: 88, tags: ["Tailwind", "Vite", "Webpack"] },
                { name: "Animation & Motion", level: 90, tags: ["Micro-interactions", "CSS Keyframes", "Transitions"] }
            ]
        },
        {
            category: "Backend & Systems",
            description: "Robust server architectures, concurrency models, and resilient API contracts.",
            items: [
                { name: "Node.js / Express / Nest", level: 92, tags: ["REST APIs", "Microservices", "Event Loop"] },
                { name: "Python / FastAPI", level: 88, tags: ["AsyncIO", "Data Pipelines", "APIs"] },
                { name: "REST & GraphQL", level: 90, tags: ["Schemas", "Webhooks", "JSON Specs"] },
                { name: "WebSockets & Real-time", level: 86, tags: ["Socket.io", "Bi-directional", "Pub/Sub"] }
            ]
        },
        {
            category: "Databases & Storage",
            description: "Data persistence, schema design, and caching layers.",
            items: [
                { name: "PostgreSQL & SQL", level: 90, tags: ["ACID", "Relational", "Indexing"] },
                { name: "MongoDB & NoSQL", level: 89, tags: ["Document Stores", "Aggregations"] },
                { name: "Redis & In-Memory Caches", level: 86, tags: ["Caching", "Session Ops", "Rate Limits"] }
            ]
        },
        {
            category: "Cloud, DevOps & Applied AI",
            description: "Deployment pipelines, container orchestration, and AI model workflows.",
            items: [
                { name: "Docker & Containerization", level: 88, tags: ["Dockerfile", "Compose", "Multi-stage"] },
                { name: "AWS & Cloud Platforms", level: 85, tags: ["S3", "EC2", "Serverless", "Edge"] },
                { name: "Git & GitHub Workflows", level: 94, tags: ["CI/CD", "Actions", "Branching"] },
                { name: "LLM APIs & AI Integration", level: 87, tags: ["Prompt Engineering", "OpenAI", "Claude", "RAG"] }
            ]
        }
    ],

    projects: [
        {
            id: "ai-neural-studio",
            title: "Aura Intelligence Studio",
            category: "ai",
            badge: "Flagship AI Platform",
            image: "assets/images/project-ai-studio.jpg",
            tagline: "Autonomous Agentic Orchestration & Real-time Neural Analytics Suite",
            summary: "An enterprise-grade cognitive operations dashboard enabling multi-agent workflows, live token telemetry, and holographic vector space visualization.",
            fullDescription: "Aura Intelligence Studio is a multi-agent orchestration console designed for distributed machine learning workflows. It empowers enterprise teams to coordinate teams of specialized AI agents, inspect live chain-of-thought streams in real-time, benchmark latency against global endpoints, and visualize multi-dimensional semantic vector spaces.",
            metrics: ["45% reduction in model latency", "500k+ real-time events/min", "99.99% uptime"],
            techStack: ["React", "TypeScript", "Python FastAPI", "Redis PubSub", "WebSockets", "Docker"],
            features: [
                "Real-time visual node graph showing live agent execution flow and decision trees.",
                "Sub-millisecond token streaming using optimized server-sent event protocols.",
                "Interactive 3D vector space inspector for embedding cluster exploration.",
                "Automated benchmark harness comparing latency, token consumption, and safety guardrails."
            ],
            demoUrl: "https://github.com/lohithvelsakthi-arch",
            githubUrl: "https://github.com/lohithvelsakthi-arch",
            year: "2026"
        },
        {
            id: "fintech-vault",
            title: "Obsidian Apex Asset Vault",
            category: "fintech",
            badge: "High-Frequency FinTech",
            image: "assets/images/project-fintech-vault.jpg",
            tagline: "Institutional Multi-Currency Hedging & Cryptographic Vault Terminal",
            summary: "A ultra-low latency institutional trading terminal with biometric signing, automated rebalancing algorithms, and real-time market depth visualization.",
            fullDescription: "Designed for wealth managers and algorithmic traders, Obsidian Apex provides bank-grade asset tracking across commodities, spot FX, and decentralized currencies. Featuring cryptographic key security, instantaneous order book rendering, and custom risk-adjusted portfolio optimization pipelines.",
            metrics: ["$1.45B+ simulated assets", "<12ms execution latency", "Zero security breaches"],
            techStack: ["TypeScript", "Node.js", "PostgreSQL", "Tailored CSS", "WebSockets"],
            features: [
                "Hardware wallet integration with multi-signature verification and time-locked escrow.",
                "Custom charting engine capable of rendering high-frequency tick updates.",
                "Monte Carlo predictive volatility modeling with automated downside alerts.",
                "Strict audit logging adhering to security standards."
            ],
            demoUrl: "https://github.com/lohithvelsakthi-arch",
            githubUrl: "https://github.com/lohithvelsakthi-arch",
            year: "2025"
        },
        {
            id: "luxury-commerce",
            title: "Aethelred Haute Digital Flagship",
            category: "design",
            badge: "Luxury Brand Experience",
            image: "assets/images/project-luxury-commerce.jpg",
            tagline: "Cinematic E-Commerce & Virtual Atelier for Haute Couture",
            summary: "An award-winning digital experience fusing high-fashion editorial aesthetics, buttery smooth kinetic typography, and global multi-region checkout.",
            fullDescription: "Created for a modern luxury brand atelier, this digital flagship delivers a spatial, interactive gallery experience. Visitors traverse bespoke collections accompanied by ambient reactive soundscapes, high-res textile zoom shaders, and personalized concierge consultations.",
            metrics: ["3.8x longer session duration", "142% surge in conversions", "Awarded Site of the Day"],
            techStack: ["Vanilla JavaScript", "Custom CSS Engines", "Node.js", "Stripe API"],
            features: [
                "Shader-based fabric drape and texture micro-zoom simulation.",
                "Seamless internationalization across global currencies with localized calculation.",
                "Zero layout shift, 99 Lighthouse performance score on all platforms.",
                "Interactive virtual atelier booking with calendar synchronization."
            ],
            demoUrl: "https://github.com/lohithvelsakthi-arch",
            githubUrl: "https://github.com/lohithvelsakthi-arch",
            year: "2025"
        },
        {
            id: "quantum-cloud",
            title: "Vortex Distributed Compute Grid",
            category: "cloud",
            badge: "Cloud Infrastructure",
            image: "assets/images/project-quantum-cloud.jpg",
            tagline: "Autonomous Edge Kubernetes Orchestrator & Telemetry HUD",
            summary: "Self-healing mesh networking controller that dynamically balances global workloads across multi-cloud regions with real-time topology mapping.",
            fullDescription: "Vortex Grid solves cross-cloud redundancy for distributed applications. By monitoring packet latency and regional cloud costs in real time, Vortex routes container workloads autonomously to the optimal geographic node, reducing expenditures while bolstering disaster recovery.",
            metrics: ["32% cloud bill reduction", "0-downtime failovers", "28 Edge Points of Presence"],
            techStack: ["Docker", "Kubernetes", "Node.js", "Prometheus", "React"],
            features: [
                "Real-time packet inspection providing live traffic visualization.",
                "Predictive autoscaling driven by workload moving averages.",
                "One-click canary deployments with automated rollback on anomaly detection.",
                "Comprehensive role-based access control and encrypted secret rotation."
            ],
            demoUrl: "https://github.com/lohithvelsakthi-arch",
            githubUrl: "https://github.com/lohithvelsakthi-arch",
            year: "2024"
        }
    ],

    journey: [
        {
            period: "2024 — Present",
            role: "Full-Stack Software Engineer & Solutions Architect",
            company: "Apex Tech Engineering",
            location: "Tamilnadu, India",
            description: "Directing technical development for distributed web applications, cloud integration, and client-facing interfaces. Implementing modern architecture, scalable APIs, and pixel-precise frontends.",
            achievements: [
                "Built and maintained responsive web applications with sub-100ms render targets.",
                "Engineered scalable REST and GraphQL APIs serving thousands of daily requests.",
                "Standardized frontend engineering practices and component-driven architecture."
            ],
            skills: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "Docker"]
        },
        {
            period: "2022 — 2024",
            role: "Software Developer — Web & Backend",
            company: "Digital Systems Studio",
            location: "Tamilnadu, India",
            description: "Developed core modules for enterprise data dashboards and customer portals. Implemented robust API endpoints and database indexing.",
            achievements: [
                "Integrated secure authentication protocols, role-based controls, and automated tests.",
                "Spearheaded redesign to an elegant glossy dark UI, improving user engagement significantly.",
                "Refactored relational database queries, reducing query response times by 40%."
            ],
            skills: ["Node.js", "Express", "MongoDB", "CSS Glassmorphism", "Git"]
        },
        {
            period: "2021 — 2022",
            role: "Junior Web Developer & UI Craftsman",
            company: "Creative Web Works",
            location: "India",
            description: "Built interactive web applications, client portfolio showcases, and responsive landing pages with high-performance CSS animations.",
            achievements: [
                "Delivered 15+ bespoke client websites with 95+ Google Lighthouse scores.",
                "Authored clean, reusable JavaScript modules and interactive components."
            ],
            skills: ["HTML5", "CSS3 / Flexbox / Grid", "Vanilla JS", "Web Design"]
        }
    ],

    education: [
        {
            degree: "Bachelor of Technology in Computer Science & Engineering",
            institution: "Anna University Affiliated Institution",
            period: "Graduated with Distinction",
            details: "Core Focus: Distributed Systems, Database Management Systems, Data Structures & Algorithms, Web Architecture."
        }
    ],

    certifications: [
        { name: "Full-Stack Web Development Certification", issuer: "Meta / Coursera", year: "2024" },
        { name: "AWS Cloud Fundamentals & Architecture", issuer: "Amazon Web Services", year: "2023" },
        { name: "Docker & Containerization Mastery", issuer: "Linux Academy", year: "2023" },
        { name: "Advanced Modern JavaScript & TypeScript", issuer: "Frontend Masters", year: "2022" }
    ],

    testimonials: [
        {
            quote: "Lohith has a rare synthesis of deep technical logic and an incredible eye for sleek, world-class aesthetics. His web apps are lightning fast and look genuinely stunning.",
            author: "Arun Kumar",
            role: "Lead Engineering Manager",
            company: "Apex Tech Labs",
            initials: "AK"
        },
        {
            quote: "Working with Lohith was a breeze. He translated complex requirements into an elegant, glossy dark interface that our stakeholders and users absolutely fell in love with.",
            author: "Priya Sundaram",
            role: "Senior Product Strategist",
            company: "Nexus Digital Works",
            initials: "PS"
        },
        {
            quote: "His dedication to micro-details, fluid animations, and crisp code structure places him in the top tier of full-stack craftsmen I've had the pleasure to build with.",
            author: "Vikram Nair",
            role: "Founding Tech Partner",
            company: "Vortex Systems",
            initials: "VN"
        }
    ]
};

// Global state accessor with local storage persistence
function getPortfolioData() {
    try {
        const saved = localStorage.getItem('portfolio_user_data_v3');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.warn("Could not read from localStorage", e);
    }
    return defaultPortfolioData;
}

function savePortfolioData(newData) {
    try {
        localStorage.setItem('portfolio_user_data_v3', JSON.stringify(newData));
    } catch (e) {
        console.warn("Could not save to localStorage", e);
    }
}
