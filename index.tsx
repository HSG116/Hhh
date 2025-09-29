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
        initNavigation();
        initScrollBehavior();
        initInteractiveEffects();
        initProjectFilteringAndModal();
        initContactForm();
        initNewsletterForm();
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
        // Fix: Use generic type argument to specify that sections are HTMLElements.
        const sections = document.querySelectorAll<HTMLElement>('section[id]');
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 150;
            sections.forEach(section => {
                // Fix: section is now correctly typed as HTMLElement, so offsetTop and offsetHeight are available.
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
     *  5. Interactive Effects (3D Card Tilt)
     * ------------------------------------------------------------------------
     */
    function initInteractiveEffects() {
        // Fix: Specify that cards are HTMLElements to access style property.
        const cards = document.querySelectorAll<HTMLElement>('.service-card, .project-card, .feature');
        cards.forEach(card => {
            // Fix: Type the event as MouseEvent to access clientX and clientY.
            card.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const { width, height } = rect;
                const rotateX = (y / height - 0.5) * -10; // Max 5deg rotation
                const rotateY = (x / width - 0.5) * 20; // Max 10deg rotation

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    /**
     * ------------------------------------------------------------------------
     *  6. Project Filtering and Modal Logic
     * ------------------------------------------------------------------------
     */
    function initProjectFilteringAndModal() {
        // Fix: Specify that buttons and cards are HTMLElements to access dataset property.
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
                    card.classList.toggle('hidden', !shouldShow);
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
                    // Fix: Cast the selected element to HTMLAnchorElement to access the href property.
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
            
            setTimeout(() => modal.classList.add('show'), 10);

            const closeModal = () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            };

            modal.querySelector('.close-modal').addEventListener('click', closeModal);
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