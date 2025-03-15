// Mobile Menu Toggle
const menuButton = document.querySelector('.nav-button');
const navMobile = document.querySelector('.nav-mobile');
const menuOverlay = document.querySelector('.nav-overlay');

menuButton.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    menuOverlay.classList.toggle('active');
});

// Close mobile menu when clicking outside
menuOverlay.addEventListener('click', () => {
    navMobile.classList.remove('active');
    menuOverlay.classList.remove('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('active');
        menuOverlay.classList.remove('active');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header, .index-header');
    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});

// Smooth scroll for navigation links (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});