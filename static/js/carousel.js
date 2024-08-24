document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const container = carousel.querySelector('.carousel-container');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;

    function showImage(index) {
        const images = container.querySelectorAll('img');
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        container.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }

    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    // Optional: Auto-play
    setInterval(() => showImage(currentIndex + 1), 5000);
});
