//================== WebpCss===================
function testWebP(callback) {

   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }
});;

const swiperIntro = new Swiper('.intro-slider', {
   touchReleaseOnEdges: true,
   keyboard: {
      enabled: true,
      onlyInViewport: true,
   },
   pagination: {
      el: '.intro__pagination',
      clickable: true,
   },
});
const featureSlider = new Swiper('.slider-feature__body', {
   touchReleaseOnEdges: true,
   loop: true,
   keyboard: {
      enabled: true,
      onlyInViewport: true,
   },
   breakpoints: {
      320: {
         slidesPerView: 1
      },
      550: {
         slidesPerView: 2,
         spaceBetween: 0
      },
      850: {
         slidesPerView: 3,
      },
      1200: {
         slidesPerView: 4,
      },
      1500: {
         slidesPerView: 5,
         spaceBetween: 0
      },
      1800: {
         spaceBetween: 11,
         slidesPerView: 6,
      },
   },
   navigation: {
      nextEl: '.feature__arrows_next',
      prevEl: '.feature__arrows_prev',
   },
});
const stuffSlider = new Swiper('.slider-stuff__body', {
   touchReleaseOnEdges: true,
   slidesPerView: 3,
   loop: true,
   keyboard: {
      enabled: true,
      onlyInViewport: true,
   },
   navigation: {
      nextEl: '.slider-stuff__arrows_next',
      prevEl: '.slider-stuff__arrows_prev',
   },
   breakpoints: {
      320: {
         slidesPerView: 1,
         spaceBetween: 15,
      },
      550: {
         slidesPerView: 2,
         spaceBetween: 15,
      },
      850: {
         slidesPerView: 3,
         spaceBetween: 15,
      },
      1100: {
         spaceBetween: 30
      }
   },
})
const customerSlider = new Swiper('.slider-customer__container', {
   loop: true,
   slidesPerView: 1,
   autoHeight: true,
   keyboard: {
      enabled: true,
      onlyInViewport: true,
   },
   navigation: {
      nextEl: '.slider-customer__arrows_next',
      prevEl: '.slider-customer__arrows_prev',
   },
});
const blogSlider = new Swiper('.slider-blog__container', {
   loop: true,
   keyboard: {
      enabled: true,
      onlyInViewport: true,
   },
   navigation: {
      nextEl: '.slider-blog__arrows_next',
      prevEl: '.slider-blog__arrows_prev',
   },
   breakpoints: {
      320: {
         slidesPerView: 1.05,
         spaceBetween: 11,
      },
      400: {
         slidesPerView: 1.1,
         spaceBetween: 11,
      },
      550: {
         slidesPerView: 1,
         spaceBetween: 30,
      },
      800: {
         slidesPerView: 2,
         spaceBetween: 30,
      },
      1250: {
         slidesPerView: 3,
         spaceBetween: 30
      }
   },
});

//=================== Nav active scroll ====================

const body = document.querySelector('body');

const sections = document.querySelectorAll('.section');
const menuLinks = document.querySelectorAll('.menu__link');

const resizeValue = body.clientWidth;

if (resizeValue > 767.98) {

   const sectionScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            menuLinks.forEach(link => {
               const linkHref = link.getAttribute('href').replace('#', '');
               link.classList.toggle('active', linkHref === entry.target.id);
            });
         }
      });
   }, {
      threshold: 0.3
   });

   sections.forEach(section => {
      sectionScroll.observe(section);
   });
}


menuLinks.forEach(link => {
   link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').replace('#', '');
      window.scrollTo({
         top: document.getElementById(targetId).offsetTop,
         behavior: 'smooth'
      });
   });
});

//==================== Accordion ===========================

const accTitles = document.querySelectorAll('.accordion-about__title');
const accContent = document.querySelectorAll('.accordion-about__content');

accTitles.forEach((item) => {

   if (item.classList.contains('active')) {
      item.nextElementSibling.style.height = item.nextElementSibling.scrollHeight + "px";
      item.nextElementSibling.style.opacity = 1;
   }
   item.addEventListener('click', () => {
      const content = item.nextElementSibling;
      if (!item.classList.contains('active')) {
         accTitles.forEach(item => {
            item.classList.remove('active');
            item.nextElementSibling.style.height = 0;
            item.nextElementSibling.style.opacity = 0;
         });
      }
      if (!item.classList.contains('active')) {
         item.classList.add('active');
         content.style.opacity = 1;
         content.style.height = content.scrollHeight + "px";
      } else {
         item.classList.remove('active');
         content.style.height = 0;
         content.style.opacity = 0;
      }
   });
});

//=================== Filter category =======================

const buttonsFilter = document.querySelectorAll('.dish__button');
const filterItems = document.querySelectorAll('.item-menu-dish');

buttonsFilter.forEach(button => {
   const buttonAttr = button.getAttribute('data-filter');
   if (buttonAttr == 'all') {
      filterItems.forEach(filterAddShow => {
         filterAddShow.classList.add('show');
      })
   }
   button.addEventListener('click', () => {
      buttonsFilter.forEach(buttonRemoveClass => {
         buttonRemoveClass.classList.remove('active');
         buttonRemoveClass.blur();
      })
      button.classList.add('active');
      filterItems.forEach(filter => {
         if (!filter.classList.contains(buttonAttr) && buttonAttr !== 'all') {
            filter.classList.add('hide');
            filter.classList.remove('show');
            setTimeout(() => {
               filter.style.display = 'none';
            }, 200);
         }
         else {
            filter.classList.remove('hide');
            filter.classList.add('show');
            if (buttonAttr == 'all') {
               filter.style.display = 'block';
            } else {
               setTimeout(() => {
                  filter.style.display = 'block';
               }, 200)
            }
         }
      });
   });
});

//====================== Textarea ======================

const textarea = document.querySelector('textarea');

textarea.addEventListener('keyup', function () {
   if (this.scrollTop > 0) {
      this.style.height = this.scrollHeight + 3 + "px";
   }
});

//==================== Scroll =========================



const header = document.querySelector('.header');
const topHeader = document.querySelector('.top-header');
const topHeaderBody = document.querySelector('.top-header__body');
const bottomHeader = document.querySelector('.bottom-header__body');
const arrowHeader = document.querySelector('.arrow-header');
const arrowHeaderLink = document.querySelector('.arrow-header-link');

const topHeaderContact = document.querySelector('.top-header__contact');

const burger = document.querySelector('.burger');
const burgerBody = document.querySelector('.burger-nav');
const menu = document.querySelector('.menu');
const menuBody = document.querySelector('.menu__body');

const headerLogo = document.querySelector('.bottom-header__logo');

const searchHeader = document.querySelector('.search-header');
const serachHeaderBtn = document.querySelector('.search-header__btn');
const basket = document.querySelector('.bottom-header__basket');
const login = document.querySelector('.top-header__login');
const phone = document.querySelector('.top-header__phone');
const headerReserve = document.querySelector('.bottom-header__reserv');

const navList = document.querySelectorAll('.menu__list');

function removeShowActive() {
   burger.classList.remove('active');
   burger.classList.add('not-active');
   menuBody.classList.remove('show');
   body.classList.remove('lock');
}
function addShowActive() {
   burger.classList.add('active');
   burger.classList.remove('not-active');
   menuBody.classList.add('show');
   body.classList.add('lock');
}

//================== Show Hide top header ======================

window.addEventListener('scroll', () => {
   const resizeValue = body.clientWidth;
   const scrollValue = window.pageYOffset;

   if (resizeValue > 767.98) {
      if (scrollValue > 20) {
         header.classList.add('scroll');
         arrowHeader.classList.add('show');
         burgerBody.appendChild(login);
         burgerBody.appendChild(phone);
         burgerBody.appendChild(headerReserve);
         burgerBody.appendChild(searchHeader);

      } else {
         header.classList.remove('scroll');
         arrowHeader.classList.remove('show');
         arrowHeader.classList.remove('active');
         burgerBody.classList.remove('show');

         topHeaderBody.appendChild(searchHeader);
         topHeaderBody.appendChild(login);
         topHeaderBody.appendChild(phone);
         bottomHeader.appendChild(headerReserve);
      }
   }
});

window.addEventListener('resize', () => {
   const bodyWidth = body.clientWidth;
   if (bodyWidth < 767.98) {
      arrowHeader.classList.remove('show');
      header.classList.remove('scroll');
   } else if (window.pageYOffset == 0) {
      header.classList.remove('scroll');
      arrowHeader.classList.remove('show');
      arrowHeader.classList.remove('active');
      burgerBody.classList.remove('show');

      topHeaderBody.appendChild(searchHeader);
      topHeaderBody.appendChild(login);
      topHeaderBody.appendChild(phone);
      bottomHeader.appendChild(headerReserve);
   } else {
      header.classList.add('scroll');
      arrowHeader.classList.add('show');
      burgerBody.appendChild(login);
      burgerBody.appendChild(phone);
      burgerBody.appendChild(headerReserve);
      burgerBody.appendChild(searchHeader);
   }
});

//=================== Remove show on click outside block ========================

document.addEventListener('click', (event) => {
   const evTarget = event.target;
   const arrowTargget = evTarget == arrowHeader || arrowHeader.contains(evTarget);
   const bodyMenuTarget = evTarget == burgerBody || burgerBody.contains(evTarget);
   if (!arrowTargget && !bodyMenuTarget) {
      arrowHeader.classList.remove('active');
      burgerBody.classList.remove('show');
   }
});

arrowHeader.addEventListener('click', () => {
   if (!arrowHeader.classList.contains('active')) {
      arrowHeader.classList.add('active');
      burgerBody.classList.add('show');
   } else {
      arrowHeader.classList.remove('active');
      burgerBody.classList.remove('show');
   }
});

//=================== Burger ===================

burger.addEventListener('click', () => {
   if (!burger.classList.contains('active')) {
      addShowActive();
   } else {
      removeShowActive();
   }
})

navList.forEach(item => {
   item.addEventListener('click', () => {
      removeShowActive();
   });
});
phone.addEventListener('click', () => {
   removeShowActive();
});
headerReserve.addEventListener('click', () => {
   removeShowActive();
});
serachHeaderBtn.addEventListener('click', () => {
   removeShowActive();
});
login.addEventListener('click', () => {
   removeShowActive();
});
headerLogo.addEventListener('click', () => {
   removeShowActive();
});
basket.addEventListener('click', () => {
   removeShowActive();
});

