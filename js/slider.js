let currentSlide = 0;
let sliderInterval = null;

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const track = document.getElementById('sliderTrack');
    if (!track) return;

    const totalSlides = slides.length;

    window.updateSlider = function() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };

    window.moveSlide = function(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        window.updateSlider();
    };

    window.goToSlide = function(index) {
        currentSlide = index;
        window.updateSlider();
    };

    if (sliderInterval) clearInterval(sliderInterval);
    sliderInterval = setInterval(() => window.moveSlide(1), 4000);
}