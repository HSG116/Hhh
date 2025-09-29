// تحسين تأثيرات الخدمات
document.addEventListener('DOMContentLoaded', () => {
    // إضافة تأثيرات ظهور الخدمات
    const servicesContainer = document.querySelector('.services-container');
    const serviceCards = document.querySelectorAll('.service-card');

    // Intersection Observer للخدمات
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                serviceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // تطبيق المراقب على كل بطاقة خدمة
    serviceCards.forEach(card => {
        card.classList.add('service-animate');
        serviceObserver.observe(card);
    });

    // تأثيرات تفاعلية للصور
    const serviceImages = document.querySelectorAll('.service-image');
    serviceImages.forEach(image => {
        image.addEventListener('click', () => {
            openImageModal(image.src, image.alt);
        });
    });

    // إنشاء modal للصور
    function createImageModal() {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="" alt="" class="modal-image">
            </div>
        `;
        document.body.appendChild(modal);
        
        // إغلاق Modal عند النقر
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        return modal;
    }

    const imageModal = createImageModal();

    function openImageModal(src, alt) {
        const modalImage = imageModal.querySelector('.modal-image');
        modalImage.src = src;
        modalImage.alt = alt;
        imageModal.classList.add('active');
    }

    // تأثيرات تفاعلية للأيقونات
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('icon-pulse');
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('icon-pulse');
        });
    });

    // إضافة تأثير hover متقدم للبطاقات
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const glowEffect = document.createElement('div');
            glowEffect.className = 'card-glow-effect';
            card.appendChild(glowEffect);
            
            // تحديث موقع التأثير مع حركة الماوس
            card.addEventListener('mousemove', moveGlow);
        });

        card.addEventListener('mouseleave', () => {
            const glowEffect = card.querySelector('.card-glow-effect');
            if (glowEffect) {
                glowEffect.remove();
            }
            card.removeEventListener('mousemove', moveGlow);
        });
    });

    function moveGlow(e) {
        const glowEffect = this.querySelector('.card-glow-effect');
        if (glowEffect) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glowEffect.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    // إضافة تأثير للقوائم
    const serviceLists = document.querySelectorAll('.service-details li');
    serviceLists.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('list-item-highlight');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('list-item-highlight');
        });
    });
});
