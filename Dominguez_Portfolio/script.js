// ========================================
// EMAIL FORM HANDLING
// ========================================

/* Handle contact form submission and open email client */
function sendEmail(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;
    
    var mailtoLink = 'mailto:xandertech777@gmail.com?subject=Contact from ' + encodeURIComponent(name) + '&body=' + encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\n\nMessage:\n' + message);
    
    window.location.href = mailtoLink;
    document.getElementById('contactForm').reset();
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================

/* Apply blur effect to header when page is scrolled */
function handleHeaderOnScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ========================================
// ACTIVE NAVIGATION SCROLLSPY
// ========================================

/**
 * Update active nav link based on which section is currently in viewport
 * This creates a "scrollspy" effect where the nav link highlights
 * the section you're currently viewing
 */
function updateActiveNav() {
    /* Get all navigation links and sections */
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    
    /* Get window height to determine visibility threshold */
    const windowHeight = window.innerHeight;
    let current = '';
    
    /* Check each section to see if it's currently in viewport */
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        /* If section is in upper portion of viewport, mark it as current */
        /* Using threshold of 200px from top to catch section early */
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    /* Remove active class from all nav links */
    navLinks.forEach((link) => {
        link.classList.remove('active');
    });
    
    /* Add active class to the nav link corresponding to current section */
    if (current) {
        const activeLink = document.querySelector(`.navbar a[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

/* Update header blur and active nav on scroll */
window.addEventListener('scroll', () => {
    handleHeaderOnScroll();
    updateActiveNav();
});

/* Run both functions on page load */
handleHeaderOnScroll();
updateActiveNav();
