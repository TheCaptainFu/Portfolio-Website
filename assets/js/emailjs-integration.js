/**
 * EmailJS Contact Form Integration
 * Alternative to PHP backend for client-side email sending
 * 
 * Setup Instructions:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create email service and template
 * 3. Replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID below
 * 4. Include EmailJS script in your HTML
 * 
 * Usage:
 * Replace the contact form JavaScript in contact.html with this file
 */

// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm(
                'YOUR_SERVICE_ID',    // Replace with your service ID
                'YOUR_TEMPLATE_ID',   // Replace with your template ID
                contactForm
            )
            .then(function(response) {
                // Success
                console.log('SUCCESS!', response.status, response.text);
                showMessage('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                // Error
                console.log('FAILED...', error);
                showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Show message function (matches the existing theme styling)
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message p-4 rounded-lg mb-6 ${
        type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
    }`;
    messageEl.textContent = message;
    
    // Insert message before form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageEl, form);
    
    // Scroll to message
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

/**
 * EmailJS Template Variables
 * 
 * Your EmailJS template should include these variables:
 * - {{firstName}} - First name from form
 * - {{lastName}} - Last name from form  
 * - {{email}} - Email address from form
 * - {{subject}} - Subject from form
 * - {{message}} - Message from form
 * 
 * Example template:
 * Subject: New contact from {{firstName}} {{lastName}}
 * 
 * Body:
 * Name: {{firstName}} {{lastName}}
 * Email: {{email}}
 * Subject: {{subject}}
 * 
 * Message:
 * {{message}}
 */ 