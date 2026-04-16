// Romanland - Основной JavaScript файл

document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const headerNav = document.querySelector('.header__nav');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      headerNav.classList.toggle('active');
      this.setAttribute('aria-expanded', headerNav.classList.contains('active'));
    });
  }
  
  // Плавная прокрутка к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Обработка форм (базовая валидация)
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          
          // Показать сообщение об ошибке
          let errorMsg = input.parentElement.querySelector('.form-error');
          if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'form-error';
            errorMsg.textContent = 'Это поле обязательно для заполнения';
            input.parentElement.appendChild(errorMsg);
          }
        } else {
          input.classList.remove('error');
          const errorMsg = input.parentElement.querySelector('.form-error');
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      });
      
      if (isValid) {
        // Здесь будет логика отправки формы
        console.log('Форма отправлена');
        // form.submit(); // Для реальной отправки
      }
    });
  });
  
  // Уведомления (автозакрытие)
  const alerts = document.querySelectorAll('.alert[data-auto-close]');
  alerts.forEach(alert => {
    const timeout = parseInt(alert.getAttribute('data-auto-close')) || 5000;
    setTimeout(() => {
      alert.style.opacity = '0';
      alert.style.transition = 'opacity 0.3s ease';
      setTimeout(() => alert.remove(), 300);
    }, timeout);
  });
  
  // Кнопки с состоянием загрузки
  const loadingButtons = document.querySelectorAll('.btn[data-loading]');
  loadingButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.add('btn-loading');
      this.disabled = true;
      
      // Симуляция загрузки (для демонстрации)
      setTimeout(() => {
        this.classList.remove('btn-loading');
        this.disabled = false;
      }, 2000);
    });
  });
  
  // Отслеживание видимости элементов (для анимаций при скролле)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Наблюдаем за элементами с классом animate-on-scroll
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});

// Вспомогательные функции

/**
 * Показывает уведомление
 * @param {string} message - Текст уведомления
 * @param {string} type - Тип: success, error, warning
 */
function showAlert(message, type = 'success') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  alert.setAttribute('data-auto-close', '5000');
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alert, container.firstChild);
  
  // Автозакрытие
  setTimeout(() => {
    alert.style.opacity = '0';
    alert.style.transition = 'opacity 0.3s ease';
    setTimeout(() => alert.remove(), 300);
  }, 5000);
}

/**
 * Форматирует цену
 * @param {number} price - Цена
 * @returns {string} - Отформатированная цена
 */
function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

/**
 * Добавляет товар в корзину (заглушка)
 * @param {number} bookId - ID книги
 */
function addToCart(bookId) {
  console.log('Добавлено в корзину:', bookId);
  showAlert('Книга добавлена в корзину', 'success');
}

/**
 * Предзаказ книги (заглушка)
 * @param {number} bookId - ID книги
 */
function preOrder(bookId) {
  console.log('Предзаказ:', bookId);
  showAlert('Вы оформили предзаказ. Мы уведомим вас о выходе книги.', 'success');
}

// Переключатель темы
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
  const icon = document.querySelector('.theme-toggle__icon');
  if (icon) {
    icon.textContent = theme === 'light' ? '☀' : '☾';
  }
}
