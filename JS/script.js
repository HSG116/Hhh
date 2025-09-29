// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    createStars();
    createOrbitalDots();
    initAnimations();
    initNavigation();
    initSkillsAnimation();
    initContactForm();
});

// Create orbital dots around profile image
function createOrbitalDots() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        // Create 3 orbital dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'orbital-dot';
            
            // Add random animation delay
            const delay = Math.random() * 2;
            dot.style.animationDelay = `${delay}s`;
            
            heroImage.appendChild(dot);
        }
    }
}

// Create stars in the background
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.prepend(starsContainer);
    
    // Create random stars
    const isMobile = window.innerWidth < 768;
    const numberOfStars = isMobile ? 100 : 200;
    
    // Create regular stars
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        
        // Determine star size class
        const sizeRandom = Math.random();
        if (sizeRandom < 0.6) {
            star.className = 'star small';
        } else if (sizeRandom < 0.9) {
            star.className = 'star medium';
        } else {
            star.className = 'star large';
        }
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        
        // Random twinkle duration between 2s and 8s
        const twinkleDuration = Math.random() * 6 + 2;
        star.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
        
        // Random delay
        const delay = Math.random() * 8;
        star.style.animationDelay = `${delay}s`;
        
        // Add star to container
        starsContainer.appendChild(star);
    }
    
    // Create shooting stars
    const numberOfShootingStars = isMobile ? 3 : 5;
    
    for (let i = 0; i < numberOfShootingStars; i++) {
        createShootingStar(starsContainer);
    }
    
    // Create new shooting stars periodically
    setInterval(() => {
        const existingShootingStars = starsContainer.querySelectorAll('.shooting-star');
        if (existingShootingStars.length < numberOfShootingStars) {
            createShootingStar(starsContainer);
        }
    }, 8000);
}

// Create a shooting star
function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random position (top)
    const posY = Math.random() * 60; // Only in the top 60% of the screen
    shootingStar.style.top = `${posY}%`;
    
    // Random rotation angle
    const rotationAngle = Math.random() * 20 - 10; // Between -10 and 10 degrees
    shootingStar.style.setProperty('--rotation-angle', `${rotationAngle}deg`);
    
    // Random duration between 2s and 4s
    const duration = Math.random() * 2 + 2;
    shootingStar.style.setProperty('--shooting-duration', `${duration}s`);
    
    // Random delay before animation starts
    const delay = Math.random() * 15;
    shootingStar.style.animationDelay = `${delay}s`;
    
    // Add shooting star to container
    container.appendChild(shootingStar);
    
    // Remove shooting star after animation completes
    setTimeout(() => {
        if (container.contains(shootingStar)) {
            container.removeChild(shootingStar);
        }
    }, (delay + duration + 1) * 1000);
}

// Handle scroll events
window.addEventListener('scroll', function() {
    // Sticky header
    toggleStickyHeader();
    
    // Reveal elements on scroll
    revealOnScroll();
});

// Initialize animations
function initAnimations() {
    // Add a class to the body when the page is loaded
    document.body.classList.add('loaded');
    
    // Add corner decorations to project cards
    addProjectCardDecorations();
    
    // Add glow dots to skill cards
    addSkillCardGlowDots();
    
    // Animate elements that are in view on page load
    revealOnScroll();
}

// Add corner decorations to project cards
function addProjectCardDecorations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cornerDecoration = document.createElement('div');
        cornerDecoration.className = 'corner-decoration';
        card.appendChild(cornerDecoration);
    });
}

// Add glow dots to service cards
function addSkillCardGlowDots() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const glowDot = document.createElement('div');
        glowDot.className = 'glow-dot';
        card.appendChild(glowDot);
    });
}

// Handle navigation menu
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Create menu backdrop
    const menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    body.appendChild(menuBackdrop);
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuBackdrop.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Toggle menu icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking on backdrop
    menuBackdrop.addEventListener('click', function() {
        closeMenu();
    });
    
    // Close menu when clicking on a link (mobile)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Close menu when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Function to close menu
    function closeMenu() {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuBackdrop.classList.remove('active');
        body.classList.remove('menu-open');
        
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', highlightNavOnScroll);
    
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }
    
    // Call once on page load
    highlightNavOnScroll();
}

// Make header sticky on scroll
function toggleStickyHeader() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

// Animate skill bars when they come into view
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    // Initially set width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Create an observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the target width from the style attribute
                const targetWidth = entry.target.getAttribute('style').split('width: ')[1].split(';')[0] || '0%';
                
                // Reset width to 0 then animate to target
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each skill bar
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Reveal elements on scroll with animation
function revealOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('aos-animate');
        }
    });
}

// Handle contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !phone || !service || !message) {
                showFormMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            showFormMessage('جاري إرسال الرسالة...', 'info');
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                showFormMessage('تم إرسال رسالتك بنجاح!', 'success');
            }, 1500);
        });
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
    // Check if message element already exists
    let messageElement = document.querySelector('.form-message');
    
    // If not, create a new one
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        const contactForm = document.getElementById('contactForm');
        contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
    }
    
    // Set message content and style
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    // Auto-hide message after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
}

// Add CSS for form messages
const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: 12px;
        margin-top: 15px;
        border-radius: 5px;
        transition: opacity 0.5s ease;
    }
    
    .form-message.error {
        background-color: rgba(255, 87, 87, 0.1);
        color: #ff5757;
        border: 1px solid rgba(255, 87, 87, 0.3);
    }
    
    .form-message.success {
        background-color: rgba(87, 255, 87, 0.1);
        color: #57ff57;
        border: 1px solid rgba(87, 255, 87, 0.3);
    }
    
    .form-message.info {
        background-color: rgba(87, 87, 255, 0.1);
        color: #8787ff;
        border: 1px solid rgba(87, 87, 255, 0.3);
    }
    
    .aos-animate {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    [data-aos] {
        opacity: 0;
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    [data-aos="fade-up"] {
        transform: translateY(50px);
    }
    
    [data-aos="fade-down"] {
        transform: translateY(-50px);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(-50px);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(50px);
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.9);
    }
    
    header.sticky {
        padding: 10px 0;
        background-color: rgba(10, 10, 10, 0.95);
    }
`;
document.head.appendChild(style);

// Typing effect for hero section
function initTypingEffect() {
    const textElement = document.querySelector('.hero-content h1 .highlight');
    if (!textElement) return;
    
    const text = textElement.textContent;
    textElement.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);
}

// Initialize typing effect after a short delay
setTimeout(initTypingEffect, 1500);

// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Fix for navigation links to account for fixed header
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    if (scrollToTopBtn) {
        // Initially hide the button
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});