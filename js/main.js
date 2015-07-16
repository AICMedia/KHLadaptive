// Inits
$(document).ready(function(){

  HideShow();
  FooterFix();
  SwitcherBtn();
  SlideTable();

  $(window).resize(function(){
    SmartCol();  
  }).resize();

  $(window).scroll(function(){
    FloatNews();
  });

  $('input, select').styler();


  $('.b-feed_matches.m-slick_slider').slick({
    slidesToShow: 9,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 8
        }
      },    
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 7
        }
      },    
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6
        }
      },
        {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5
        }
      }
    ]
  });

  $('.m-round_diagram').each(function() {
    $(this).knob();
    var that =  $(this),
        num = that.attr('value');
    that.animate({animatedVal: num}, {
      step: function() { 
        that.val(Math.ceil(this.animatedVal)).trigger('change'); 
      }   
    });    
  });
   

});


// Hide_Show
function HideShow() {  

  $('.b-feed_matches_item').on('mouseenter', function(){
    $(this).find('.e-matches_popup_links').fadeIn();
  });
  $('.b-feed_matches_item').on('mouseleave', function(){
    $(this).find('.e-matches_popup_links').fadeOut();
  });

      
 
}


// Footer fix
function FooterFix() {
  $(window).resize(function(){

  }).resize();
}


// Float news 
function FloatNews() {

  if($('.b-news_feed').length){
    var startBlock = $('.m-teaser').offset().top;
    var heightBlock = $(window).height();
    var endBlock = ($('#footer').offset().top)-($('.b-news_feed').height());

    var stopBlock = $('body').height()-$('#footer').height()-$(window).height()-$(window).scrollTop();

    console.log(stopBlock)


    if ($(window).scrollTop() < startBlock ) {
      $(".b-news_feed").css({
        position: 'absolute',
        top: '-453px',
        height: 'auto'
      });
    } else if ($(window).scrollTop() < endBlock) {
      $(".b-news_feed").css({
        position: 'fixed',
        top: 0,
        height: heightBlock
      });
    } else if ($(window).scrollTop() > endBlock) {
      $(".b-news_feed").css({
        top: stopBlock
      });
    }
  }
} 


// Smart col
function SmartCol() { 
  $('.m-smart_col').css({ 'width' : '100%'});  
  var colWrap = $('.m-smart_col').width();
  var colNum = Math.floor(colWrap / 210);
  var colFixed = Math.floor(colWrap / colNum);
  $('.m-smart_col').css({ 'width' : colWrap});
  $('.m-smart_col li').css({ 'width' : colFixed});
}  


// Switcher
function SwitcherBtn() {
  $('.e-switcher_btn').on('click',function(){
    var choiseOne = $(this).parent().find('.e-switcher_item.m-first').attr('id');
    var choiseTwo = $(this).parent().find('.e-switcher_item.m-last').attr('id');

    if ($(this).parent().find('.m-last').hasClass('m-active')) {
      $(this).parent().find('.e-switcher_item').toggleClass('m-active');
      $(this).parent().find('.e-switcher_item.m-first').addClass('m-active');
      $(this).find('b').animate({left: 0}, 200);

      $('body').find('.' + choiseOne).show();
      $('body').find('.' + choiseTwo).hide();
    } else {
      $(this).parent().find('.e-switcher_item').removeClass('m-active');
      $(this).parent().find('.e-switcher_item.m-last').addClass('m-active');
      $(this).find('b').animate({left: 12}, 200);

      $('body').find('.' + choiseOne).hide();
      $('body').find('.' + choiseTwo).show();
    };
  });

  $('.e-switcher_item.m-first').on('click',function(){
      $(this).parent().find('.e-switcher_item').removeClass('m-active');
      $(this).addClass('m-active');
      $(this).parent().find('b').animate({left: 0}, 200);

      var choiseOne = $(this).attr('id');
      var choiseTwo = $(this).parent().find('.e-switcher_item.m-last').attr('id');

      $('body').find('.' + choiseOne).show();
      $('body').find('.' + choiseTwo).hide();
  });

  $('.e-switcher_item.m-last').on('click',function(){
      $(this).parent().find('.e-switcher_item').removeClass('m-active');
      $(this).addClass('m-active');
      $(this).parent().find('b').animate({left: 12}, 200);

      var choiseOne = $(this).attr('id');
      var choiseTwo = $(this).parent().find('.e-switcher_item.m-first').attr('id');

      $('body').find('.' + choiseOne).show();
      $('body').find('.' + choiseTwo).hide();
  });

}

// Slide table
function SlideTable() {
  $('.e-slide_link.m-top').on('click',function(){
    if (!$('.m-west .b-score_table_top:visible').length){
      $('.m-west .b-score_table_top').slideDown();
    } else {
      $(this).parent().find('.b-score_table_bottom').slideToggle();
    }     
  });
  $('.e-slide_link.m-bottom').on('click',function(){
    $('.b-score_table_cover.m-west').slideToggle();
    $(this).parent().find('.b-score_table_bottom').slideToggle();
  });
}
      