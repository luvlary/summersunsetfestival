// This script contains the 3D Carousel Logic specifically for mobile devices.
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-button');
        const prevButton = document.querySelector('.prev-button');
        const slideCount = slides.length;
        
        if (slideCount > 0) {
            const angle = 360 / slideCount;
            let radius;

            // Use the mobile-specific radius calculation
            // Based on track width for stability and without the desktop offset
            const carouselTrackWidth = track.clientWidth; 
            radius = (carouselTrackWidth / 2) / Math.tan(Math.PI / slideCount);
            
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