// Function to display custom alert message instead of browser alert
function showCustomAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('customAlertModal').style.display = 'flex'; // Use flex for centering
}

// Function to close custom alert modal
function closeCustomAlert() {
    document.getElementById('customAlertModal').style.display = 'none';
}

// Navigation functionality: Shows the selected section and hides others
function showSection(sectionId) {
    // Hide all sections and the hero (home) section
    const sections = document.querySelectorAll('.section, .hero');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none'; // Ensure they are truly hidden
    });

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        // The hero section uses flex for centering its content, others are block
        if (sectionId === 'hero') {
            targetSection.style.display = 'flex';
            // Trigger hero animations when hero section is shown
            animateHeroSection();
        } else {
            targetSection.style.display = 'block';
            targetSection.classList.add('active'); // Add active class for animations
        }
    }

    // Update active state in navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active')); // Remove active from all
    
    // Add active class to the clicked link
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close mobile menu if open after clicking a link
    const navLinksContainer = document.querySelector('.nav-links');
    navLinksContainer.classList.remove('active');
}

// Toggles the mobile navigation menu visibility
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Handles form submission, simulates sending message and shows a custom alert
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Display a custom alert instead of the browser's alert
    showCustomAlert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
    
    // Reset the form fields after submission
    event.target.reset();
}

// Function to animate hero section elements
function animateHeroSection() {
    const heroElements = document.querySelectorAll('.hero-animatable');
    
    // Reset animations first in case it's not the first load
    heroElements.forEach(el => {
        el.classList.remove('fade-in-up-active');
        // Force reflow to reset animation
        void el.offsetWidth; 
    });

    // Apply animations with staggered delays
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in-up-active');
        }, 500 + (index * 300)); // Stagger by 300ms
    });
}

// DOMContentLoaded ensures the script runs after the entire HTML is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the hero section as active when the page loads
    showSection('hero'); // This will also call animateHeroSection()

    // Add scroll effect to the navbar: changes background and shadow on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) { // When scrolled down more than 50px
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else { // When at the top of the page
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add hover effects to project cards for visual feedback
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)'; // Lift and slightly scale up
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)'; // More prominent shadow
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)'; // Return to original position
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'; // Original shadow
        });
    });

    // Intersection Observer for animating elements as they come into view
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust the viewport margin
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When element enters viewport, apply its animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe elements for animation: project cards, about content, contact content
    document.addEventListener('DOMContentLoaded', function() {
        const animateElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
        animateElements.forEach(el => {
            el.style.opacity = '0'; // Initially hidden
            el.style.transform = 'translateY(30px)'; // Start from slightly below
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Smooth transition
            observer.observe(el); // Start observing
        });
    });
});
