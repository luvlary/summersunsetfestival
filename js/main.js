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

// Sample guest list (add more names here)
const guestList = [
    "Larissa Silva",
    "Alexandre Costa",
    "Maria Oliveira",
    "João Santos",
    "Ana Pereira",
    "Carlos Souza",
    "Fernanda Lima",
    "Ricardo Almeida"
];

// RSVP form submission
const rsvpForm = document.getElementById('rsvp-form');
const rsvpResult = document.getElementById('rsvp-result');
const guestNameInput = document.getElementById('guest-name');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const guestName = guestNameInput.value.trim(); // Trim whitespace
        if (!guestName) {
            rsvpResult.innerHTML = `<p class="error-message">Por favor, digite seu nome completo.</p>`;
            return;
        }

        // Make comparison case-insensitive
        const foundGuest = guestList.find(name => name.toLowerCase() === guestName.toLowerCase());

        if (foundGuest) {
            rsvpResult.innerHTML = `<p class="success-message">Olá ${foundGuest}, sua presença está confirmada! Mal podemos esperar para celebrar com você!</p>`;
            rsvpResult.style.color = 'green'; // Example styling
        } else {
            rsvpResult.innerHTML = `<p class="error-message">Desculpe, o nome "${guestName}" não foi encontrado na lista. Por favor, verifique a grafia ou entre em contato com os noivos.</p>`;
            rsvpResult.style.color = 'red'; // Example styling
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navUl.classList.contains('active')) {
            navUl.classList.remove('active');
            menuToggle.classList.remove('active');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
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
