let helpIndex = 0;
let visibleCards = 3;

function initHelpCarousel() {
    const helpTrack = document.getElementById('helpTrack');
    if (!helpTrack) return;

    const helpCards = helpTrack.querySelectorAll('.help-card');
    const helpPrev = document.getElementById('helpPrev');
    const helpNext = document.getElementById('helpNext');

    function updateVisibleCards() {
        const width = window.innerWidth;
        if (width <= 600) visibleCards = 1;
        else if (width <= 900) visibleCards = 2;
        else visibleCards = 3;
    }

    function updateHelpCarousel() {
        updateVisibleCards();
        const maxIndex = Math.max(0, helpCards.length - visibleCards);
        if (helpIndex > maxIndex) helpIndex = maxIndex;
        if (helpIndex < 0) helpIndex = 0;

        const cardWidth = helpCards[0].offsetWidth + 25;
        helpTrack.style.transform = `translateX(-${helpIndex * cardWidth}px)`;

        helpPrev.disabled = helpIndex === 0;
        helpNext.disabled = helpIndex >= maxIndex;
    }

    window.moveHelpCarousel = function(direction) {
        helpIndex += direction;
        updateHelpCarousel();
    };

    window.addEventListener('resize', updateHelpCarousel);
    updateHelpCarousel();
}