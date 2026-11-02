/**
 * Lohith Vel Portfolio Application
 * Core Interactive Logic, Particle Systems, 3D Tilt, Audio FX & Modal Engines
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Store Initialization
    let appData = getPortfolioData();

    // 2. Audio Synthesizer (Web Audio API)
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.enabled = false;
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        toggle() {
            this.enabled = !this.enabled;
            if (this.enabled) this.init();
            return this.enabled;
        }

        playChime(freq = 520, duration = 0.25) {
            if (!this.enabled || !this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

                gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) {
                // Ignore audio failure gracefully
            }
        }

        playClick() {
            if (!this.enabled || !this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(280, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.08);
            } catch (e) {}
        }
    }

    const sound = new SoundEngine();
    const audioBtn = document.getElementById('audio-toggle');
    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            const isSoundOn = sound.toggle();
            audioBtn.classList.toggle('active', isSoundOn);
            showToast(isSoundOn ? "Sound FX Activated ♫" : "Sound FX Muted");
            if (isSoundOn) sound.playChime(640, 0.2);
        });
    }

    // 3. Theme Engine
    const themeButtons = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('portfolio_theme') || 'gold';
    applyTheme(savedTheme);

    function applyTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('portfolio_theme', themeName);
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-set-theme') === themeName);
        });
    }

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-set-theme');
            applyTheme(theme);
            sound.playChime(580, 0.15);
            showToast(`Theme switched to ${theme.toUpperCase()} Obsidian`);
        });
    });

    // 4. Custom Glowing Cursor Follower
    const cursorDot = document.getElementById('cursor-dot');
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        if (cursorFollower) {
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for interactive elements
    function attachCursorHoverEffects() {
        const hoverables = document.querySelectorAll('a, button, input, textarea, select, .project-card, .about-card, .timeline-card, .philo-card, .cert-card, .hero-card-3d');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
                sound.playClick();
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 5. Interactive Particle Starfield Canvas
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        });

        const particles = [];
        const particleCount = Math.min(width > 768 ? 65 : 30, 80);

        function initParticles() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.45,
                    vy: (Math.random() - 0.5) * 0.45,
                    radius: Math.random() * 1.8 + 0.6,
                    alpha: Math.random() * 0.5 + 0.2
                });
            }
        }
        initParticles();

        function renderParticles() {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles with subtle lines
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.x += p1.vx;
                p1.y += p1.vy;

                // Bounce at edges
                if (p1.x < 0 || p1.x > width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > height) p1.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(229, 184, 105, ${p1.alpha * 0.5})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(renderParticles);
        }
        renderParticles();
    }

    // 6. Dynamic Typing Effect for Hero Roles
    const typedRoleEl = document.getElementById('typed-role');
    if (typedRoleEl && appData.personal.roles && appData.personal.roles.length) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 90;
        const deleteSpeed = 40;
        const delayBetweenRoles = 2200;

        function typeLoop() {
            const currentRole = appData.personal.roles[roleIndex];
            if (isDeleting) {
                typedRoleEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedRoleEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => { isDeleting = true; typeLoop(); }, delayBetweenRoles);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % appData.personal.roles.length;
                setTimeout(typeLoop, 350);
                return;
            }

            setTimeout(typeLoop, isDeleting ? deleteSpeed : typingSpeed);
        }
        setTimeout(typeLoop, 800);
    }

    // 7. Dynamic Data Populator
    function renderAllContent() {
        // Hero Section
        const navMonogram = document.getElementById('nav-monogram');
        const navName = document.getElementById('nav-name');
        const badgeName = document.getElementById('badge-name');
        const heroBio = document.getElementById('hero-bio');
        const heroStatus = document.getElementById('hero-status');
        const metaLocation = document.getElementById('meta-location');
        const contactEmail = document.getElementById('contact-email');
        const footerName = document.getElementById('footer-name');
        const yearCopy = document.getElementById('year-copy');

        if (navMonogram) navMonogram.textContent = appData.personal.monogram;
        if (navName) navName.textContent = appData.personal.name;
        if (badgeName) badgeName.textContent = appData.personal.name;
        if (heroBio) heroBio.textContent = appData.personal.bioParagraph1;
        if (heroStatus) heroStatus.textContent = appData.personal.status;
        if (metaLocation) metaLocation.textContent = appData.personal.location;
        if (contactEmail) contactEmail.textContent = appData.personal.email;
        if (footerName) footerName.textContent = appData.personal.name;
        if (yearCopy) yearCopy.textContent = new Date().getFullYear();

        // Stats Row
        const statsContainer = document.getElementById('stats-container');
        if (statsContainer && appData.stats) {
            statsContainer.innerHTML = appData.stats.map(s => `
                <div class="stat-item">
                    <span class="stat-num">${s.value}</span>
                    <span class="stat-label">${s.label}</span>
                </div>
            `).join('');
        }

        // Skills Matrix
        renderSkills(appData.skills);

        // Projects Showcase
        renderProjects(appData.projects);

        // Journey Timeline
        renderTimeline(appData.journey);

        // Certifications
        renderCertifications(appData.certifications);

        // Testimonials
        renderTestimonials(appData.testimonials);

        // Populate CV
        populateResumeModal();

        // Refresh interactive cursors
        attachCursorHoverEffects();
        init3DTilt();
    }

    // Render Skills Function
    function renderSkills(skillCategories, query = "") {
        const skillsContainer = document.getElementById('skills-container');
        if (!skillsContainer) return;

        const normalizedQuery = query.toLowerCase().trim();

        skillsContainer.innerHTML = skillCategories.map(cat => {
            const filteredItems = cat.items.filter(item => {
                if (!normalizedQuery) return true;
                return item.name.toLowerCase().includes(normalizedQuery) ||
                       item.tags.some(t => t.toLowerCase().includes(normalizedQuery));
            });

            if (filteredItems.length === 0) return '';

            return `
                <div class="skill-category-card">
                    <div class="skill-category-header">
                        <div>
                            <div class="skill-category-title">${cat.category}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">${cat.description}</div>
                        </div>
                        <div style="color: var(--accent-primary); font-size: 1.1rem;">✦</div>
                    </div>
                    <div class="skill-items-list">
                        ${filteredItems.map(item => `
                            <div class="skill-item-row">
                                <div class="skill-info">
                                    <span class="skill-name">${item.name}</span>
                                    <span class="skill-pct">${item.level}%</span>
                                </div>
                                <div class="skill-bar-track">
                                    <div class="skill-bar-fill" style="width: ${item.level}%;"></div>
                                </div>
                                <div class="skill-tags">
                                    ${item.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Search input listener for skills
    const skillSearchInput = document.getElementById('skill-search-input');
    if (skillSearchInput) {
        skillSearchInput.addEventListener('input', (e) => {
            renderSkills(appData.skills, e.target.value);
            attachCursorHoverEffects();
        });
    }

    // Render Projects Function
    function renderProjects(projectsList, categoryFilter = "all") {
        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) return;

        const filtered = projectsList.filter(p => {
            if (categoryFilter === "all") return true;
            return p.category === categoryFilter;
        });

        projectsContainer.innerHTML = filtered.map(p => `
            <div class="project-card" data-tilt data-id="${p.id}">
                <div class="glossy-glare"></div>
                <div class="project-card-image">
                    <img src="${p.image}" alt="${p.title}" loading="lazy">
                    <span class="project-badge-pill">${p.badge}</span>
                </div>
                <div class="project-card-body">
                    <div class="project-card-header">
                        <h3 class="project-card-title">${p.title}</h3>
                        <span class="project-card-year">${p.year}</span>
                    </div>
                    <div class="project-card-tagline">${p.tagline}</div>
                    <p class="project-card-summary">${p.summary}</p>
                    
                    <div class="project-metrics-row">
                        ${p.metrics.map(m => `<span class="project-metric-tag">${m}</span>`).join('')}
                    </div>

                    <div class="project-tech-tags">
                        ${p.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>

                    <div class="project-card-footer">
                        <button class="btn-project-detail" data-project-id="${p.id}">
                            <span>Inspect Deep Dive</span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 16 16 12 12 8"></polyline>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                        </button>
                        <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-icon-link" title="Live Preview">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                        <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-icon-link" title="Source Code">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        // Wire project details button
        document.querySelectorAll('.btn-project-detail').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projId = btn.getAttribute('data-project-id');
                openProjectModal(projId);
            });
        });
    }

    // Project Filter Buttons
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            renderProjects(appData.projects, category);
            attachCursorHoverEffects();
            init3DTilt();
            sound.playClick();
        });
    });

    // Render Career Timeline
    function renderTimeline(journeyList) {
        const timelineContainer = document.getElementById('timeline-container');
        if (!timelineContainer) return;

        timelineContainer.innerHTML = `
            <div class="timeline-line"></div>
            ${journeyList.map(j => `
                <div class="timeline-item reveal-init">
                    <div class="timeline-dot"></div>
                    <div class="timeline-card">
                        <div class="timeline-header">
                            <h3 class="timeline-role">${j.role}</h3>
                            <span class="timeline-period">${j.period}</span>
                        </div>
                        <div class="timeline-company">${j.company} &bull; ${j.location}</div>
                        <p class="timeline-desc">${j.description}</p>
                        
                        <ul class="timeline-bullets">
                            ${j.achievements.map(a => `<li class="timeline-bullet-item">${a}</li>`).join('')}
                        </ul>

                        <div class="project-tech-tags" style="margin-bottom: 0;">
                            ${j.skills.map(s => `<span class="tech-tag">${s}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    }

    // Render Certifications
    function renderCertifications(certs) {
        const certsContainer = document.getElementById('certs-container');
        if (!certsContainer) return;

        certsContainer.innerHTML = certs.map(c => `
            <div class="cert-card">
                <div>
                    <div class="cert-name">${c.name}</div>
                    <div class="cert-issuer">${c.issuer}</div>
                </div>
                <div class="cert-year">Conferred ${c.year} &bull; Verified</div>
            </div>
        `).join('');
    }

    // Render Testimonials
    function renderTestimonials(testimonials) {
        const container = document.getElementById('testimonials-container');
        if (!container) return;

        container.innerHTML = testimonials.map(t => `
            <div class="testimonial-card">
                <div>
                    <div class="quote-icon">“</div>
                    <p class="testimonial-quote">${t.quote}</p>
                </div>
                <div class="testimonial-author-row">
                    <div class="testimonial-initials-badge">${t.initials || "EX"}</div>
                    <div class="author-info">
                        <h4>${t.author}</h4>
                        <p>${t.role}, ${t.company}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 8. 3D Tilt Physics for Cards with Specular Light Glare
    function init3DTilt() {
        const tiltCards = document.querySelectorAll('[data-tilt], #hero-tilt-card');
        tiltCards.forEach(card => {
            const glare = card.querySelector('.glossy-glare');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
                const rotateY = ((x - centerX) / centerX) * 9;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                if (glare) {
                    const glareX = (x / rect.width) * 100;
                    const glareY = (y / rect.height) * 100;
                    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 60%)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                if (glare) {
                    glare.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 65%)';
                }
            });
        });
    }

    // 9. Project Details Modal Logic
    const projectModal = document.getElementById('project-modal');
    const projectModalClose = document.getElementById('modal-project-close');

    function openProjectModal(projectId) {
        const project = appData.projects.find(p => p.id === projectId);
        if (!project) return;

        document.getElementById('modal-project-badge').textContent = project.badge;
        document.getElementById('modal-project-title').textContent = project.title;
        document.getElementById('modal-project-image').src = project.image;
        document.getElementById('modal-project-tagline').textContent = project.tagline;
        document.getElementById('modal-project-desc').textContent = project.fullDescription;

        const featuresEl = document.getElementById('modal-project-features');
        featuresEl.innerHTML = project.features.map(f => `
            <li style="color: #CBD5E1; margin-bottom: 8px; display: flex; gap: 8px; font-size: 0.92rem;">
                <span style="color: var(--accent-primary);">✔</span>
                <span>${f}</span>
            </li>
        `).join('');

        const techEl = document.getElementById('modal-project-tech');
        techEl.innerHTML = project.techStack.map(t => `<span class="tech-tag" style="font-size: 0.8rem; padding: 6px 12px;">${t}</span>`).join('');

        document.getElementById('modal-project-demo-btn').href = project.demoUrl;
        document.getElementById('modal-project-code-btn').href = project.githubUrl;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        sound.playChime(600, 0.2);
    }

    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }

    // 10. Resume Modal Logic
    const resumeModal = document.getElementById('resume-modal');
    const resumeModalClose = document.getElementById('modal-resume-close');
    const btnOpenResume = document.getElementById('btn-open-resume');
    const btnPrintResume = document.getElementById('btn-print-resume');

    function populateResumeModal() {
        const resumeList = document.getElementById('resume-experience-list');
        if (!resumeList) return;

        resumeList.innerHTML = appData.journey.map(j => `
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; font-weight: 700; color: #FFF;">
                    <span>${j.role} &mdash; ${j.company}</span>
                    <span style="color: var(--accent-primary); font-family: var(--font-mono); font-size: 0.85rem;">${j.period}</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">${j.location}</div>
                <ul style="list-style: square; padding-left: 20px; color: var(--text-secondary); font-size: 0.85rem;">
                    ${j.achievements.map(a => `<li style="margin-bottom: 4px;">${a}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        document.getElementById('resume-name').textContent = appData.personal.name;
        document.getElementById('resume-title').textContent = appData.personal.tagline;
        document.getElementById('resume-contact-line').textContent = `${appData.personal.location} • ${appData.personal.email} • ${appData.personal.phone}`;
    }

    if (btnOpenResume) {
        btnOpenResume.addEventListener('click', () => {
            resumeModal.classList.add('active');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            sound.playChime(640, 0.2);
        });
    }

    if (resumeModalClose) {
        resumeModalClose.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    }

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (btnPrintResume) {
        btnPrintResume.addEventListener('click', () => {
            window.print();
        });
    }

    // 11. Profile Personalizer Drawer
    const editorModal = document.getElementById('editor-modal');
    const editorModalClose = document.getElementById('modal-editor-close');
    const btnOpenEditor = document.getElementById('btn-open-editor');
    const editorForm = document.getElementById('editor-form');
    const btnResetData = document.getElementById('btn-reset-data');

    if (btnOpenEditor) {
        btnOpenEditor.addEventListener('click', () => {
            document.getElementById('edit-name').value = appData.personal.name;
            document.getElementById('edit-tagline').value = appData.personal.tagline;
            document.getElementById('edit-email').value = appData.personal.email;
            document.getElementById('edit-location').value = appData.personal.location;
            document.getElementById('edit-status').value = appData.personal.status;
            document.getElementById('edit-bio').value = appData.personal.bioParagraph1;

            editorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            sound.playClick();
        });
    }

    if (editorModalClose) {
        editorModalClose.addEventListener('click', () => {
            editorModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (editorForm) {
        editorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            appData.personal.name = document.getElementById('edit-name').value.trim();
            appData.personal.tagline = document.getElementById('edit-tagline').value.trim();
            appData.personal.email = document.getElementById('edit-email').value.trim();
            appData.personal.location = document.getElementById('edit-location').value.trim();
            appData.personal.status = document.getElementById('edit-status').value.trim();
            appData.personal.bioParagraph1 = document.getElementById('edit-bio').value.trim();

            const initials = appData.personal.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
            appData.personal.monogram = initials || "LV";

            savePortfolioData(appData);
            renderAllContent();

            editorModal.classList.remove('active');
            document.body.style.overflow = '';
            showToast("Profile personalized & saved to your browser!");
            sound.playChime(700, 0.25);
        });
    }

    if (btnResetData) {
        btnResetData.addEventListener('click', () => {
            localStorage.removeItem('portfolio_user_data');
            appData = getPortfolioData();
            renderAllContent();
            editorModal.classList.remove('active');
            document.body.style.overflow = '';
            showToast("Restored original defaults!");
        });
    }

    // 12. Interactive Developer Terminal Engine
    const termForm = document.getElementById('terminal-form');
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    const btnClearTerm = document.getElementById('btn-clear-term');

    const commands = {
        help: () => `
            <div class="term-output-line success">Available Commands:</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">bio</span>        - Print personal summary & architectural philosophy</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">skills</span>     - Inspect top technical proficiencies</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">projects</span>   - List flagship production systems</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">project &lt;1-4&gt;</span>- Open deep-dive inspection modal for project</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">contact</span>    - Print communication coordinates</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">theme &lt;name&gt;</span>- Switch obsidian theme (gold, chrome, emerald, sapphire)</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">resume</span>     - Open official printable curriculum vitae</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">matrix</span>     - Run matrix cyber telemetry mode</div>
            <div class="term-output-line">  <span style="color:var(--accent-primary)">clear</span>      - Clear terminal screen</div>
        `,
        bio: () => `
            <div class="term-output-line success">${appData.personal.name} &bull; ${appData.personal.tagline}</div>
            <div class="term-output-line">${appData.personal.bioParagraph1}</div>
            <div class="term-output-line system" style="margin-top:4px;">Base: ${appData.personal.location} | Status: ${appData.personal.status}</div>
        `,
        skills: () => `
            <div class="term-output-line success">Top Technical Proficiencies:</div>
            ${appData.skills.map(c => `
                <div class="term-output-line"><strong>${c.category}:</strong> ${c.items.map(i => `${i.name} (${i.level}%)`).join(', ')}</div>
            `).join('')}
        `,
        projects: () => `
            <div class="term-output-line success">Featured Engineering Projects:</div>
            ${appData.projects.map((p, idx) => `
                <div class="term-output-line">[${idx + 1}] <strong style="color:var(--accent-primary)">${p.title}</strong> (${p.year}) - ${p.tagline}</div>
            `).join('')}
            <div class="term-output-line system">Hint: Type 'project 1' through 'project 4' to trigger modal viewer.</div>
        `,
        contact: () => `
            <div class="term-output-line success">Communication Coordinates:</div>
            <div class="term-output-line">Email: <a href="mailto:${appData.personal.email}" style="color:var(--accent-primary)">${appData.personal.email}</a></div>
            <div class="term-output-line">GitHub: <a href="${appData.personal.github}" target="_blank" style="color:var(--accent-primary)">${appData.personal.github}</a></div>
            <div class="term-output-line">LinkedIn: <a href="${appData.personal.linkedin}" target="_blank" style="color:var(--accent-primary)">${appData.personal.linkedin}</a></div>
            <div class="term-output-line">Location: ${appData.personal.location}</div>
        `,
        github: () => {
            window.open(appData.personal.github, '_blank');
            return `<div class="term-output-line success">Opening GitHub: ${appData.personal.github}</div>`;
        },
        linkedin: () => {
            window.open(appData.personal.linkedin, '_blank');
            return `<div class="term-output-line success">Opening LinkedIn: ${appData.personal.linkedin}</div>`;
        },
        resume: () => {
            btnOpenResume.click();
            return `<div class="term-output-line success">Opening Curriculum Vitae modal...</div>`;
        },
        cv: () => {
            btnOpenResume.click();
            return `<div class="term-output-line success">Opening Curriculum Vitae modal...</div>`;
        },
        matrix: () => {
            applyTheme('emerald');
            return `
                <div class="term-output-line success">CYBER METRICS STREAM ENGAGED. MATRIX THEME ACTIVE.</div>
                <div class="term-output-line" style="color:#10B981; font-family:monospace;">01001100 01001111 01001000 01001001 01010100 01001000 00100000 01010110 01000101 01001100</div>
            `;
        },
        clear: () => {
            termBody.innerHTML = '';
            return '';
        }
    };

    if (termForm) {
        termForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cmdRaw = termInput.value.trim();
            if (!cmdRaw) return;

            const userLine = document.createElement('div');
            userLine.className = 'term-output-line';
            userLine.innerHTML = `<span style="color:var(--accent-primary)">lohith-shell:~$</span> <strong>${escapeHtml(cmdRaw)}</strong>`;
            termBody.appendChild(userLine);

            const parts = cmdRaw.toLowerCase().split(' ');
            const primaryCmd = parts[0];
            const arg = parts[1];

            sound.playClick();

            if (primaryCmd === 'clear') {
                termBody.innerHTML = '';
            } else if (primaryCmd === 'project' && arg) {
                const pNum = parseInt(arg, 10);
                if (pNum >= 1 && pNum <= appData.projects.length) {
                    const targetProj = appData.projects[pNum - 1];
                    openProjectModal(targetProj.id);
                    const resLine = document.createElement('div');
                    resLine.className = 'term-output-line success';
                    resLine.innerHTML = `Loaded project deep dive: <strong>${targetProj.title}</strong>`;
                    termBody.appendChild(resLine);
                } else {
                    const errLine = document.createElement('div');
                    errLine.className = 'term-output-line error';
                    errLine.textContent = `Project index '${arg}' not found. Valid: 1 - ${appData.projects.length}`;
                    termBody.appendChild(errLine);
                }
            } else if (primaryCmd === 'theme' && arg) {
                if (['gold', 'chrome', 'emerald', 'sapphire'].includes(arg)) {
                    applyTheme(arg);
                    const resLine = document.createElement('div');
                    resLine.className = 'term-output-line success';
                    resLine.textContent = `Theme switched to '${arg}'.`;
                    termBody.appendChild(resLine);
                } else {
                    const errLine = document.createElement('div');
                    errLine.className = 'term-output-line error';
                    errLine.textContent = `Unknown theme '${arg}'. Valid: gold, chrome, emerald, sapphire`;
                    termBody.appendChild(errLine);
                }
            } else if (commands[primaryCmd]) {
                const output = commands[primaryCmd]();
                if (output) {
                    const resLine = document.createElement('div');
                    resLine.innerHTML = output;
                    termBody.appendChild(resLine);
                }
            } else {
                const errLine = document.createElement('div');
                errLine.className = 'term-output-line error';
                errLine.innerHTML = `Command not recognized: '<span style="color:#FFF">${escapeHtml(cmdRaw)}</span>'. Type <span style="color:var(--accent-primary); font-weight:bold;">help</span> for manual.`;
                termBody.appendChild(errLine);
            }

            termInput.value = '';
            termBody.scrollTop = termBody.scrollHeight;
        });
    }

    if (btnClearTerm) {
        btnClearTerm.addEventListener('click', () => {
            termBody.innerHTML = '<div class="term-output-line system">Terminal reset. Type <strong>help</strong> for commands.</div>';
            sound.playClick();
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // 13. Contact Form Submission & Toast Engine
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email-input').value.trim();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Encrypting &amp; Transmitting...</span>`;
            sound.playChime(500, 0.3);

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                contactForm.reset();
                showToast(`Thank you, ${name}! Your transmission has been queued.`);
                sound.playChime(800, 0.35);
            }, 1200);
        });
    }

    // Coffee Chat Button
    const btnCoffeeChat = document.getElementById('btn-coffee-chat');
    if (btnCoffeeChat) {
        btnCoffeeChat.addEventListener('click', () => {
            showToast("Coffee chat slot requested! Redirecting to email coordinate...");
            setTimeout(() => {
                window.location.href = `mailto:${appData.personal.email}?subject=Coffee%20Chat%20Request%20-%20Lohith%20Vel&body=Hi%20Lohith,%20I'd%20love%20to%20connect%20for%20a%2015-minute%20introductory%20chat!`;
            }, 800);
        });
    }

    // Copy to Clipboard buttons
    document.querySelectorAll('.btn-copy-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied ${textToCopy} to clipboard!`);
                    sound.playClick();
                });
            } else {
                showToast(`Address: ${textToCopy}`);
            }
        });
    });

    // Toast Notification helper
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3600);
    }

    // 14. Scroll Progress & ScrollSpy
    const progressBar = document.getElementById('scroll-progress-bar');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = `${scrolled}%`;

        // Condensed header shadow
        if (header) {
            if (winScroll > 60) {
                header.style.top = '10px';
            } else {
                header.style.top = '18px';
            }
        }

        // Active link scroll spy
        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 140;
            if (winScroll >= secTop) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            sound.playClick();
        });

        // Close on link click
        navLinksContainer.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
            });
        });
    }

    // Back to top
    const btnBackToTop = document.getElementById('btn-back-to-top');
    if (btnBackToTop) {
        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sound.playChime(500, 0.2);
        });
    }

    // 15. Scroll Reveal Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-init').forEach(el => observer.observe(el));

    // Initial render
    renderAllContent();
});
