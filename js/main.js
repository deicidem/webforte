$('document').ready(() => {
  let menuActive = false;
  $('.header-menu__button').on('click', () => {
    $('.header-menu__button').toggleClass('cross');
    $('.header-menu__nav').toggleClass('header-menu__nav_active');
    if (document.body.style.overflow == "hidden") {
      menuActive = false;
      $("html,body").css("overflow","auto");
      $(document).bind('touchmove', true);
    } else {
      setTimeout(() => {
        menuActive = true;
        $(document).bind('touchmove', false);
        $("html,body").css("overflow","hidden");
      }, 500);
    }
  });
  $('.header-menu__nav a').on('click', () => {
    menuActive = false;
    $('.header-menu__button').removeClass('cross');
    $('.header-menu__nav').removeClass('header-menu__nav_active');
    $("html,body").css("overflow","auto");
  });
  $('.works-slider').slick({
    mobileFirst: true,
    slidesToShow: 1,
    nextArrow: '<button type="button" class="works-next"></button>',
    prevArrow: '<button type="button" class="works-prev"></button>',
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      }
    }]
  });
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });

  $(function () {

    $(window).scroll(function () {

      if ($(this).scrollTop() != 0) {

        $('.to-top').fadeIn();
      } else {

        $('.to-top').fadeOut();

      }

    });

    $('.to-top').click(function () {

      $('body,html').animate({
        scrollTop: 0
      }, 10);

    });

  });
  var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header-menu').outerHeight();

$(window).scroll(function(){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    if(menuActive) return;
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.header-menu').addClass('header-menu_hidden');
        $('.header-menu__button').addClass('header-menu__button_hidden');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.header-menu').removeClass('header-menu_hidden');
            $('.header-menu__button').removeClass('header-menu__button_hidden');
        }
    }

    lastScrollTop = st;
}

  $('.stages-block').on('click', function () {
    $('.stages-block').removeClass('stages-block_active');
    $(this).addClass('stages-block_active');
    for (let i = 0; i < $('.stages-block').length; i++) {
      if ($('.stages-block').eq(i).hasClass('stages-block_active')) {
        $(this).find('img').attr('src', `img/stages/img-${i+1}-active.png`);
      } else {
        $('.stages-block').eq(i).find('img').attr('src', `img/stages/img-${i+1}.png`);
      }
    }
  });

});