document.documentElement.classList.add('js');

console.log('Theme loaded successfully');

document.addEventListener('DOMContentLoaded', () => {
  const scrollTopButton = document.querySelector('[data-scroll-top]');

  if (!scrollTopButton) return;

  const toggleScrollTopButton = () => {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add('is-visible');
    } else {
      scrollTopButton.classList.remove('is-visible');
    }
  };

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', toggleScrollTopButton);
  toggleScrollTopButton();
});