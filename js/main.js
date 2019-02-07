$('.header-menu__button').on('click', () => {
  $('.header-menu__button').toggleClass('cross');
  $('.header-menu__nav').toggleClass('header-menu__nav_active');
});
$('.works-slider').slick({
  mobileFirst: true,
  slidesToShow: 1,
  nextArrow: '<button type="button" class="works-next"></button>',
  prevArrow: '<button type="button" class="works-prev"></button>',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      }
    }
  ]
});