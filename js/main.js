$('document').ready(() => {
  let menuActive = false;
  $('.header-menu__button').on('click', () => {
    $('.header-menu__button').toggleClass('cross');
    $('.header-menu__nav').toggleClass('header-menu__nav_active');
    if (document.body.style.overflow == "hidden") {
      menuActive = false;
      $("html,body").css("overflow", "auto");
      $(document).bind('touchmove', true);
    } else {
      setTimeout(() => {
        menuActive = true;
        $(document).bind('touchmove', false);
        $("html,body").css("overflow", "hidden");
      }, 500);
    }
  });
  $('.header-menu__nav a').on('click', () => {
    menuActive = false;
    $('.header-menu__button').removeClass('cross');
    $('.header-menu__nav').removeClass('header-menu__nav_active');
    $("html,body").css("overflow", "auto");
  });
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
      $('.header-menu__button').addClass('header-menu__button_hidden');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('.header-menu').removeClass('header-menu_hidden');
        $('.header-menu__button').removeClass('header-menu__button_hidden');
      }
    }

    lastScrollTop = st;
  }

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

  $('.stages-popup__close').on('click', ()=>{
    $('.stages-block').removeClass('stages-block_active');
    $('.stages-popup, .stages-popups').fadeOut();
    $('.stages-block').each(function (a) {
      $(this).find('img').attr('src', `img/stages/img-${a+1}.png`);
    });
  });

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


  {let up = $('.stages-popup__select_nav_up');
  let down = $('.stages-popup__select_nav_down');
  let options = $('.stages-popup__select option');
  let optionIndex = 0;
  up.on('click', ()=>{
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
  
  down.on('click', ()=>{
    optionIndex++;    
    up.show();
    options.eq(optionIndex).attr('selected', 'selected');
    if (optionIndex == options.length-1) {
      down.hide();
    } else {
      down.show();
    }
      
      
  });}
  $('.cookie-button, .cookie-close').on('click', () => {
    $('.cookie').fadeOut();
  });

  $('.about-button').on('click', () => {
    $('.overlay, .popup-form').fadeIn();
    // $('body').css('overflow','hidden'); 
    doc.on('scroll keydown mousewheel', scrollFix);
  });

  $('.popup-form__close, .popup-form__back').on('click', () => {
    $('.overlay, .popup-form').fadeOut();
    doc.unbind('scroll keydown mousewheel');
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
    if ($(window).width() < 980) {
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

  $('#bonuses-link').on('click', ()=>{
    $('.brief').fadeOut();
    $('.bonuses').fadeIn();
  });
  $('.bonuses-close').on('click', ()=>{
    $('.bonuses').fadeOut();
  });
  $('.bonuses-text__title').on('click', ()=>{
    $('.bonuses-hide').toggleClass('bonuses-hide_active');
    $('.bonuses-text__descr').slideToggle();
  });
  
  $('#brief-link').on('click', ()=>{
    $('.bonuses').fadeOut();
    $('.brief').fadeIn();
  });
  $('.brief-close').on('click', ()=>{
    $('.brief').fadeOut();
  });
  $('.brief-block__title ').on('click', function(){
    let that = $(this).find('.brief-block__list_hide');
    $(that).toggleClass('bonuses-hide_active');
    $('.brief-block').each(function(c){
      if ($(this).find(that).length){
        $('.brief-block__items').eq(c).slideToggle();
      }
    }); 
  });
  
  $('.brief-block__list').on('click', function(){
    let that = $(this).find('.brief-block__list_hide');
    $(that).toggleClass('bonuses-hide_active');
    $('.brief-block__list').each(function(c){
      if ($(this).find(that).length){
        $('.brief-block__list_wrapper').eq(c).slideToggle();
      }
    }); 
  });
  
  {let up = $('.brief-select_nav_up');
  let down = $('.brief-select_nav_down');
  let options = $('.brief-select option');
  let optionIndex = 0;
  up.on('click', ()=>{
    optionIndex--;    
    down.show();
    options.removeAttr('selected');
    options.eq(optionIndex).attr('selected', 'selected');
    optionIndex == 0 ? up.hide() : up.show();
  });
  
  down.on('click', ()=>{
    optionIndex++;    
    up.show();
    options.eq(optionIndex).attr('selected', 'selected');
    optionIndex == options.length-1 ? down.hide() : down.show();
  });}
});