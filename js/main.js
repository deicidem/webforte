$('document').ready(() => {
  var elements = $('.stages-popup__links');
  Stickyfill.add(elements);
  $('.brief, .bonuses, .articles, .contacts').css('display', 'flex').hide();
  let footer = $('.footer').clone();
  $(footer).removeAttr('id');
  let menuActive = false;
  $(footer).appendTo('.articles, .bonuses, .brief, .contacts');
  let margin = $('.header-menu').outerHeight() + $(window).width() / 100 * 1.4 - ($('.header-title_left').offset().top - $('.header-title').offset().top);
  if ($(window).width() >= 1024) {
    $('.header-main').css('margin-top', margin);
  }
  // Меню
  $('.header-menu__button').on('click', () => {
    $('.header-menu__button').toggleClass('cross');
    $('.header-menu__nav').toggleClass('header-menu__nav_active');
    setFixed();
  });

  $('.header-menu__nav a').on('click', () => {
    menuActive = false;
    $('.header-menu__button').removeClass('cross');
    $('.header-menu__nav').removeClass('header-menu__nav_active');
    $("html,body").css("overflow", "auto");
  });
  $('.subscribe').css('bottom', $('.cookie').outerHeight());

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

  $(window).scroll(function () {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    if (menuActive) return;
    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('.header-menu').addClass('header-menu_hidden');
      $('.stages-popup__links').css('top', 40);

      $('.header-menu__button').addClass('header-menu__button_hidden');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('.stages-popup__links').css('top', $('.header-menu').height() + 30);
        $('.header-menu').removeClass('header-menu_hidden');
        $('.header-menu__button').removeClass('header-menu__button_hidden');
        
      }
    }

    lastScrollTop = st;
  }
  // Функция открытия окна
  function open(name) {
    let isActive = false;
    $('.popup').each(function () {
      if ($(this).css('display') != 'none') {
        isActive = true;
        return isActive;
      }
    });
    if (isActive) {
      $('.cookie').addClass('cookie-popup');
      $('.popup').hide();
      $(`.${name}`).css('display', 'flex').hide().show();
    } else {
      $('.cookie').addClass('cookie-popup');
      $('.to-top').css('z-index', 0);
      setFixed();
      $(`.${name}`).css('display', 'flex').hide().fadeIn();
    }
  }
  // Функция для фиксирования body
  function setFixed() {
    if (document.body.style.overflow == "hidden") {
      menuActive = false;
      $("html,body").css("overflow", "auto");
    } else {
      setTimeout(() => {
        menuActive = true;
        $("html,body").css("overflow", "hidden");
      }, 500);
    }
  }
  // Слайдер
  $('.works-slider').slick({
    mobileFirst: true,
    slidesToShow: 1,
    nextArrow: '<button type="button" class="works-next"></button>',
    prevArrow: '<button type="button" class="works-prev"></button>',
    responsive: [{
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
      }
    }]
  });
  // Svg
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


  // Этапы работ
  // Открытие
  $('.stages-block_active').on('click', function () {
    $('.stages-popups').hide();
    $('.stages-block').each(function () {
      $(this).find('img').attr('src', `img/stages/img-${i+1}.png`);
    });
    $('.stages-popup').each(function () {
      $(this).hide();
    });
  });
  $('.stages-block').on('click', function () {

    if ($(this).hasClass('stages-block_active')) {

      $('.stages-block').removeClass('stages-block_active');
      $('.stages-popups').fadeOut();
      $('.stages-block').each(function (i) {
        $(this).find('img').attr('src', `img/stages/img-${i + 1}.png`);
      });
      $('.stages-popup').each(function () {
        $(this).fadeOut();
      });

    } else {

      $('.stages-block').removeClass('stages-block_active');
      $('.stages-popups').fadeIn();
      $(this).addClass('stages-block_active');

      for (let i = 0; i < $('.stages-block').length; i++) {

        if ($('.stages-block').eq(i).hasClass('stages-block_active')) {

          $(this).find('img').attr('src', `img/stages/img-${i+1}-active.png`);
          $('.stages-popup').each(function () {

            $(this).hide();
            if ($(this).find('.stages-popup__number').html() == i + 1) {
              $(this).fadeIn();
            }

          });

        } else {

          $('.stages-block').eq(i).find('img').attr('src', `img/stages/img-${i+1}.png`);

        }

      }

    }

  });
  // Прокрутка
  {
    let pos;
    $('.stages-popup__top').on('click', () => {

      if ($('.stages-popup__top').hasClass('stages-popup__top_active')) {
        pos = $(window).scrollTop();
        $(window).scrollTop($('#stages-popups').offset().top - 100);
      } else {
        $(window).scrollTop(pos);
        $('.stages-popup__top').toggleClass('stages-popup__top_active');
      }
    });
    $(window).scroll(function () {


      if (0 != $('#stages-popups').offset().top) {
        if ($(window).scrollTop() > $('#stages-popups').offset().top) {
          $('.stages-popup__top').addClass('stages-popup__top_active');
        } else {
          $('.stages-popup__top').removeClass('stages-popup__top_active');
        }
      }
    });
  }
  // Закрытие
  $('.stages-popup__close').on('click', () => {

    $('.stages-block').removeClass('stages-block_active');
    $('.stages-popup, .stages-popups').fadeOut();
    $('.stages-block').each(function (a) {
      $(this).find('img').attr('src', `img/stages/img-${a+1}.png`);
    });
  });
  // Next / Prev
  $('.stages-popup__link_next').on('click', () => {

    let i = +$('.stages-block_active .stages-block__number').html();
    $('.stages-block').each(function (a) {
      $(this).find('img').attr('src', `img/stages/img-${a+1}.png`);
    });
    $('.stages-block').removeClass('stages-block_active');
    $('.stages-popup').hide();
    $('.stages-popup').eq(i).fadeIn();
    $('.stages-block').eq(i).addClass('stages-block_active');
    $('.stages-block').eq(i).find('img').attr('src', `img/stages/img-${i+1}-active.png`);
  });
  $('.stages-popup__link_prev').on('click', () => {

    let i = +$('.stages-block_active .stages-block__number').html() - 2;
    $('.stages-block').each(function (a) {
      $(this).find('img').attr('src', `img/stages/img-${a+1}.png`);
    });
    $('.stages-block').removeClass('stages-block_active');
    $('.stages-popup').hide();
    $('.stages-popup').eq(i).fadeIn();
    $('.stages-block').eq(i).addClass('stages-block_active');
    $('.stages-block').eq(i).find('img').attr('src', `img/stages/img-${i+1}-active.png`);
  });

  // Select
  {
    let up = $('.stages-popup__select_nav_up');
    let down = $('.stages-popup__select_nav_down');
    let options = $('.stages-popup__select option');
    let optionIndex = 0;
    up.on('click', () => {
      optionIndex--;
      down.show();
      options.removeAttr('selected');
      options.eq(optionIndex).attr('selected', 'selected');
      if (optionIndex == 0) {
        up.hide();
      } else {
        up.show();
      }
    });

    down.on('click', () => {
      optionIndex++;
      up.show();
      options.removeAttr('selected');
      options.eq(optionIndex).attr('selected', 'selected');
      if (optionIndex == options.length - 1) {
        down.hide();
      } else {
        down.show();
      }


    });
  }
  $('.cookie-button, .cookie-close').on('click', () => {
    $('.cookie').hide();
    $('.subscribe').css('bottom', 0);
  });

  $('.about-button, .article-button').on('click', () => {
    $('.overlay, .popup-form').fadeIn();
    // $('body').css('overflow','hidden'); 
    // doc.on('scroll keydown mousewheel', scrollFix);
  });

  $('.popup-form__close, .popup-form__back').on('click', () => {
    $('.overlay, .popup').fadeOut();
    // doc.unbind('scroll keydown mousewheel');
  });

  let doc = $(document);

  function scrollFix(e) {
    if (e.keyCode == 38 || e.keyCode == 40 || e.type == 'mousewheel') {
      return false;
    }
    $(this).scrollTop(position);
  }
  let phone = $('.header-menu__phone');
  let current = $('.header-menu__current');
  if ( $(window).width() >= 1024 ) {
    $('.header-menu__nav_item[href="#stages"]').remove();
    $('.header-menu__nav_item[href="#reviews"]').remove();
    
  }
  $(window).scroll(function () {


    let str;
    $(".header-menu__nav li .header-menu__nav_item").each(function () {
      var window_top = $(window).scrollTop();
      var div_1 = $(this).attr('href');
      var div_top = $(div_1).offset().top;
      if (window_top > div_top - 100) {
        $('.header-menu__nav li').find('.header-menu__nav_item').removeClass('header-menu__nav_item_active');
        $('.header-menu__nav li').find('.header-menu__nav_item[href="' + div_1 + '"]').addClass('header-menu__nav_item_active');
        str = $('.header-menu__nav li').find('.header-menu__nav_item[href="' + div_1 + '"]').html();
      } else {
        $('.header-menu__nav li').find('.header-menu__nav_item[href="' + div_1 + '"]').removeClass('header-menu__nav_item_active');
      }
    });
    if ($(window).width() <= 1024) {
      if (str == undefined) {

        phone.show();
        current.hide();
      } else if (current.html() == str) {
        return;
      } else {

        phone.hide();
        current.show();
        current.html(str);
      }
    } else {
      phone.show();
      current.hide();
    }

  });

  $('.footer-bonuses-link').on('click', () => {
    open('bonuses');

  });
  $('.bonuses-close').on('click', () => {
    $('.bonuses').hide();
    setFixed();
    $('.to-top').css('z-index', 1001);
    $('.cookie').removeClass('cookie-popup');
  });
  $('.bonuses-text__title').on('click', () => {
    $('.bonuses-hide').toggleClass('bonuses-hide_active');
    $('.bonuses-text__descr').slideToggle();
  });

  $('.footer-brief-link').on('click', () => {

    open('brief');

  });

  $('.brief-close').on('click', () => {
    $('.brief').hide();
    setFixed();
    $('.to-top').css('z-index', 1001);
    $('.cookie').removeClass('cookie-popup');
  });
  $('.brief-block__title ').on('click', function () {
    let that = $(this).find('.brief-block__list_hide');
    $(that).toggleClass('bonuses-hide_active');
    $('.brief-block').each(function (c) {
      if ($(this).find(that).length) {
        $('.brief-block__items_w').eq(c).slideToggle();
      }
    });
  });
  // $('.articles').on('scroll', () => {
  //   if ($(window).width() >= 768) {
  //     if ($('.articles').offset().top + $('.articles').height() >= $('.articles .footer').offset().top) {
  //       $('.subscribe').fadeOut();
  //     } else {
  //       $('.subscribe').fadeIn();
  //     }
  //   }
  // });
  $('.brief-block__list').on('click', function () {
    let that = $(this).find('.brief-block__list_hide');
    $(that).toggleClass('bonuses-hide_active');
    $('.brief-block__list').each(function (c) {
      if ($(this).find(that).length) {
        $('.brief-block__list_wrapper').eq(c).slideToggle();
      }
    });
  });

  {
    let up = $('.brief-select_nav_up');
    let down = $('.brief-select_nav_down');
    let options = $('.brief-select option');
    let optionIndex = 0;
    up.on('click', () => {
      optionIndex--;
      down.show();
      options.removeAttr('selected');
      options.eq(optionIndex).attr('selected', 'selected');
      optionIndex == 0 ? up.hide() : up.show();
    });

    down.on('click', () => {
      optionIndex++;
      up.show();
      options.eq(optionIndex).attr('selected', 'selected');
      optionIndex == options.length - 1 ? down.hide() : down.show();
    });
  }

  {
    let pos;
    $('.brief-hide').on('click', () => {
      if ($('.brief-hide').hasClass('brief-hide_active')) {
        pos = $('.brief').scrollTop();
        $('.brief').scrollTop(0);
      } else {
        $('.brief').scrollTop(pos);
        $('.brief-hide').toggleClass('brief-hide_active');
      }
    });
    $('.brief').scroll(function () {
      if ($('.brief').scrollTop() > 0) {
        $('.brief-hide').addClass('brief-hide_active');
      } else {
        $('.brief-hide').removeClass('brief-hide_active');
      }
    });
  }

  $('.info .article-block').each(function (n) {
    $(this).find('button, a').on('click', () => {
      $('.cookie').addClass('cookie-popup');
      $('.to-top').css('z-index', 0);
      if ($("html,body").css("overflow") != "hidden") {
        setFixed();
      }

      $('.articles .article-block').show();
      $('.articles .article-block').eq(n).hide();
      $('.articles').fadeIn();
      $('.article').hide();
      $('.article').eq(n).fadeIn();
    });
  });
  $('.articles .article-block').each(function (n) {
    $(this).find('button, a').on('click', () => {
      if ($("html,body").css("overflow") != "hidden") {
        setFixed();
      }
      $('.articles').scrollTop(0);
      $('.articles .article-block').show();
      $('.articles .article-block').eq(n).hide();
      $('.articles').fadeIn();
      $('.article').hide();
      $('.article').eq(n).fadeIn();
    });
  });

  function subSroll () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.subscribe').outerHeight();

    $('.articles').scroll(function () {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $('.articles').scrollTop();
      
           
      
      if ( ($('.articles').offset().top + $('.articles').height() >= $('.articles .footer').offset().top) && ($(window).width() > 768) ) {
        $('.subscribe').show();
        return;
      } else if ($(window).width() <= 768) {
        $('.subscribe').remove();
      }
      if (Math.abs(lastScrollTop - st) <= delta) return;

      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.subscribe').fadeOut();
      } else {
        // Scroll Up
        if (st + $('.articles').height() < $(document).height()) {
          $('.subscribe').fadeIn();
        }
      }
      
      lastScrollTop = st;
    }
  }
  subSroll();
   {
    let pos;
    $('.article-nav__hide').on('click', () => {
      if ($('.article-nav__hide').hasClass('article-nav__hide_active')) {


        pos = $('.articles').scrollTop();
        $('.articles').scrollTop(0);
      } else {
        $('.articles').scrollTop(pos);
        $('.article-nav__hide').toggleClass('article-nav__hide_active');
      }
    });
    $('.articles').scroll(function () {
      // if (subPos < $(this).scrollTop()){
      //   // scroll down
      //   subPos = $(this).scrollTop();
      //   $('.subscribe').fadeOut();
      // } else {
      //   // scroll up
      //   subPos = $(this).scrollTop();
      //   $('.subscribe').fadeIn();
      // }
      if ($('.articles').scrollTop() > 0) {
        $('.article-nav__hide').addClass('article-nav__hide_active');
      } else {
        $('.article-nav__hide').removeClass('article-nav__hide_active');
      }
    });
  }
  $('.article-nav__close').on('click', () => {
    $('.articles').fadeOut();
    setFixed();
    $('.to-top').css('z-index', 1001);
    $('.cookie').removeClass('cookie-popup');
  });

  $('.footer-contacts-link').on('click', () => {
    open('contacts');

  });
  $('.contacts-close').on('click', () => {
    $('.contacts').fadeOut();
    setFixed();
    $('.to-top').css('z-index', 1001);
    $('.cookie').removeClass('cookie-popup');
  }); {
    let pos;
    $('.contacts-hide').on('click', () => {
      if ($('.contacts-hide').hasClass('contacts-hide_active')) {


        pos = $('.contacts').scrollTop();
        $('.contacts').scrollTop(0);
      } else {
        $('.contacts').scrollTop(pos);
        $('.contacts-hide').toggleClass('contacts-hide_active');
      }
    });
    $('.contacts').scroll(function () {
      if ($('.contacts').scrollTop() > 0) {
        $('.contacts-hide').addClass('contacts-hide_active');
      } else {
        $('.contacts-hide').removeClass('contacts-hide_active');
      }
    });
  }

});