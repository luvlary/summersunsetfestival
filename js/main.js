// Countdown Timer
const countDownDate = new Date("June 6, 2026 15:00:00").getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Add labels for CSS
if (daysEl) daysEl.dataset.label = 'Dias';
if (hoursEl) hoursEl.dataset.label = 'Horas';
if (minutesEl) minutesEl.dataset.label = 'Minutos';
if (secondsEl) secondsEl.dataset.label = 'Segundos';


const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) {
        daysEl.innerHTML = days;
        hoursEl.innerHTML = hours;
        minutesEl.innerHTML = minutes;
        secondsEl.innerHTML = seconds;
    }

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "É O GRANDE DIA!";
    }
}, 1000);



// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navUl && navUl.classList.contains('active')) {
            navUl.classList.remove('active');
            if (menuToggle) { // Ensure menuToggle exists before accessing its classList
                menuToggle.classList.remove('active');
            }
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav ul li a');

const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.7 // Percentage of section that needs to be visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const correspondingLink = document.querySelector(`header nav ul li a[href="#${entry.target.id}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Hamburger menu
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) {
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        menuToggle.classList.toggle('active'); // Optional: to animate hamburger icon
    });
}


// All event-based logic here
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 3D Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-button');
        const prevButton = document.querySelector('.prev-button');
        const slideCount = slides.length;
        
        if (slideCount > 0) {
            const angle = 360 / slideCount;
            // A good radius so the slides don't overlap too much
            const radius = (slides[0].clientWidth / 2) / Math.tan(Math.PI / slideCount) + 30;
            let currentAngle = 0;

            slides.forEach((slide, i) => {
                const rotateY = i * angle;
                slide.style.transform = `rotateY(${rotateY}deg) translateZ(${radius}px)`;
            });

            const rotateCarousel = () => {
                track.style.transform = `rotateY(${currentAngle}deg)`;
            };

            nextButton.addEventListener('click', () => {
                currentAngle -= angle;
                rotateCarousel();
            });

            prevButton.addEventListener('click', () => {
                currentAngle += angle;
                rotateCarousel();
            });
            
            rotateCarousel(); // Initial position
        }
    }
});

// --- Confetti Effect ---
const invitationStack = document.querySelector('.invitation-stack');
const canvas = document.getElementById('confetti-canvas');

if (invitationStack && canvas) {
    const ctx = canvas.getContext('2d');
    let confetti = [];
    let animationFrameId;

    const resizeCanvas = () => {
        canvas.width = invitationStack.offsetWidth;
        canvas.height = invitationStack.offsetHeight;
    };

    const confettiColors = ['#FFA500', '#FFC0CB', '#FFD700', '#FFFFFF'];

    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 5 + 2;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 3 + 1;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.angle = Math.random() * Math.PI * 2;
            this.angularVelocity = Math.random() * 0.1 - 0.05;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.angularVelocity;
            if (this.y > canvas.height) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function createConfetti() {
        confetti = [];
        for (let i = 0; i < 100; i++) {
            confetti.push(new ConfettiParticle());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        animationFrameId = requestAnimationFrame(animateConfetti);
    }

    invitationStack.addEventListener('mouseenter', () => {
        resizeCanvas();
        createConfetti();
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animateConfetti();
    });

    invitationStack.addEventListener('mouseleave', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    window.addEventListener('resize', resizeCanvas);
}
