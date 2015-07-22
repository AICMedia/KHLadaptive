// Inits
$(document).ready(function(){

  slider_lock = 0;
  table_lock = 0;

  HideShow();
  FooterFix();
  SwitcherBtn();
  DiagramData(); 
  AjaxData(); 

  $('.m-round_diagram').each(function() {
    $(this).knob();
    var that =  $(this),
        num = that.attr('value');
        that.animate({animatedVal: num});    
  });

  $("#detail").slider({ 
    range: "min",
    min: 0,
    max: 3,
    step: 1
  });

  $("#season").slider({ 
    range: "min",
    min: 0,
    max: 7,
    step: 1
  });

  $(window).resize(function(){
    winW = $(window).width();
    FloatPanel();
    SmartCol();
    SlideTable();

    if(winW < 1280){
      if(slider_lock == 0){
        $('.b-float_panel_cover.m-slick_slider').slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }                        
          ]        
        });
        slider_lock = 1;
      }
    } else {
      setTimeout(function() {
        $('.b-float_panel_cover.m-slick_slider').unslick();
        slider_lock = 0;
      }, 100);
      slider_lock = 0;
    }

    if(winW < 800){
      $('.m-round_diagram').trigger('configure',{
          'width':135
      });
    } else {
      $('.m-round_diagram').trigger('configure',{
          'width':155
      });
    }

  }).resize();


  $('input, select').styler();


  $('.b-feed_matches.m-slick_slider').slick({
    slidesToShow: 9,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToScroll: 4,
          slidesToShow: 8
        }
      },    
      {
        breakpoint: 1400,
        settings: {
          slidesToScroll: 4,
          slidesToShow: 7
        }
      },    
      {
        breakpoint: 1280,
        settings: {
          slidesToScroll: 3,
          slidesToShow: 6
        }
      },
        {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 3,
          slidesToShow: 5
        }
      },
        {
        breakpoint: 800,
        settings: {
          slidesToScroll: 2,          
          slidesToShow: 4
        }
      },
        {
        breakpoint: 640,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 3
        }
      },
        {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2
        }
      }
    ]
  });

  $('.m-scroll_block').draggable({
    cursor: "move",
    axis: "x",
    drag: function( event, ui ) {
      var left = ui.position.left;
      var width = $(this).width();
      var maxwidth = $(this).parent().width();

      if (width > maxwidth){      
        if(left > 0){
          $(this).css({left: 0+'px'});
          return false;
        } else if(Math.abs(left) > (width-maxwidth)){
          $(this).css({left: (maxwidth-width)+'px'});
          return false;
        }
      } else {
        return false;
      }
    }
  });  

});


// Hide_Show
function HideShow() {  

  $('.b-feed_matches_item').on('mouseenter', function(){
    $(this).find('.e-matches_popup_links').fadeIn(250);
  });
  $('.b-feed_matches_item').on('mouseleave', function(){
    $(this).find('.e-matches_popup_links').fadeOut(250);
  });

  $('.e-slide_link').on('click', function(){
    $(this).toggleClass('m-up');
  });

  $('.e-title_tab_item').on('click', function(){
    $(this).parent().find('.e-title_tab_item').removeClass('m-active');
    $(this).addClass('m-active');
  });      
 
  $('.b-details.m-ajax').on('click', function(){
    $(this).parent().find('.b-details').removeClass('m-active');
    $(this).addClass('m-active');
  }); 

}


// Footer fix
function FooterFix() {
  $(window).resize(function(){

  }).resize();
}


// Float panel 
function FloatPanel() {
  $(window).scroll(function(){
    if(winW > 1280){
      if($('.b-float_panel').length){
        var startBlock = $('.s-float_panel_start').offset().top;
        var heightBlock = $(window).height();
        var endBlock = ($('#footer').offset().top)-($('.b-float_panel').height());
        var stopBlock = $('body').height()-$('#footer').height()-$(window).height()-$(window).scrollTop();

        if ($(window).scrollTop() < startBlock ) {
          $(".b-float_panel").css({
            position: 'absolute',
            top: '0px',
            height: 'auto'
          });
        } else if ($(window).scrollTop() < endBlock) {
          $(".b-float_panel").css({
            position: 'fixed',
            top: 0,
            height: heightBlock
          });
        } else if ($(window).scrollTop() > endBlock) {
          $(".b-float_panel").css({
            top: stopBlock
          });
        }
      }
    }
  }); 
}

// Smart col
function SmartCol() {  
  var colWrap = $('.m-smart_col').width();
  var colNum = Math.floor(colWrap / 210);
  if(winW < 480){
    var colNum = Math.floor(colWrap / 145);
  }
  var colFixed = Math.floor(colWrap / colNum);
  $('.m-smart_col li').css({ 'width' : colFixed-1});
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
  if(table_lock == 0) {
    table_lock = 1;
    $('.e-slide_link.m-top').on('click',function(){
      table_lock = 1; 
      if (!$('.m-west .b-score_table_top:visible').length){
        $('.m-west .b-score_table_top').slideDown();
      } else {
        $(this).parent().find('.b-score_table_bottom').slideToggle();
      } 
    });

    $('.e-slide_link.m-bottom').on('click',function(){
      table_lock = 1; 
      if( winW > 640 && winW < 1024){
        if (!$('.m-east .b-score_table_top:visible').length){
          $('.m-east .b-score_table_top').slideDown();
        } else {
          $(this).parent().find('.b-score_table_bottom').slideToggle();
        } 
      } else {
        $('.b-score_table_cover.m-west').slideToggle();
        $(this).parent().find('.b-score_table_bottom').slideToggle();
      }
    });
  }  

}

// Diagram 
function DiagramData() {

  $('.b-short_block .b-details').on('click',function(){
    $('.m-round_diagram').each(function() {

      var fakeData = Math.floor(Math.random() * (21 - 0 + 1)) + 0;

      $(this).knob();
      var that =  $(this);
          that.animate({animatedVal: fakeData}, {
            step: function() {
              that.val(Math.ceil(this.animatedVal)).trigger('change');
            }  
          }); 
    });
  });

}

// Ajax
function AjaxData() {

  $('.m-ajax').on('click', function(){
    var choiseOne = $(this).parent().attr('id');
    var choiseTwo = $(this).attr('id');
    $('.' + choiseOne).fadeOut(250);
    setTimeout(function() {
      $('.' + choiseOne).load('ajax.html ' + '.' + choiseTwo).fadeIn(250);
    }, 200);
  });

}
      