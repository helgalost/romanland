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

function getCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem('romanland_cart') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('romanland_cart', JSON.stringify(cart));
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'ui-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('ui-toast--show'));
  setTimeout(() => {
    toast.classList.remove('ui-toast--show');
    setTimeout(() => toast.remove(), 250);
  }, 1800);
}

// Add to Cart function
function addToCart(bookId) {
  const book = getBookById(bookId);
  if (!book) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === book.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1
    });
  }
  saveCart(cart);
  showToast(`«${book.title}» добавлена в корзину`);
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

// Subtle reveal animation
const revealElements = document.querySelectorAll('.section, .book-card, .feature-card, .news-card');
if ('IntersectionObserver' in window && revealElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
