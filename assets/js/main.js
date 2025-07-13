

// Очистка поля ввода
document.querySelectorAll(".clear-button")
.forEach(function (elem) {
  elem.onclick = function () {
    elem.previousElementSibling.value = "";
    elem.previousElementSibling.attributes.placeholder.value = "";
  };
});

// Выбор даты и времени
const formIcons = document.querySelectorAll('.date-icon');
formIcons.forEach(el => {
  el.addEventListener('click', (e) => {
    document.getElementById(el.dataset.select).click();
    console.dir(document.getElementById(el.dataset.select));
  })
});

// Кнопка мобильного меню

const headerMenu = document.querySelector('.header__menu')
const openMenu = document.querySelector('.btn-open');
const closeMenu = document.querySelector('.btn-close');
openMenu.addEventListener('click', (e) => {
  headerMenu.classList.add('open');
  closeMenu.style.display = 'block';
  e.target.style.display = 'none';
});
closeMenu.addEventListener('click', (e) => {
  headerMenu.classList.remove('open');
  openMenu.style.display = 'block';
  e.target.style.display = 'none';
});

