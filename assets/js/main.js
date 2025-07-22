document.addEventListener('DOMContentLoaded', () => {
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

  if(filter){
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
        filterTitle.style.cursor = 'pointer';
        
        filterTitle.addEventListener('click', () => {
          filter.classList.remove('open');
          filterTitle.innerHTML = 'Filters';
          filterTitle.style.color = 'inherit';
          filterTitle.style.cursor = 'default';
        })
      });
    
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
    }
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
  }



  // ============= карточки ===============

  const carBoxes = document.querySelectorAll('.car-card__img');
  const infoBoxes = document.querySelectorAll('.car-card__info');
  if(carBoxes.length > 0) {
    carBoxes.forEach(el => {
      infoBoxes.forEach(box => {
        box.style.width = el.offsetWidth + 'px';
      })
    })
  }
  infoBoxes.forEach(el => {
    let infoBtnTop = el.querySelector('.open-info').offsetTop;
    let infoBtnBox = el.querySelector('.car-card__info--characteristic');
    if( window.innerWidth >= parseInt(394)){
      infoBtnBox.style.top = infoBtnTop + 38 + 'px';
    } else {
      infoBtnBox.style.top = 0;
      infoBtnBox.style.left = 12 + 'px';
      infoBtnBox.style.right = 'auto';
    }
    el.addEventListener('click', e => {
      if(e.target.classList.contains('open-info')){
        infoBtnBox.classList.toggle('open');
      }
    })
  })


  // ============ Rating ==============
  const labels = document.querySelectorAll('.label__header');

  if(labels.length > 0){
    initRaitings();
  }

  function initRaitings() {
      let ratingActive, ratingValue;
      for(let i = 0; i < labels.length; i++) {
        const rating = labels[i];
        initRaiting(rating)
      }
  }

  function initRaiting(rating){
    
    initRatingVars(rating);
    setRatingActiveWidth();
  }
  function initRatingVars(rating){
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.label__header--raiting');
    
  }
  function setRatingActiveWidth(index = ratingValue.dataset.rating) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = ratingActiveWidth / 2 + '%';
    ratingIndex = index;

  let charArray = ratingIndex.split('');
  let indexToReplace = charArray.indexOf('.');
  if (indexToReplace !== -1) {
    charArray.splice(indexToReplace, 1, ',');
  }
  let modifiedString = charArray.join('');
    ratingValue.innerHTML = modifiedString;
  }

  // ========= Accordeon ============

  const accordion = document.querySelectorAll('.accordion__item');
  if(accordion.length > 0){
    accordion.forEach(el => {
      el.addEventListener('click', (e) => {
        const self = e.currentTarget;
        const control = self.querySelector('.accordion__item--control');
        const content = self.querySelector('.accordion__item--content');
        const icon = self.querySelector('.accordion__item--icon');
        if(self.classList.contains('open')){
          self.classList.remove('open');
          control.setAttribute('aria-expanded', false);
          content.setAttribute('aria-hidden', true);
          icon.innerHTML = '+';
          return;
        }
        accordion.forEach(el => {
          el.classList.remove('open');
          el.querySelector('.accordion__item--icon').innerHTML = '+';
        });
        self.classList.toggle('open');
        icon.innerHTML = '-';
      });
    });
  }

  new AirDatepicker('#start-date', {
    locale: {
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yyyy',
      timeFormat: 'hh:ii aa',
      firstDay: 0
    },
    autoClose:true,
    dateFormat: 'E dd MMM',
    isMobile: true
  });
  new AirDatepicker('#start-time', {
    timepicker:true,
    onlyTimepicker: true,
    isMobile: true
  });
  new AirDatepicker('#end-date', {
    locale: {
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yyyy',
      timeFormat: 'hh:ii aa',
      firstDay: 0
    },
    autoClose:true,
    dateFormat: 'E dd MMM',
    isMobile: true
  });
  new AirDatepicker('#end-time', {
    timepicker:true,
    onlyTimepicker: true,
    isMobile: true
  });



  // ========= Слайдер в модальном окне =================
  const modal = document.querySelector('.car-modal');
  const openModal = document.querySelectorAll('.top-galery__item');
  const closeModal = modal.querySelector('.car-modal__close');
  function openSlider(modal) {
    modal.classList.remove('hidden');
    document.body.style.overflowY = 'hidden';
  }
  function closeSlider(modal) {
    modal.classList.add('hidden');
    document.body.style.overflowY = 'auto';
  }
  if(modal){
    openModal.forEach(el => {
      el.addEventListener('click', () => {
        openSlider(modal);
      });
    })
    closeModal.addEventListener('click', () => {
      closeSlider(modal);
    })
    modal.addEventListener('click', (e) => {
      if(e.target == modal){
        closeSlider(modal);
      }
    });
  }
});
// ===========================================


// ====== Выбор локации в верхней форме ==============
function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("open");
}

function selectOption(value) {
  document.getElementById("selected").textContent = value;
  document.getElementById("dropdown").classList.remove("open");
}

// Закрытие при клике вне
if(document.getElementById("dropdown")){
document.addEventListener("click", function (e) {
  const select = document.querySelector(".custom-select");
  if (!select.contains(e.target)) {
    document.getElementById("dropdown").classList.remove("open");
  }
});
}
// ==============================================


// =============  Like item в нижнем слайдере ============
const likeBtn = document.querySelectorAll('.area__slide--img span');
likeBtn.forEach(el => {
  el.addEventListener('click', e => {
    el.classList.toggle('check');
  })
})

const swiper1 = new Swiper('.area__slider', {
  // Optional parameters
  autoplay: {
    delay: 4000,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 12
    },
    440: {
      slidesPerView: 2,
      spaceBetween: 12
    },
    760: {
      slidesPerView: 3,
      spaceBetween: 24
    },
    930: {
      slidesPerView: 4,
      spaceBetween: 40
    },
    1120: {
      slidesPerView: 5,
      spaceBetween: 40
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: '.area-button-next',
    prevEl: '.area-button-prev',
  },
});

const swiperCarThumbs = new Swiper('.car-slider-thumbs', {
  slidesPerView: 6,
  spaceBetween: 12,
  breakpoints: {
    320: {
      slidesPerView: 4,
      spaceBetween: 4
    },
    440: {
      slidesPerView: 5,
      spaceBetween: 8
    },
    760: {
      slidesPerView: 6,
      spaceBetween: 12
    },
  },
});
const swiperCar = new Swiper('.car-slider', {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: '.car-modal-button-next',
    prevEl: '.car-modal-button-prev',
  },
  thumbs: {
    swiper: swiperCarThumbs,
  },

});


