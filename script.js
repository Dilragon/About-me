const toggleBtn = document.getElementById('navbar-toggle');
const menu = document.getElementById('navbar-menu');
const iconSVG = toggleBtn.querySelector('.icon-svg');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check for saved dark mode preference or use system preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedDarkMode = localStorage.getItem('darkMode');
let isDarkMode = savedDarkMode !== null ? savedDarkMode === 'true' : prefersDarkMode;

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only apply if user hasn't set a preference
    if (localStorage.getItem('darkMode') === null) {
        isDarkMode = e.matches;
        applyDarkMode(isDarkMode);
    }
});

// SVG paths for icons - defined as constants for better performance
const ICONS = {
    burger: 'M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z',
    close: 'M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z',
    moon: 'M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z',
    sun: 'M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6z'
};

// Handle navbar toggle with a single event listener
toggleBtn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('show');
    
    // Update icon
    iconSVG.querySelector('path').setAttribute('d', isOpen ? ICONS.close : ICONS.burger);
    
    // Update ARIA state for accessibility
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    
    // Update background color and add active class for styling
    toggleBtn.style.backgroundColor = isOpen ? 'gray' : 'transparent';
    toggleBtn.classList.toggle('active-toggle', isOpen);
});

// Function to apply dark mode
function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('path').setAttribute('d', ICONS.sun);
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.querySelector('path').setAttribute('d', ICONS.moon);
    }
    localStorage.setItem('darkMode', isDark);
}

// Dark mode toggle event listener
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    applyDarkMode(isDarkMode);
    darkModeToggle.classList.add('active-toggle');
    setTimeout(() => {
        darkModeToggle.classList.remove('active-toggle');
    }, 300);
});

// Apply initial dark mode state
applyDarkMode(isDarkMode);

