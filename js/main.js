$('document').ready(() => {
  let windowOffset;
  var elements = $('.stages-popup__links');
  Stickyfill.add(elements);
  let footer = $('.footer').clone();
  $(footer).removeAttr('id');
  let menuActive = false;
  $(footer).appendTo('.article_wrapper_wrapper, .bonuses_wrapper_wrapper, .brief_wrapper_wrapper, .contacts_wrapper_wrapper');
  let margin = $('.header-menu').outerHeight() + $(window).width() / 100 * 1.4 - ($('.header-title_left').offset().top - $('.header-title').offset().top);
  if ($(window).width() >= 1024) {
    $('.header-main').css('margin-top', margin);
  }

  // Ширина скроллбара
  function scrollbarWidth() {
    var block = $('<div>').css({
        'height': '50px',
        'width': '50px'
      }),
      indicator = $('<div>').css({
        'height': '200px'
      });

    $('body').append(block.append(indicator));
    var w1 = $('div', block).innerWidth();
    block.css('overflow-y', 'scroll');
    var w2 = $('div', block).innerWidth();
    $(block).remove();
    return (w1 - w2);
  }
  // Меню
  $('.header-menu__button').on('click', () => {
    $('.header-menu__nav').toggleClass('header-menu__nav_active');
    if ($('.header-menu__button').hasClass('cross')) {
      $('.to-top').css('z-index', 1001);
      setTimeout(setFixed, 0);
    } else {
      $('.to-top').css('z-index', 0);
      setTimeout(setFixed, 500);
    }
    $('.header-menu__button').toggleClass('cross');
  });
  $('.header-menu__button').on('dblclick', () => {
    return;
  });

  $('.header-menu__nav a').on('click', () => {
    if ($('.header-menu__nav').hasClass('header-menu__nav_active')) {
      menuActive = false;
      $('.header-menu__button').removeClass('cross');
      $('.header-menu__nav').removeClass('header-menu__nav_active');
      $("body").toggleClass("fixed");
      setTimeout(() => {
        $("html").toggleClass("scroll-auto");
      }, 500);
      $('.to-top').css('z-index', 1001);
    }
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

    $('.to-top').on('click', function () {
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
        $('.stages-popup__links').css('top', $('.header-menu').height() + 30);

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
      $('.cookie').css('margin-left', 0 - scrollbarWidth());
      $('.popup').hide();
      $(`.${name}`).show();
      $(`.${name}_wrapper_wrapper`).scrollTop(0);
    } else {
      $('.cookie').css('margin-left', 0 - scrollbarWidth());
      $('.to-top').css('z-index', 0);
      $(`.${name}`).show();
      $(`.${name}_wrapper_wrapper`).scrollTop(0);
      setFixed();

    }
  }
  // Функция для фиксирования body
  function setFixed() {
    if ($('body').hasClass("fixed")) {
      menuActive = false;

      $("body").toggleClass("fixed");
      window.scrollTo(0, windowOffset);
      $("html").toggleClass("scroll-auto");

    } else {
      setTimeout(() => {
        windowOffset = window.pageYOffset;
        $("html").toggleClass("scroll-auto");
        menuActive = true;
        $("body").toggleClass("fixed");
      }, 100);
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

  let stagesPopupPos = 0;
  // Этапы работ
  $('.stages-popup').draggable();
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

      stagesPopupPos = 0;

      $('.stages-block').removeClass('stages-block_active');
      $('.stages-popups').fadeIn();
      $(this).addClass('stages-block_active');

      for (let i = 0; i < $('.stages-block').length; i++) {

        if ($('.stages-block').eq(i).hasClass('stages-block_active')) {
          $('.stages-popup').eq(i).css({
            top: 0,
            left: 0
          });
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
    

    $('.stages-popup__top').on('click', () => {
      if ($('.stages-popup__top').hasClass('stages-popup__top_active')) {
        stagesPopupPos = $(window).scrollTop();
        $(window).scrollTop($('.stages-popup').eq($('.stages-block').index($('.stages-block_active'))).offset().top - 100);

      } else if (stagesPopupPos != 0) {
        $(window).scrollTop(stagesPopupPos);
        $('.stages-popup__top').toggleClass('stages-popup__top_active');
      } else {
        return;
      }
    });

    $(window).scroll(function () {
      if (0 != $('.stages-popup').eq($('.stages-block').index($('.stages-block_active'))).offset().top) {
        if ($(window).scrollTop() > $('.stages-popup').eq($('.stages-block').index($('.stages-block_active'))).offset().top) {
          $('.stages-popup__top').addClass('stages-popup__top_active');
        } else {
          $('.stages-popup__top').removeClass('stages-popup__top_active');
        }
      }
    });
    $('.stages-popup').draggable({
      stop: function(){
        stagesPopupPos = 0;
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
    $('.stages-popup').eq(i).css({
      'top': $('.stages-popup').eq(i - 1).css('top'),
      'left': $('.stages-popup').eq(i - 1).css('left')
    });
    $('.stages-block').eq(i).find('img').attr('src', `img/stages/img-${i+1}-active.png`);
    $(window).scrollTop($('.stages-popup').eq(i).offset().top - $('.header-menu').height() - 20);
  });
  $('.stages-popup__link_prev').on('click', () => {

    let i = +$('.stages-block_active .stages-block__number').html() - 2;
    $('.stages-block').each(function (a) {
      $(this).find('img').attr('src', `img/stages/img-${a+1}.png`);
    });
    $('.stages-block').removeClass('stages-block_active');
    $('.stages-popup').hide();
    $('.stages-popup').eq(i).fadeIn();
    $('.stages-popup').eq(i).css({
      'top': $('.stages-popup').eq(i + 1).css('top'),
      'left': $('.stages-popup').eq(i + 1).css('left')
    });
    $('.stages-block').eq(i).addClass('stages-block_active');
    $('.stages-block').eq(i).find('img').attr('src', `img/stages/img-${i+1}-active.png`);
    $(window).scrollTop($('.stages-popup').eq(i).offset().top - $('.header-menu').height() - 20);
  });

  // Select
  {


    $('.stages-popup__select_nav').on('click', function (e) {
      var direction = $(this).data('direction');
      var $select = $('#stages-popup__select');
      var $currentOption = $select.find(':selected');
      var $nextOption = direction == 'down' ?
        $currentOption.next() : $currentOption.prev();

      if ($nextOption.length) {
        $select.val($nextOption.attr('value'));
        changeLink('stages-popup__select');
      }
    });
    let up = $('.stages-popup__select_nav_up');
    let down = $('.stages-popup__select_nav_down');
    let options = $('.stages-popup__select option');
    let optionIndex = 0;

    up.on('click', () => {
      optionIndex--;
      down.show();
      if (optionIndex == 0) {
        up.hide();
      } else {
        up.show();
      }
    });

    down.on('click', () => {
      optionIndex++;
      up.show();
      if (optionIndex == options.length - 1) {
        down.hide();
      } else {
        down.hide();
      }
    });


  }

  
  $('.cookie-button, .cookie-close').on('click', () => {
    $('.cookie').hide();
    $('.subscribe').css('bottom', 0);
  });

  $('.about-button, .article-button, #contact, #brief-contact').on('click', () => {
    $('.popup-form__download').hide();
    $('.overlay, .popup-form').fadeIn();
    $('body').css('overflow','hidden');
    // doc.on('scroll keydown mousewheel', scrollFix);
  });

  {

    $('.popup-select_nav').on('click', function (e) {
      let direction = $(this).data('direction');
      let $select = $('#popup-select');
      let $currentOption = $select.find(':selected');
      let $nextOption = direction == 'down' ?
        $currentOption.next() : $currentOption.prev();

      if ($nextOption.length) {
        $select.val($nextOption.attr('value'));
      }
    });
    let up = $('.popup-select_nav_up');
    let down = $('.popup-select_nav_down');
    let options = $('.popup-select option');
    let optionIndex = 0;

    up.on('click', () => {
      optionIndex--;
      down.show();
      if (optionIndex == 0) {
        up.hide();
      } else {
        up.show();
      }
    });

    down.on('click', () => {
      optionIndex++;
      up.show();
      if (optionIndex == options.length - 1) {
        down.hide();
      } else {
        down.show();
      }
    });
  }

  $('#order').on('click', () => {
    $('.popup-form').hide();
    $('.overlay, .popup-form__download').fadeIn();
    $('body').css('overflow','hidden');
    // doc.on('scroll keydown mousewheel', scrollFix);
  });

  $('.popup-form__close, .popup-form__back').on('click', () => {
    $('.overlay, .popup-form').fadeOut();
    $('body').css('overflow','auto');

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
  if ($(window).width() >= 991) {
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
    if ($(window).width() <= 991) {
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
    $('.cookie').css('margin-left', 0);
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
    $('.cookie').css('margin-left', 0);
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


  $('.brief-block__list').on('click', function () {
    let that = $(this).find('.brief-block__list_hide');
    $(that).toggleClass('bonuses-hide_active');
    $('.brief-block__list').each(function (c) {
      if ($(this).find(that).length) {
        $('.brief-block__list_wrapper').eq(c).slideToggle();
      }
    });
  });
  function changeLink(el){
    let val = $(`#${el}`).val();
    $(`.${el}_w`).find('a').attr('href', val);
  }
  changeLink('brief-select');
  changeLink('stages-popup__select');
  {
    $('.brief-select_nav').on('click', function (e) {
      let direction = $(this).data('direction');
      let $select = $('#brief-select');
      let $currentOption = $select.find(':selected');
      let $nextOption = direction == 'down' ?
      $currentOption.next() : $currentOption.prev();
      if ($nextOption.length) {
        $select.val($nextOption.attr('value'));
        changeLink('brief-select');
      }
    });
    let up = $('.brief-select_nav_up');
    let down = $('.brief-select_nav_down');
    let options = $('.brief-select option');
    let optionIndex = 0;

    up.on('click', () => {
      optionIndex--;
      down.show();
      if (optionIndex == 0) {
        up.hide();
      } else {
        up.show();
      }
    });

    down.on('click', () => {
      optionIndex++;
      up.show();
      if (optionIndex == options.length - 1) {
        down.hide();
      } else {
        down.show();
      }
    });
  }

  {
    let pos;
    $('.brief-hide').on('click', () => {
      if ($('.brief-hide').hasClass('brief-hide_active')) {
        pos = $('.brief_wrapper_wrapper').scrollTop();
        $('.brief_wrapper_wrapper').scrollTop(0);
      } else {
        $('.brief_wrapper_wrapper').scrollTop(pos);
        $('.brief-hide').toggleClass('brief-hide_active');
      }
    });
    $('.brief_wrapper_wrapper').scroll(function () {
      if ($('.brief_wrapper_wrapper').scrollTop() > 0) {
        $('.brief-hide').addClass('brief-hide_active');
      } else {
        $('.brief-hide').removeClass('brief-hide_active');
      }
    });
  }
  $('.articles').show();
  $('.article').each(function(){
    $(this).show();
    let offsets = [];
    $(this).find('.heading').each(function() {
      offsets.push( $(this).offset().top );
    });
    let that = this;
    $(this).find('.article-list').find('a').each(function(index){
      $(this).click(function(event){
        event.preventDefault();        
        $('.article_wrapper_wrapper').scrollTop(offsets[index]);
      });
    });
    $(this).hide();
  });
  $('.articles').hide();

  $('.info .article-block').each(function (n) {
    $(this).find('button, a').on('click', () => {
  
      $('.cookie').css('margin-left', 0 - scrollbarWidth());
      $('.to-top').css('z-index', 0);
      if ($("html,body").css("overflow") != "hidden") {
        setFixed();
      }
      $('.articles .article-block').show();
      $('.articles .article-block').eq(n).hide();
      $('.articles').fadeIn();
      $('.article_wrapper_wrapper').scrollTop(0);
      $('.article').hide();
      $('.article').eq(n).fadeIn();
    });
  });
  $('.articles .article-block').each(function (n) {
    $(this).find('button, a').on('click', () => {
      if ($("body").css("overflow") != "hidden") {
        setFixed();
      }
      $('.article_wrapper_wrapper').scrollTop(0);
      $('.articles .article-block').show();
      $('.articles .article-block').eq(n).hide();
      $('.articles').fadeIn();
      $('.article').hide();
      $('.article').eq(n).fadeIn();
    });
  });

  function subSroll() {
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



      if (($('.articles').offset().top + $('.articles').height() >= $('.articles .footer').offset().top) && ($(window).width() > 768)) {
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
  subSroll(); {
    let pos;
    $('.article-nav__hide').on('click', () => {
      if ($('.article-nav__hide').hasClass('article-nav__hide_active')) {


        pos = $('.article_wrapper_wrapper').scrollTop();
        $('.article_wrapper_wrapper').scrollTop(0);
      } else {
        $('.article_wrapper_wrapper').scrollTop(pos);
        $('.article-nav__hide').toggleClass('article-nav__hide_active');
      }
    });
    $('.article_wrapper_wrapper').scroll(function () {
      // if (subPos < $(this).scrollTop()){
      //   // scroll down
      //   subPos = $(this).scrollTop();
      //   $('.subscribe').fadeOut();
      // } else {
      //   // scroll up
      //   subPos = $(this).scrollTop();
      //   $('.subscribe').fadeIn();
      // }
      if ($('.article_wrapper_wrapper').scrollTop() > 0) {
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
    $('.cookie').css('margin-left', 0);
  });

  $('.footer-contacts-link').on('click', () => {
    open('contacts');

  });
  $('.contacts-close').on('click', () => {
    $('.contacts').fadeOut();
    setFixed();
    $('.to-top').css('z-index', 1001);
    $('.cookie').css('margin-left', 0);
  }); {
    let pos;
    $('.contacts-hide').on('click', () => {
      if ($('.contacts-hide').hasClass('contacts-hide_active')) {


        pos = $('.contacts_wrapper_wrapper').scrollTop();
        $('.contacts_wrapper_wrapper').scrollTop(0);
      } else {
        $('.contacts_wrapper_wrapper').scrollTop(pos);
        $('.contacts-hide').toggleClass('contacts-hide_active');
      }
    });
    $('.contacts_wrapper_wrapper').scroll(function () {
      if ($('.contacts_wrapper_wrapper').scrollTop() > 0) {
        $('.contacts-hide').addClass('contacts-hide_active');
      } else {
        $('.contacts-hide').removeClass('contacts-hide_active');
      }
    });
  }

  function enableSelectBoxes() {
    $('.services-popup__select').each(function () {
      $(this).children('.services-popup__selected').html($(this).children('.services-popup__options').children('.services-popup__option:first').html());
      $(this).attr('value', $(this).children('.services-popup__options').children('.services-popup__option:first').attr('value'));

      $(this).children('.services-popup__selected, .services-popup__arrow').click(function () {
        if ($(this).parent().children('.services-popup__options').css('display') == 'none') {
          $(this).parent().children('.services-popup__options').css('display', 'block');
          if ($(window).height() < $(this).parent().children('.services-popup__selected').offset().top - $('.services').offset().top + $(this).parent().children('.services-popup__options').height()) {
            $(this).parent().children('.services-popup__options').css('top', '-50%');
          }
        } else {
          $(this).parent().children('.services-popup__options').css('top', '50%');
          $(this).parent().children('.services-popup__options').css('display', 'none');
        }
      });
      $(document).mouseup(function (e) {
        var container = $('.services-popup__options');
        if (container.has(e.target).length === 0) {
          container.hide();
        }
      });
      $(this).find('.services-popup__option').click(function () {
        $(this).parent().css('display', 'none');
        $(this).closest('.services-popup__select').attr('value', $(this).attr('value'));
        $(this).parent().siblings('.services-popup__selected').html($(this).html());
      });
    });
  }


  const services = $('.services-popup');
  enableSelectBoxes();
  $('.services-popups').slick({
    nextArrow: '<button type="button" class="works-next"></button>',
    prevArrow: '<button type="button" class="works-prev"></button>',
    lazyLoad: 'ondemand',
    responsive: [{
      breakpoint: 1023,
      settings: {
        arrows: false,
      }
    }]
  });
  setTimeout(() => {
    $('.services-popups__wrapper').hide(0, function () {
      $(this).css('opacity', 1);
    });
  }, 1000);
  $('.services-popup__close').on('click', () => {

    $('body').css('overflow', 'auto');
    $('.to-top').unbind('click');
    $('.to-top').on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 10);
    });
    toTopObj = 0;
    $('.services-popups__wrapper, .services-overlay').fadeOut();
    if ( $(window).width() <= 991 ) {
      $('.header-menu, .cookie, .header-menu__button').fadeIn();
    } else {
      $('.header-menu, .cookie').fadeIn();
    }
  });

  $('.services-block').each(function (index) {

    $(this).find('.services-block__hover, .services-block__button').on('click', () => {
      $('.header-menu, .cookie, .header-menu__button').fadeOut();
      $(window).scrollTop($('#services').offset().top - 50);
      $('.services-popups').slick('slickGoTo', index);
      let top;
      top = services.eq(index).find('.services-popup__block').eq(0).height() / 2;
      $('.services-popups__wrapper, .services-overlay').fadeIn();
      toTopObj = $('#services').offset().top - 50;
      if ($(window).height() < services.eq(index).height()) {
        $('.services-popups__wrapper').css('overflow', 'auto');
      }
      $('body').css('overflow', 'hidden');
      $('.to-top').unbind('click');
      $('.to-top').on('click', function () {
        $('.services-popups__wrapper').animate({
          scrollTop: 0
        }, 10);
      });
    });



  });
  let pos = 0;
  $('.services-popups').on('beforeChange', function (event, slick, direction) {

    $(this).find('.slick-arrow').hide();
    // setTimeout(()=>{
    //   $('.services-popup__block_wrapper').animate({top: 0}, 0);
    // }, 100);
    $('.services-popups__wrapper').animate({
      scrollTop: 0
    }, 10);
  });
  $('.services-popups').on('afterChange', function (event, slick, direction) {
    let top;
    top = services.eq($('.services-popups').slick('slickCurrentSlide')).find('.services-popup__block').eq(0).height() / 2;
    if ($(window).height() < services.eq($('.services-popups').slick('slickCurrentSlide')).height()) {
      $('.services-popups__wrapper').css({
        'overflow': 'auto',
      });
    } else {
      $('.services-popups__wrapper').css({
        'overflow': 'hidden',
      });
    }
    $(this).find('.slick-arrow').fadeIn();
    $(this).find('.slick-arrow').css('top', top);

    pos = 0;
  });

  $('.services-popup__logo').on('click', () => {
    $('body').css('overflow', 'auto');
    $('.to-top').unbind('click');
    $('.to-top').on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 10);
    });
    $('.services-popups__wrapper, .services-overlay').fadeOut();
    $('.header-menu, .cookie, .header-menu__button').fadeIn();
    $(window).scrollTop(0);
  });

  $('.services-popup').each(function (index) {
    let that = this;

    $(that).find('.services-popup__hide').on('click', function () {
      if ($(this).html() == 'Показать текст') {
        $(this).html('Скрыть текст');
      } else {
        $(this).html('Показать текст');
      }
      $(that).find('.services-popup__main').slideToggle(500);
      services.eq($('.services-popups').slick('slickCurrentSlide')).find('.services-popup__block_wrapper').animate({
        top: 0
      }, 500);
      pos = 0;
      setTimeout(() => {
        let top;
        top = $(that).find('.services-popup__block').eq(0).height() / 2;
        $('.services-popups').find('.slick-arrow').css('top', top);
      }, 500);

    });
  });


  // let servTop = $('.services-popup__top'),
  //   servBot = $('.services-popup__bot');

  // servTop.on('mouseenter', () => {
  //   console.log(pos);

  //   let interval = setInterval(() => {
  //     pos += 5;
  //     services.eq($('.services-popups').slick('slickCurrentSlide')).find('.services-popup__block').eq(0).find('.services-popup__block_wrapper').css("top", pos);
  //     if (pos >= 0) {
  //       clearInterval(interval);
  //     }
  //   }, 10);
  //   if (pos >= 0) {
  //     clearInterval(interval);
  //   }
  //   servTop.on('mouseleave', () => {
  //     clearInterval(interval);
  //   });
  // });
  // servBot.on('mouseenter', () => {
  //   let interval = setInterval(() => {
  //     pos -= 5;
  //     services.eq($('.services-popups').slick('slickCurrentSlide')).find('.services-popup__block_wrapper').css("top", pos);
  //     if (pos <= -services.eq($('.services-popups').slick('slickCurrentSlide')).find('.services-popup__block_wrapper').height() + services.eq($('.services-popups').slick('slickCurrentSlide')).find('.services-popup__block').eq(0).height()) {
  //       clearInterval(interval);
  //     }
  //   }, 10);
  //   if (pos <= -services.eq($('.services-popups').slick('slickCurrentSlide')).find('.services-popup__block_wrapper').height() + services.eq($('.services-popups').slick('slickCurrentSlide')).find('.services-popup__block').eq(0).height()) {
  //     clearInterval(interval);
  //   }
  //   servBot.on('mouseleave', () => {
  //     clearInterval(interval);
  //   });
  // });
});