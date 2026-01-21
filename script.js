/* ========================================================
   COMPREHENSIVE JAVASCRIPT
   ======================================================== */

// Global Variables
let currentSection = 'hero';
let challengeStarted = false;
let streakDay = 1;

// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const particlesContainer = document.getElementById('particles');
const reveals = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('[data-target]');
const streakCounter = document.getElementById('snapStreakCounter');

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initScrollReveal();
    initNavbarScroll();
    initNavLinks();
    initCounters();
    setTimeout(hideLoader, 3500);
    animateStreakCounter();
});

// Loading Screen
function hideLoader() {
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
}

// Floating Particles
function initParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        particlesContainer.appendChild(particle);
    }
}

// Scroll Reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger child reveals
                const childReveals = entry.target.querySelectorAll('.reveal-left, .reveal-right');
                childReveals.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
}

// Navbar Scroll Effects
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY; // Changed to scrollY
        navbar.classList.toggle('scrolled', scrolled > 100);

        // Parallax hero background
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Navigation Links
function initNavLinks() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            scrollToSection(section);
            updateActiveNav(link);
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function updateActiveNav(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Counter Animations
function initCounters() {
    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = +counter.innerText.replace(/,/g, ''); // Handle commas if any

            if (count < target) {
                counter.innerText = Math.floor(count + (target / 100)) + (target > 100 ? '' : '%');
                requestAnimationFrame(animateCounters);
            } else {
                counter.innerText = target + (target > 100 ? '' : '%');
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
}

// Streak Counter Animation
function animateStreakCounter() {
    if (!streakCounter) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = 157;
                const duration = 2500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentCount = Math.floor(progress * target);

                    streakCounter.textContent = currentCount;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(entry.target);
            }
        });
    });

    // Using parent for better visibility detection
    if (streakCounter.parentElement) observer.observe(streakCounter.parentElement);
}

// Challenge Functions
function startChallenge() {
    if (challengeStarted) return;

    challengeStarted = true;
    const btn = event.target || event.currentTarget; // Safer event target
    if (btn) {
        btn.innerHTML = '<i class="fas fa-fire"></i> Day 1 Started!';
        btn.style.background = 'linear-gradient(45deg, #43e97b, #38f9d7)';
    }

    // Streak celebration
    createFireworks();

    setTimeout(() => {
        if (btn) btn.innerHTML = `Day ${streakDay}: Keep Going! <i class="fas fa-rocket"></i>`;
    }, 2000);
}

function joinChallenge() {
    const btn = event.target || event.currentTarget;
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Joined! Welcome!';
        btn.disabled = true;
    }
    createConfetti();
}

function downloadTracker() {
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'coding-streak-tracker.xlsx';
    link.innerText = 'Download started!';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('📊 Streak Tracker Downloaded! Check your downloads folder.');
}

// Particle Effects
function createFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework-particle'; // Add class for styling reference if needed

            // Inline styles as requested
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'];
            const color = colors[Math.floor(Math.random() * 5)];

            firework.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: firework 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            `;
            document.body.appendChild(firework);

            setTimeout(() => firework.remove(), 1000);
        }, i * 50);
    }
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3', '#54a0ff'];
            const color = colors[Math.floor(Math.random() * 6)];

            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${color};
                left: ${Math.random() * 100}vw;
                top: -10px;
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall 3s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(102,126,234,0.4);
        z-index: 10001;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Force reflow
    notification.offsetHeight;

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Dynamic CSS for Fireworks and Confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes firework {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translate(\${Math.random() * 800 - 400}px, \${Math.random() * 800 - 400}px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        scrollToSection('challenge');
    }
});

// Performance Monitoring
let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    const now = performance.now();
    if (now - lastScrollTime > 16) {
        lastScrollTime = now;
    }
});

// Intersection Observer for Active Navigation
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            if (sectionId) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
                });
            }
        }
    });
}, { threshold: 0.3 });

// Observe all sections for active nav
document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

console.log('🚀 CodeStreak loaded successfully! All animations active.');
