// This script implements an Infinite Scroll-Snapping Horizontal Gallery for mobile.
document.addEventListener('DOMContentLoaded', () => {
    console.log('mobile-infinite-gallery.js: DOMContentLoaded fired.');
    const scrollContainer = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);

    if (!scrollContainer || !track || slides.length === 0) {
        console.log('Mobile Infinite Gallery: Required elements not found. scrollContainer:', scrollContainer, 'track:', track, 'slides.length:', slides.length);
        return;
    }
    console.log('Mobile Infinite Gallery: Elements found. Slides:', slides.length);

    const slideWidth = slides[0].offsetWidth + (parseFloat(getComputedStyle(slides[0]).marginRight) || 0) + (parseFloat(getComputedStyle(slides[0]).marginLeft) || 0);
    console.log('Mobile Infinite Gallery: slideWidth:', slideWidth);
    const numVisibleSlides = 1; // Assuming one slide is fully visible at a time

    // Duplicate slides for infinite effect
    const numClones = Math.ceil(scrollContainer.clientWidth / slideWidth) + 1; // Number of slides to clone
    console.log('Mobile Infinite Gallery: numClones:', numClones);
    
    // Clone first few slides and append them to the end
    for (let i = 0; i < numClones; i++) {
        track.appendChild(slides[i].cloneNode(true));
        console.log('Mobile Infinite Gallery: Cloned slide appended.');
    }
    // Clone last few slides and prepend them to the beginning
    for (let i = 0; i < numClones; i++) {
        track.prepend(slides[slides.length - 1 - i].cloneNode(true));
        console.log('Mobile Infinite Gallery: Cloned slide prepended.');
    }

    const allSlides = Array.from(track.children);
    console.log('Mobile Infinite Gallery: Total slides (including clones):', allSlides.length);
    let isCloning = false;

    // Initial positioning to hide prepended clones
    scrollContainer.scrollLeft = numClones * slideWidth;
    console.log('Mobile Infinite Gallery: Initial scrollLeft:', scrollContainer.scrollLeft);

    scrollContainer.addEventListener('scroll', () => {
        if (isCloning) return;

        const scrollLeft = scrollContainer.scrollLeft;
        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.clientWidth;
        console.log('Mobile Infinite Gallery: Scroll event - scrollLeft:', scrollLeft, 'scrollWidth:', scrollWidth, 'clientWidth:', clientWidth);

        // If scrolled to the end (original slides + clones of first)
        if (scrollLeft >= (scrollWidth - clientWidth - slideWidth / 2)) {
            isCloning = true;
            scrollContainer.scrollLeft = numClones * slideWidth; // Jump to corresponding original position
            console.log('Mobile Infinite Gallery: Jumped to start (end scroll). New scrollLeft:', scrollContainer.scrollLeft);
        }
        // If scrolled to the beginning (clones of last)
        else if (scrollLeft <= slideWidth / 2) {
            isCloning = true;
            scrollContainer.scrollLeft = scrollWidth - (numClones * slideWidth) - clientWidth;
            console.log('Mobile Infinite Gallery: Jumped to end (start scroll). New scrollLeft:', scrollContainer.scrollLeft);
        }

        // Reset isCloning after a short delay to allow scroll to settle
        clearTimeout(scrollContainer.resetTimer);
        scrollContainer.resetTimer = setTimeout(() => {
            isCloning = false;
        }, 100);
    }, { passive: true }); // Use passive listener for better scroll performance
});