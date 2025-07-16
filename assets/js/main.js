
// ===================== Section Hero ===================
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

// =========================================================
// =================  Filter ===============================
const filter = document.querySelector('.content__filter');
const flterItems = document.querySelectorAll('.filter__item');
const openFilter = document.querySelector('.cars__header--filter');
const filterTitle = document.querySelector('.filter__title');

flterItems.forEach(el => {
  let open = el.children[0];
  if(open){
    open.addEventListener('click', (e) => {
      if(!e.target.classList.contains('filter__title')){
        el.classList.toggle('open');
      }
    }); 
  }
})

// =================== Мобильный фильтр =========================

if(filter){
  openFilter.addEventListener('click', (e) => {
    filter.classList.add('open');
    filterTitle.innerHTML = 'Close Filter';
    filterTitle.style.color = '#C49D74';
    
    filterTitle.addEventListener('click', () => {
      filter.classList.remove('open');
      filterTitle.innerHTML = 'Filters';
      filterTitle.style.color = 'inherit';
    })
  });
}
// ================= Renge slider ====================
let slideMin = document.getElementById('budget-min');
let slideMax = document.getElementById('budget-max');
let sliderTrack = document.querySelector('.slider-track');

const sliderMinValue = parseInt(slideMin.min); // 400
const sliderMaxValue = parseInt(slideMin.max); // 1500
let minGap = 100;

function sliderOne() {
  if (parseInt(slideMax.value) - parseInt(slideMin.value) <= minGap) {
    slideMin.value = parseInt(slideMax.value) - minGap;
  }
  fillColor();
  updateDisplay();
}

function sliderTwo() {
  if (parseInt(slideMax.value) - parseInt(slideMin.value) <= minGap) {
    slideMax.value = parseInt(slideMin.value) + minGap;
  }
  fillColor();
  updateDisplay();
}

function fillColor() {
  const percent1 = ((slideMin.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
  const percent2 = ((slideMax.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #C49D74 ${percent1}%, #C49D74 ${percent2}%, #dadae5 ${percent2}%)`;
}

function updateDisplay() {
  const displayElement = document.querySelector(".rangeValues");
  const val1 = parseInt(slideMin.value);
  const val2 = parseInt(slideMax.value);

  if (!displayElement) return;

  if (val2 < 1500) {
    displayElement.innerHTML = "£ " + val1 + " - £ " + val2;
  } else {
    displayElement.innerHTML = "£ " + val1 + " - £ " + val2 + "+";
  }
}

window.onload = function () {
  // начальная инициализация
  sliderOne();
  sliderTwo();

  // обработчики на ползунки
  slideMin.addEventListener('input', sliderOne);
  slideMax.addEventListener('input', sliderTwo);

  // кнопка сброса
  const clearBtn = document.querySelector('.filter__clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      slideMin.value = sliderMinValue;
      slideMax.value = sliderMaxValue;
      fillColor();
      updateDisplay();
    });
  }
};

// ============= Открытите марок машин ===============

const brends = document.querySelectorAll('.filter__item--brand');
brends.forEach(brend => {
  brend.children[0].children[0].addEventListener('change', function () {
    if (this.checked) {
      brend.classList.add('open');
      Array.from(brend.children).forEach(el =>{
        el.children[0].checked = true;
      })
    } else {
      brend.classList.remove('open');
      Array.from(brend.children).forEach(el =>{
        el.children[0].checked = false;
      })
    }
  });
});

// ================= Сортировка ==========================

function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("open");
}

function selectOption(value) {
  document.getElementById("selected").textContent = value;
  document.getElementById("dropdown").classList.remove("open");
}

// Закрытие при клике вне
document.addEventListener("click", function (e) {
  const select = document.querySelector(".custom-select");
  if (!select.contains(e.target)) {
    document.getElementById("dropdown").classList.remove("open");
  }
});





