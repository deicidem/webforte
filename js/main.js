$('document').ready(() => {
  $('.header-menu__button').on('click', () => {
    $('.header-menu__button').toggleClass('cross');
    $('.header-menu__nav').toggleClass('header-menu__nav_active');
    if (document.body.style.overflow == "hidden") {
      $("html,body").css("overflow","auto");
      
      $("body").removeClass("fixed");
    } else {
      setTimeout(() => {
        $("body").addClass("fixed");
        $("html,body").css("overflow","hidden");
      }, 500);
    }
  });
  $('.header-menu__nav a').on('click', () => {
    $("body").removeClass("fixed");
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
  var lastScrollTop = 0;
  $(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      $(".header-menu").slideUp();
    } else {
      $(".header-menu").slideDown();

    }
    lastScrollTop = st;
  });
  let index = 0,
    isClicked = false;
  $('.stages-block').on('click', function () {
    $('.stages-block').removeClass('stages-block_active');
    $(this).addClass('stages-block_active');
    for (let i = 0; i < $('.stages-block').length; i++) {
      if ($('.stages-block').eq(i).attr('isClicked') == '1') {
        $(this).find('img').attr('src', `img/stages/img-${i+1}-active.png`);
      } else {
        $('.stages-block').eq(i).find('img').attr('src', `img/stages/img-${i+1}.png`);
      }
    }
  });

});