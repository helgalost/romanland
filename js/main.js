// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('.theme-toggle__icon');
  if (icon) {
    icon.textContent = theme === 'light' ? '☀' : '☾';
  }
}

// Mobile Menu
const mobileToggle = document.querySelector('.header__mobile-toggle');
const headerNav = document.querySelector('.header__nav');

if (mobileToggle && headerNav) {
  mobileToggle.addEventListener('click', () => {
    headerNav.classList.toggle('header__nav--active');
    mobileToggle.classList.toggle('header__mobile-toggle--active');
  });
}

// Add to Cart function
function addToCart(bookId) {
  const book = getBookById(bookId);
  if (!book) return;
  
  const cart = JSON.parse(localStorage.getItem('romanland_cart') || '[]');
  cart.push({
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image
  });
  localStorage.setItem('romanland_cart', JSON.stringify(cart));
  alert('Книга добавлена в корзину!');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// FAQ Accordion
document.querySelectorAll('.faq-item__question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    item.classList.toggle('faq-item--active');
  });
});
