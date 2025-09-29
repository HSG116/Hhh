// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            // Validate email
            if (!email) {
                showNewsletterMessage('يرجى إدخال بريدك الإلكتروني', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNewsletterMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التسجيل...';
            submitButton.disabled = true;
            emailInput.disabled = true;
            
            // Simulate processing time
            setTimeout(() => {
                // Show success message
                showNewsletterMessage('تم تسجيل بريدك الإلكتروني بنجاح! شكراً لك', 'success');
                
                // Clear the input
                emailInput.value = '';
                
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                emailInput.disabled = false;
            }, 1500);
        });
    }
});

// Function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show newsletter messages
function showNewsletterMessage(message, type) {
    const newsletterDiv = document.querySelector('.newsletter');
    
    // Remove any existing message
    const existingMessage = newsletterDiv.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `newsletter-message newsletter-${type}`;
    
    if (type === 'success') {
        messageElement.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        `;
    } else {
        messageElement.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        `;
    }
    
    // Insert message after the form
    const form = newsletterDiv.querySelector('.newsletter-form');
    form.after(messageElement);
    
    // Remove the message after 4 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 500);
    }, 4000);
}
