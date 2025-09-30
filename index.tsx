// Fix: Add declaration for AOS to avoid 'Cannot find name' error.
declare var AOS: any;

document.addEventListener('DOMContentLoaded', () => {

    /**
     * ------------------------------------------------------------------------
     *  1. Preloader Logic
     * ------------------------------------------------------------------------
     */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
            document.body.classList.add('loaded');
            // Initialize AOS after everything is loaded to ensure correct calculations
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                easing: 'ease-in-out-cubic'
            });
        });
    }

    /**
     * ------------------------------------------------------------------------
     *  2. Main App Initialization
     * ------------------------------------------------------------------------
     */
    function initApp() {
        createStars(); // Add star background
        initNavigation();
        initScrollBehavior();
        initInteractiveEffects();
        initProjectFilteringAndModal();
        initContactForm();
        initNewsletterForm();
        initTypingEffect(); // Add typing effect
        createOrbitalDots(); // Add orbital dots to hero
    }
    
    /**
     * ------------------------------------------------------------------------
     *  Aesthetic & Background Effects
     * ------------------------------------------------------------------------
     */
     function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;';
        document.body.prepend(starsContainer);

        const createStar = () => {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.background = '#fff';
            star.style.borderRadius = '50%';
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animation = `twinkle ${Math.random() * 5 + 3}s linear infinite alternate`;
            star.style.opacity = `${Math.random() * 0.5 + 0.2}`;
            starsContainer.appendChild(star);
        };

        for (let i = 0; i < 150; i++) {
            createStar();
        }

        const keyframes = `
            @keyframes twinkle {
                to { opacity: 1; }
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);
    }
    
    function createOrbitalDots() {
        const heroLogo = document.querySelector<HTMLElement>('.hero-logo');
        if (heroLogo) {
            for (let i = 0; i < 3; i++) {
                const orbit = document.createElement('div');
                orbit.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: ${120 + i * 40}%;
                    height: ${120 + i * 40}%;
                    transform: translate(-50%, -50%);
                    animation: rotate 1${i * 2 + 5}s linear infinite;
                    border: 1px solid rgba(78, 107, 255, 0.15);
                    border-radius: 50%;
                `;

                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: absolute;
                    top: -4px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 8px;
                    height: 8px;
                    background-color: var(--primary-color);
                    border-radius: 50%;
                    box-shadow: 0 0 10px var(--shadow-color);
                `;

                orbit.appendChild(dot);
                heroLogo.appendChild(orbit);
            }
            
            const keyframes = `
                @keyframes rotate {
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            const styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = keyframes;
            document.head.appendChild(styleSheet);
        }
    }
    
    function initTypingEffect() {
        const element = document.querySelector<HTMLElement>('.hero-content .animate-text .highlight');
        if (!element) return;
        
        const text = element.textContent.trim();
        element.textContent = '';
        element.style.display = 'inline-block';
        let i = 0;

        // Ensure parent is visible before starting
        if (element.closest('.animate-text')) {
             (element.closest('.animate-text') as HTMLElement).style.opacity = '1';
        }

        const type = () => {
             if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 120);
            } else {
                 element.classList.add('typing-done');
            }
        }
        // Start after a delay to sync with other animations
        setTimeout(type, 500);

        const keyframes = `
            .hero-content .highlight.typing-done::after {
                content: '_';
                font-weight: bold;
                margin-right: 2px;
                animation: blink 0.7s infinite;
            }
            @keyframes blink {
                50% { opacity: 0; }
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);
    }

    /**
     * ------------------------------------------------------------------------
     *  3. Navigation Handling (Mobile Menu, Active Links)
     * ------------------------------------------------------------------------
     */
    function initNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        const body = document.body;
        const navLinks = document.querySelectorAll('nav a');

        if (!menuToggle || !nav) return;

        const menuBackdrop = document.createElement('div');
        menuBackdrop.className = 'menu-backdrop';
        body.appendChild(menuBackdrop);

        const toggleMenu = (forceClose = false) => {
            const isActive = nav.classList.contains('active') && !forceClose;
            nav.classList.toggle('active', !isActive);
            menuToggle.classList.toggle('active', !isActive);
            menuBackdrop.classList.toggle('active', !isActive);
            body.classList.toggle('menu-open', !isActive);
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', isActive);
                icon.classList.toggle('fa-times', !isActive);
            }
        };

        menuToggle.addEventListener('click', () => toggleMenu());
        menuBackdrop.addEventListener('click', () => toggleMenu(true));
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu(true);
                }
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggleMenu(true);
            }
        });

        // Active link highlighting on scroll
        const sections = document.querySelectorAll<HTMLElement>('section[id]');
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 150;
            sections.forEach(section => {
                if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                    const currentId = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { passive: true });
    }

    /**
     * ------------------------------------------------------------------------
     *  4. Scroll-based Behaviors (Sticky Header, Scroll-to-Top)
     * ------------------------------------------------------------------------
     */
    function initScrollBehavior() {
        const header = document.querySelector('header');
        const scrollToTopBtn = document.getElementById('scrollToTop');

        if (header) {
            window.addEventListener('scroll', () => {
                header.classList.toggle('sticky', window.scrollY > 50);
            }, { passive: true });
        }

        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                scrollToTopBtn.classList.toggle('visible', window.scrollY > 500);
            }, { passive: true });
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    /**
     * ------------------------------------------------------------------------
     *  5. Interactive Effects (3D Card Tilt & Glow)
     * ------------------------------------------------------------------------
     */
    function initInteractiveEffects() {
        const cards = document.querySelectorAll<HTMLElement>('.service-card, .project-card, .feature');
        cards.forEach(card => {
            // 3D Tilt Effect
            card.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const { width, height } = rect;
                const rotateX = (y / height - 0.5) * -10; // Max 5deg rotation
                const rotateY = (x / width - 0.5) * 20; // Max 10deg rotation

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                
                // Glow effect
                const glow = card.querySelector('.glow-effect') as HTMLElement;
                if (glow) {
                   glow.style.left = `${x}px`;
                   glow.style.top = `${y}px`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
            
            // Add glow element
            const glowEffect = document.createElement('div');
            glowEffect.className = 'glow-effect';
            card.prepend(glowEffect);
        });
        
        // Add CSS for glow effect
        const style = document.createElement('style');
        style.textContent = `
            .service-card, .project-card, .feature {
                position: relative;
                overflow: hidden;
            }
            .glow-effect {
                position: absolute;
                width: 200px;
                height: 200px;
                background: radial-gradient(circle, rgba(var(--primary-rgb, 78, 107, 255), 0.15) 0%, transparent 70%);
                pointer-events: none;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
                opacity: 0;
            }
            .service-card:hover .glow-effect, 
            .project-card:hover .glow-effect, 
            .feature:hover .glow-effect {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * ------------------------------------------------------------------------
     *  6. Project Filtering and Modal Logic
     * ------------------------------------------------------------------------
     */
    function initProjectFilteringAndModal() {
        const filterButtons = document.querySelectorAll<HTMLElement>('.filter-btn');
        const projectCards = document.querySelectorAll<HTMLElement>('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    const shouldShow = filter === 'all' || category === filter;
                    // Use style.display for direct manipulation, as project-card is a flex container
                    card.style.display = shouldShow ? 'flex' : 'none';
                });
            });
        });
        
        // Modal Logic
        document.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectCard = button.closest('.project-card');
                if (!projectCard) return;

                const details = {
                    title: projectCard.querySelector('h3')?.textContent || 'N/A',
                    description: projectCard.querySelector('p')?.textContent || 'N/A',
                    image: (projectCard.querySelector('img') as HTMLImageElement)?.src || '',
                    tech: Array.from(projectCard.querySelectorAll('.project-tech span')).map(span => span.textContent),
                    link: (projectCard.querySelector('.primary-btn') as HTMLAnchorElement)?.href || '#'
                };
                showProjectDetails(details);
            });
        });

        function showProjectDetails(details) {
            const modalHTML = `
                <div class="project-modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="modal-body">
                            <div class="modal-image">
                                <img src="${details.image}" alt="${details.title}">
                            </div>
                            <h3>${details.title}</h3>
                            <p>${details.description}</p>
                            <div class="modal-tech">
                                <h4>التقنيات المستخدمة:</h4>
                                <div class="tech-tags">
                                    ${details.tech.map(tech => `<span>${tech}</span>`).join('')}
                                </div>
                            </div>
                            <a href="${details.link}" target="_blank" class="btn primary-btn">
                                <i class="fas fa-external-link-alt"></i> زيارة الموقع
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            const modal = document.querySelector('.project-modal');
            if(!modal) return;
            
            setTimeout(() => modal.classList.add('show'), 10);

            const closeModal = () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            };

            (modal.querySelector('.close-modal') as HTMLElement).addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
    }

    /**
     * ------------------------------------------------------------------------
     *  7. Contact Form (WhatsApp Integration)
     * ------------------------------------------------------------------------
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
                const nameInput = document.getElementById('name') as HTMLInputElement;
                const phoneInput = document.getElementById('phone') as HTMLInputElement;
                const messageInput = document.getElementById('message') as HTMLTextAreaElement;

                if (!nameInput || !phoneInput || !messageInput) return;
                
                const name = nameInput.value;
                const phone = phoneInput.value;
                const message = messageInput.value;
                
                const whatsappNumber = '972592311460';
                const text = `الاسم: ${name}%0A` +
                             `رقم الهاتف: ${phone}%0A` +
                             `الرسالة: ${message}`;
                
                const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;
                
                window.open(whatsappUrl, '_blank');
                
                (contactForm as HTMLFormElement).reset();
            });
        }
    }

    /**
     * ------------------------------------------------------------------------
     *  8. Newsletter Form
     * ------------------------------------------------------------------------
     */
    function initNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]') as HTMLInputElement;
            const submitButton = this.querySelector('button[type="submit"]') as HTMLButtonElement;
            const email = emailInput.value.trim();

            const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!email || !isValidEmail(email)) {
                showNewsletterMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            const originalButtonContent = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            emailInput.disabled = true;
            
            setTimeout(() => {
                showNewsletterMessage('تم تسجيل بريدك الإلكتروني بنجاح! شكراً لك', 'success');
                emailInput.value = '';
                submitButton.innerHTML = originalButtonContent;
                submitButton.disabled = false;
                emailInput.disabled = false;
            }, 1500);
        });

        function showNewsletterMessage(message, type) {
            const newsletterDiv = document.querySelector('.newsletter');
            if(!newsletterDiv) return;

            const existingMessage = newsletterDiv.querySelector('.newsletter-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            const messageElement = document.createElement('div');
            messageElement.className = `newsletter-message newsletter-${type}`;
            messageElement.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i> <p>${message}</p>`;
            
            newsletterForm.after(messageElement);
            
            setTimeout(() => {
                messageElement.classList.add('fade-out');
                setTimeout(() => messageElement.remove(), 500);
            }, 4000);
        }
    }

    // Run the app
    initApp();
});