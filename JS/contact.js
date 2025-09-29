function sendMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp URL with the form data
    const whatsappNumber = '972592311460'; // Replace with your WhatsApp number
    const text = `الاسم: ${name}%0A` +
                `رقم الهاتف: ${phone}%0A` +
                `الرسالة: ${message}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
    
    // Reset the form
    document.getElementById('contactForm').reset();
    
    return false;
}
