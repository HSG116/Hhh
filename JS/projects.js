// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all projects and filter buttons
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Show all projects initially
    projectCards.forEach(card => {
        card.classList.add('show');
    });

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    // Show card
                    if (!card.classList.contains('show')) {
                        card.style.display = 'block';
                        requestAnimationFrame(() => {
                            card.classList.add('show');
                        });
                    }
                } else {
                    // Hide card
                    card.classList.remove('show');
                    setTimeout(() => {
                        if (!card.classList.contains('show')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });

    // Initialize AOS animation library if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
        });
    });

    // Add click event to "More Details" buttons
    const detailButtons = document.querySelectorAll('.secondary-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.project-card');
            const projectDetails = {
                title: projectCard.querySelector('h3').textContent,
                description: projectCard.querySelector('p').textContent,
                image: projectCard.querySelector('img').src,
                tech: Array.from(projectCard.querySelectorAll('.project-tech span')).map(span => span.textContent),
                link: projectCard.querySelector('.primary-btn').href
            };
            showProjectDetails(projectDetails);
        });
    });
});

// Function to show project details in a modal
function showProjectDetails(details) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    
    // Create modal content
    modal.innerHTML = `
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
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Add modal show animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
}
