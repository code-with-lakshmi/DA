// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
});

// Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinksItems = document.querySelectorAll('.nav-link');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksItems.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Skill Progress Bar Animation on Scroll
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-bar');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.setProperty('--progress-width', width + '%');
        bar.classList.add('animated');
    });
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Intersection Observer for scroll animations (Experience, Leadership, Achievements)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe experience cards
document.querySelectorAll('.experience-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    scrollObserver.observe(card);
});

// Observe leadership card
document.querySelectorAll('.leadership-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    scrollObserver.observe(card);
});

// Observe achievement cards
document.querySelectorAll('.achievement-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    scrollObserver.observe(card);
});

// Add animation class to elements
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

// Add click event to all image wrappers
document.querySelectorAll('.certificate-image-wrapper, .leadership-image-wrapper, .achievement-image-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img && img.src) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close lightbox
lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});
