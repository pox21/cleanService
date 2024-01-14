const infoBtns = document.querySelectorAll('.info-dot');
const infoHints = document.querySelectorAll('.info-hint');

// Клик по кнопкам с подсказками
for (let btn of infoBtns) {
	btn.addEventListener('click', function (e) {
		e.stopPropagation();

		// Hide all hint
		for (let hint of infoHints) {
			if (this.parentNode.querySelector('.info-hint') !== hint) {
				hint.classList.add('none');
			}
		}

		// Show current hint
		this.parentNode.querySelector('.info-hint').classList.toggle('none');
	});
}

// Закрываем подсказки при клике по всему документу
document.addEventListener('click', function () {
	for (let hint of infoHints) {
		hint.classList.add('none');
	}
});

// Запрещаем всплытие события клика при клике на подсказки
for (let hint of infoHints) {
	hint.addEventListener('click', (e) => e.stopPropagation());
}

// Swiper slider
if (document.querySelector('.swiper')) {
	const swiper = new Swiper(".swiper", {
    // loop: true,
    // freeMode: true,

    slidesPerView: 1,
    spaceBetween: 42,

    breakpoints: {
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      920: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1230: {
        slidesPerView: 4,
        spaceBetween: 42,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: "#sliderNext",
      prevEl: "#sliderPrev",
    },
  });
}


// Tabs
const tabsBtns = document.querySelectorAll('[data-tab]');
const tabsProducts = document.querySelectorAll('[data-tab-value]');

for (let btn of tabsBtns) {

	btn.addEventListener('click', function () {
		// Убираем активные классы у всех кнопок
		for (let btn of tabsBtns) {
			btn.classList.remove('tab-controls__btn--active');
		}

		// Добавляем активный класс к текущей кнопке
		this.classList.add('tab-controls__btn--active');

		// Отобразить нужные товары и скрыть не нужные
		for (let product of tabsProducts) {

			// Проверка на отображение всех слайдов
			if (this.dataset.tab === 'all') {
				product.classList.remove('none');
			} else {
				if (product.dataset.tabValue === this.dataset.tab) {
					product.classList.remove('none');
				} else {
					product.classList.add('none');
				}
			}
		}

		// Update Swiper
		swiper.update()

	})
}

// Mobile Nav
const mobileNavOpenBtn = document.querySelector('#open-mobile-nav-btn');
const mobileNavCloseBtn = document.querySelector('#close-mobile-nav-btn');
const mobileNav = document.querySelector('#mobile-nav');

mobileNavOpenBtn.onclick = function (){
	mobileNav.classList.add('mobile-nav-wrapper--open');
}

mobileNavCloseBtn.onclick = function () {
	mobileNav.classList.remove('mobile-nav-wrapper--open');
};

// const clientsSlider = new Swiper(".clients-slider", {
//   // loop: true,
//   // freeMode: true,

//   slidesPerView: 1,
//   spaceBetween: 42,

//   breakpoints: {
//     600: {
//       slidesPerView: 1,
//       spaceBetween: 20,
//     },
//     920: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     1024: {
//       slidesPerView: 3,
//       spaceBetween: 38,
//     },
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".clients-slider__btn--next",
//     prevEl: ".clients-slider__btn--prev",
//   },
// });

const scrolling = (upSelector = "") => {
  //     const upElem = document.querySelector(upSelector);

  //     window.addEventListener('scroll', () => {
  //         if (document.documentElement.scrollTop > 1200) {
  //             upElem.style.opacity = 1;
  //         } else {
  //             upElem.style.opacity = 0;
  //         }
  //     });

  let links = document.querySelectorAll('[href^="#"]');
  let speed = 0.4;

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      let witdhTop = document.documentElement.scrollTop;
      let hash = this.hash;
      let toBlock = document.querySelector(hash).getBoundingClientRect().top;
      let start = null;

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start;
        let r =
          toBlock < 0
            ? Math.max(witdhTop - progress / speed, witdhTop + toBlock)
            : Math.min(witdhTop + progress / speed, witdhTop + toBlock);

        document.documentElement.scrollTo(0, r);

        if (r != witdhTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });
};

scrolling();
