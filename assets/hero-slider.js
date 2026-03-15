document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-hero-slider]');

  sliders.forEach((slider) => {
    const track = slider.querySelector('[data-hero-track]');
    const slides = Array.from(slider.querySelectorAll('[data-hero-slide]'));
    const prevButton = slider.querySelector('[data-hero-prev]');
    const nextButton = slider.querySelector('[data-hero-next]');
    const dotsContainer = slider.querySelector('[data-hero-dots]');

    if (!track || slides.length <= 1) return;

    let currentIndex = 0;
    let autoplayInterval = null;

    const autoplayEnabled = slider.dataset.autoplay === 'true';
    const autoplaySpeed = Number(slider.dataset.speed || 5) * 1000;

    const goToSlide = (index) => {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      const dots = slider.querySelectorAll('.hero-slider__dot');
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === currentIndex);
      });
    };

    const goToNext = () => {
      const nextIndex = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;
      goToSlide(nextIndex);
    };

    const goToPrev = () => {
      const prevIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
      goToSlide(prevIndex);
    };

    const resetAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }

      if (autoplayEnabled) {
        autoplayInterval = setInterval(goToNext, autoplaySpeed);
      }
    };

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-slider__dot';
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoplay();
      });
      dotsContainer?.appendChild(dot);
    });

    prevButton?.addEventListener('click', () => {
      goToPrev();
      resetAutoplay();
    });

    nextButton?.addEventListener('click', () => {
      goToNext();
      resetAutoplay();
    });

    goToSlide(0);
    resetAutoplay();
  });
});