// DOM Elements
const clockElement = document.getElementById('clock');
const themeToggle = document.getElementById('theme-toggle');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

// Update clock
function updateClock() {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[now.getDay()];
    clockElement.textContent = `${day} ${now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })} • Local Time`;
}

// Theme toggle with time-based auto detection
function detectAndSetTheme() {
    const now = new Date();
    const hour = now.getHours();
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    
    // Set theme based on time
    // Dark theme between 6 PM (18:00) and 6 AM (6:00)
    const isDarkHours = hour < 6 || hour >= 18;
    const newTheme = isDarkHours ? 'dark' : 'light';
    
    // Only update if theme needs to change
    if (currentTheme !== newTheme) {
        html.setAttribute('data-theme', newTheme);
    }
}

// Theme toggle
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
});

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetSection = item.getAttribute('data-section');
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetSection) {
                section.classList.add('active');
            }
        });
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        item.classList.add('active');
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    detectAndSetTheme(); // Initial theme detection
    setInterval(detectAndSetTheme, 3600000); // Check every hour
});

let lastScrollTop = 0;
const bottomNav = document.querySelector('.bottom-nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        bottomNav.classList.add('hidden');
    } else {
        // Scrolling up
        bottomNav.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});