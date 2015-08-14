// Inits

$(document).ready(function(){

  slider_lock = 0;
  table_lock = 0;

  HideShow();
  MobileMenu();
  FooterFix();
  SwitcherBtn();
  DiagramData();
  AjaxData();
  DraggableTables();

  if($('#canvas_01').length){
    ChartRadar1();
  }
  if($('#canvas_02').length){
    ChartRadar2();
  }
  if($('#canvas_03').length){
    ChartRadar3();
  }
  if($('#canvas_04').length){
    ChartRadar4();
  }
  if($('#canvas_05').length){
    ChartRadar5();
  }

  if($('#s-map').length){
    CustomMap();
  }

  $('.m-round_diagram').each(function() {
    $(this).knob();
    var that =  $(this),
        num = that.attr('value');
        that.animate({animatedVal: num});
  });

  $("#detail").slider({
    animate: 250,
    range: "min",
    min: 0,
    max: 3,
    step: 1
  });

  $("#season").slider({
    animate: 250,
    range: "min",
    min: 0,
    max: 7,
    step: 1,
    slide: function( event, ui ) {

    }
  });

  $("#season_past").slider({
    animate: 250,
    range: "min",
    min: 0,
    max: 6,
    step: 1,
    slide: function( event, ui ) {
      $('.e-point_scale li, .e-point_switcher li').removeClass('m-active');
      $('.e-point_switcher').find('.m-n_' + ui.value).addClass('m-active');
      $('.e-point_scale').find('.m-n_' + ui.value).addClass('m-active').next().addClass('m-active');
    }
  });

  $("#season_score").slider({
    animate: 250,
    range: "min",
    min: 0,
    max: 7,
    step: 1,
    slide: function( event, ui ) {
      $('.e-point_scale li, .e-point_switcher li').removeClass('m-active');
      $('.e-point_switcher').find('.m-n_' + ui.value).addClass('m-active');
      $('.e-point_scale').find('.m-n_' + ui.value).addClass('m-active').next().addClass('m-active');
    }
  });


  $(window).scroll(function(){
    FloatPanel();
    FloatMenu();
    FloatShortBlock();
  });

  $(window).resize(function(){
    winW = $(window).width();
    FloatPanel();
    FloatMenu();
    SmartCol();
    SlideTable();

    if(winW < 1264){
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

    if(winW > 1024){
      $('.b-header_menu_cover').show();
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


  $('.b-gallery_placeholders').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.b-gallery_thumbs',
    prevArrow: '.b-gallery_prev',
    nextArrow: '.b-gallery_next'
  });
  $('.b-gallery_thumbs').slick({
    slidesToScroll: 1,
    variableWidth: true,
    focusOnSelect: true,
    arrows: false,
    asNavFor: '.b-gallery_placeholders'
  });

  $('input, select').styler();

  // таблицы с сортировкой

  $('.b-sorttable').dataTable({
    paging: false,
    info: false,
    filter: false
  });

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

  $(document)
    .on('click', '.e-params_btn', function(e) {
      e.preventDefault();
      $('.b-float_panel').slideToggle();
    })
    .on('click', '.e-params_close', function(e) {
      e.preventDefault();
      $('.b-float_panel').slideUp();
    })

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

  $('.e-gloss_btn').on('click', function(){
    var choise = $(this).attr('id');
    $('body').find('.' + choise).slideToggle();
  });


  $("div").next()

}


// Mobile menu
function MobileMenu() {
  $('.e-mobile_menu_btn').on('click', function(){
    $(this).toggleClass('m-active');
    $('.b-header_menu_cover').slideToggle();
  });
}


// Footer fix
function FooterFix() {

}


function FloatShortBlock() {
  if (Modernizr.mq('(min-width: 1025px)')) {
    $.each($('.b-short_block'), function(i, e){
      var cover = $(e).parent();
      var top = $(window).scrollTop() > $(e).parent().offset().top
      var bottom = $(window).scrollTop() < $(e).parent().innerHeight() + $(e).parent().offset().top - $(e).find('.b-score_table_cover.m-scrollable').innerHeight()
      if (top && bottom) {
        TweenMax.set($(e).find('.b-score_table_cover.m-scrollable'), {
          position: 'fixed',
          top: 0
        })
      } else {
        if (top) { TweenMax.set($(e).find('.b-score_table_cover.m-scrollable'), {position: 'absolute', top: $(e).parent().innerHeight() - $(e).find('.b-score_table_cover.m-scrollable').innerHeight()})}
        if (bottom) { TweenMax.set($(e).find('.b-score_table_cover.m-scrollable'), {position: 'absolute', top: 0})}
      }
    })
  }
}

// Float panel
function FloatPanel() { 
  if(winW > 1264){
    if($('.b-float_panel').length){
      var startBlock = $('.s-float_panel_start').offset().top;
      var heightBlock = $(window).height();
      var endBlock = ($('#footer').offset().top)-($('.b-float_panel').height());
      var stopBlock = $('body').height()-$('#footer').height()-$(window).height()-$(window).scrollTop();

      if ($(window).scrollTop() < startBlock ) {
        $(".b-float_panel").css({
          position: 'absolute',
          top: '0px',
          left: '-260px',
          height: 'auto'
        });
        $(".b-float_panel_cover").css({
          'min-height': heightBlock-startBlock
        });
      } else if ($(window).scrollTop() < endBlock) {
        $(".b-float_panel").css({
          position: 'fixed',
          left: 0,
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

  if (winW < 1264){ 
    $(".b-float_panel_cover").css({
      'min-height': 'auto'
    });
  }
}


function DraggableTables() {
  $.each($('.m-draggable'), function(i, e){
    Draggable.create(e, {
      type:"scrollLeft",
      edgeResistance:0.5,
      lockAxis:true,
      onDrag: function() {
        var xPosition = this.x
        if (xPosition < this.minX) { xPosition = this.minX }
        $('table tr>td:first-child, table tr>th:first-child', $(this.target)).css({
          left: - xPosition
        })
      }
    });
    $(e).css({ overflow: 'hidden' });
  });

  $('.m-draggable table tr>td:first-child, .m-draggable table tr>th:first-child').css({
    position: 'relative',
    left: 0,
    background: '#fff',
    'white-space': 'nowrap'
  });

  $(window).on('resize', function(){
    $('.m-draggable > div').css({'padding-right': 0})
    TweenMax.set($('.m-draggable'), {scrollLeft: 0})
    $('.m-draggable table tr>td:first-child, .m-draggable table tr>th:first-child').css({ left: 0 });
    DraggableTablesEnabled();
  });

  DraggableTablesEnabled();
}


function DraggableTablesEnabled() {
  $.each($('.b-table_view'), function(i, e){
    if ($('table', e).innerWidth() > $('.m-draggable', e).innerWidth()){
      $(e).addClass('m-draggable_enabled')
    } else {
      $(e).removeClass('m-draggable_enabled')
    }
  })
}
// Float panel
function FloatMenu() {

  if(winW < 1008){
    var startBlock = $('#header').offset().top;
    if ($(window).scrollTop() > startBlock ) {
      $(".b-header_top_cover").css({
        position: 'fixed',
        top: 0
      });
    } else {
      $(".b-header_top_cover").css({
        position: 'relative',
        top: 'auto'
      });
    }
  } else {
    $(".b-header_top_cover").css({
      position: 'relative',
      top: 'auto'
    });
  }

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

      $('body').find('.' + choiseOne).fadeIn();
      $('body').find('.' + choiseTwo).hide();
    } else {
      $(this).parent().find('.e-switcher_item').removeClass('m-active');
      $(this).parent().find('.e-switcher_item.m-last').addClass('m-active');
      $(this).find('b').animate({left: 12}, 200);

      $('body').find('.' + choiseOne).hide();
      $('body').find('.' + choiseTwo).fadeIn();
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


// Round diagram
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
      $('.' + choiseOne).load('ajax.html ' + '.' + choiseTwo).fadeIn(250, function() {
        SwitcherBtn();
      });
    }, 200);
  });

  $('.e-point_switcher li').on('click', function(){
    $('.b-wide_tile').fadeOut(450);
    setTimeout(function() {
      $('.s-ajax_cover_cup').load('ajax.html ' + '.b-wide_tile').fadeIn(450);
    }, 400);
  });

}


// Chart radar
function ChartRadar1() {

  var radarChartData_01 = {
    labels: ["О", "И", "Ш", "А", "+/-", "Штр"],
    datasets: [
      {
        fillColor: "rgba(1,145,237,0.7)",
        strokeColor: "rgba(1,145,237,0)",
        data: [21,16,8,13,7,20],
        additionally: [2.5,102,103,104,105,106]
      }
    ]
  };

  window.myRadar = new Chart(document.getElementById("canvas_01").getContext("2d")).Radar(radarChartData_01, {
    scaleLineColor: "rgba(182,185,187,1)",
    angleLineColor: "rgba(182,185,187,1)",
    responsive: true,
    pointDot: false,
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 11,
    scaleStartValue: 0,
  });
}
function ChartRadar2() {
  var radarChartData_02 = {
    labels: ["О", "И", "Ш", "А", "+/-", "Штр"],
    datasets: [
      {
        fillColor: "rgba(1,145,237,0.7)",
        strokeColor: "rgba(1,145,237,0)",
        data: [16,22,7,18,9,17],
        additionally: [101,102,103,104,105,106]
      }
    ]
  };

  window.myRadar = new Chart(document.getElementById("canvas_02").getContext("2d")).Radar(radarChartData_02, {
    scaleLineColor: "rgba(182,185,187,1)",
    angleLineColor: "rgba(182,185,187,1)",
    responsive: true,
    pointDot: false,
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 11,
    scaleStartValue: 0,
  });
}
function ChartRadar3() {
  var radarChartData_03 = {
    labels: ["О", "И", "Ш", "А", "+/-", "Штр"],
    datasets: [
      {
        fillColor: "rgba(1,145,237,0.7)",
        strokeColor: "rgba(1,145,237,0)",
        data: [19,4,12,10,15,21],
        additionally: [101,102,103,104,105,106]
      }
    ]
  };

  window.myRadar = new Chart(document.getElementById("canvas_03").getContext("2d")).Radar(radarChartData_03, {
    scaleLineColor: "rgba(182,185,187,1)",
    angleLineColor: "rgba(182,185,187,1)",
    responsive: true,
    pointDot: false,
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 11,
    scaleStartValue: 0,
  });
}
function ChartRadar4() {
  var radarChartData_04 = {
    labels: ["О", "И", "Ш", "А", "+/-", "Штр"],
    datasets: [
      {
        fillColor: "rgba(1,145,237,0.7)",
        strokeColor: "rgba(1,145,237,0)",
        data: [21,20,7,10,3,19],
        additionally: [101,102,103,104,105,106]
      }
    ]
  };

  window.myRadar = new Chart(document.getElementById("canvas_04").getContext("2d")).Radar(radarChartData_04, {
    scaleLineColor: "rgba(182,185,187,1)",
    angleLineColor: "rgba(182,185,187,1)",
    responsive: true,
    pointDot: false,
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 11,
    scaleStartValue: 0,
  });
}
function ChartRadar5() {
  var radarChartData_05 = {
    labels: ["О", "И", "Ш", "А", "+/-", "Штр"],
    datasets: [
      {
        fillColor: "rgba(1,145,237,0.7)",
        strokeColor: "rgba(1,145,237,0)",
        data: [19,20,17,18,14,17],
        additionally: [101,102,103,104,105,106]
      }
    ]
  };

  window.myRadar = new Chart(document.getElementById("canvas_05").getContext("2d")).Radar(radarChartData_05, {
    scaleLineColor: "rgba(182,185,187,1)",
    angleLineColor: "rgba(182,185,187,1)",
    responsive: true,
    pointDot: false,
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 11,
    scaleStartValue: 0,
  });
}

// Custom map
function CustomMap() {
  google.maps.event.addDomListener(window, 'load', init);
  var map;
  function init() {
    var mapOptions = {
        center: new google.maps.LatLng(54.537932,77.889403),
        zoom: 3,
        zoomControl: false,
        disableDoubleClickZoom: false,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: false,
        panControl: false,
        streetViewControl: false,
        draggable : true,
        overviewMapControl: false,
        overviewMapControlOptions: {
          opened: false,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
              "featureType": "administrative",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#2c3941"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#96bdce"
                  },
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#2b3a40"
                  },
                  {
                      "lightness": "-57"
                  },
                  {
                      "gamma": "1.92"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  },
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "gamma": "0.17"
                  },
                  {
                      "color": "#2c3941"
                  }
              ]
          }
        ],
    }
    var mapElement = document.getElementById('s-map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var locations = [
      ['Динамо', 'undefined', 'undefined', 'undefined', 'undefined', 53.90453979999999, 27.561524400000053, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Динамо', 'undefined', 'undefined', 'undefined', 'undefined', 56.9496487, 24.10518639999998, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Йокерит', 'undefined', 'undefined', 'undefined', 'undefined', 60.17332440000001, 24.941024800000037, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Медвешчак', '680013, г. Хабаровск,ул. Дикопольцева, д. 12', '+7 (4242) 52-70-10', 'm@md.ru', 'undefined', 45.8150108, 15.981919000000062, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['СКА', 'undefined', 'undefined', 'undefined', 'undefined', 59.9342802, 30.335098600000038, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Слован', 'undefined', 'undefined', 'undefined', 'undefined', 48.14543414323719, 17.103704072460914, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Спартак', 'undefined', 'undefined', 'undefined', 'undefined', 55.769154168834, 37.596700634765625, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Динамо', 'undefined', 'undefined', 'undefined', 'undefined', 55.740367347065686, 37.636182751464844, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Локомотив', 'undefined', 'undefined', 'undefined', 'undefined', 57.62607440000001, 39.88447080000003, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Северсталь', 'undefined', 'undefined', 'undefined', 'undefined', 59.132333, 37.90918110000007, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Торпедо', 'undefined', 'undefined', 'undefined', 'undefined', 56.2965039, 43.936058900000035, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['ХК сочи', 'undefined', 'undefined', 'undefined', 'undefined', 43.585278, 39.72027800000001, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['ЦСКА', 'undefined', 'undefined', 'undefined', 'undefined', 55.755826, 37.6173, 'https://mapbuildr.com/assets/img/markers/ellipse-blue.png', 'img/ska.png'],['Автомобилист', 'undefined', 'undefined', 'undefined', 'undefined', 56.83892609999999, 60.60570250000001, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Ак Барс', 'undefined', 'undefined', 'undefined', 'undefined', 55.790278, 49.13472200000001, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Лада', 'undefined', 'undefined', 'undefined', 'undefined', 53.5086002, 49.41983440000001, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Металлург', 'undefined', 'undefined', 'undefined', 'undefined', 53.4129429, 59.001623300000006, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Нефтехимик', 'undefined', 'undefined', 'undefined', 'undefined', 55.633333, 51.81666700000005, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Трактор', 'undefined', 'undefined', 'undefined', 'undefined', 55.1644419, 61.43684310000003, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Югра', 'undefined', 'undefined', 'undefined', 'undefined', 61.00909189999999, 69.03745959999992, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['авангард', 'undefined', 'undefined', 'undefined', 'undefined', 54.98333299999999, 73.366667, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Адмирал', 'undefined', 'undefined', 'undefined', 'undefined', 43.133333, 131.89999999999998, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Амур', 'undefined', 'undefined', 'undefined', 'undefined', 48.5027313, 135.06625989999998, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Барыс', 'undefined', 'undefined', 'undefined', 'undefined', 51.16052269999999, 71.4703558, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Металлург', 'undefined', 'undefined', 'undefined', 'undefined', 53.7595935, 87.12157049999996, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Салават Юлаев', 'undefined', 'undefined', 'undefined', 'undefined', 54.7387621, 55.972055400000045, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png'],['Сибирь', 'undefined', 'undefined', 'undefined', 'undefined', 55.00835259999999, 82.93573270000002, 'https://mapbuildr.com/assets/img/markers/ellipse-red.png', 'img/ska.png']
    ];

    for (i = 0; i < locations.length; i++) {
      if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
      if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
      if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
      if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
      if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
      if (locations[i][8] =='undefined'){ imagePath ='';} else { imagePath = locations[i][8];}
      marker = new google.maps.Marker({
          icon: markericon,
          position: new google.maps.LatLng(locations[i][5], locations[i][6]),
          map: map,
          title: locations[i][0],
          desc: description,
          tel: telephone,
          email: email,
          web: web,
          im: imagePath
      });

      if (web.substring(0, 7) != "http://") {
      link = "http://" + web;
      } else {
      link = web;
      }
      bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link, imagePath);
    }

    function bindInfoWindow(marker, map, title, desc, telephone, email, web, link, im) {
      var infoWindowVisible = (function () {
        var currentlyVisible = false;
        return function (visible) {
          if (visible !== undefined) {
              currentlyVisible = visible;
          }
          return currentlyVisible;
        };
      }());


      iw = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {

        setTimeout(function() {
          $('.gm-style-iw').next().html("<span class='gm-window-close'></span>");
          $('.gm-style-iw').next().css({
            top: 24,
            right: 24
          })
        }, 100);

        iw.close();
        var html= "<div style='color:#000;background-color:#fff;padding:0px;width:310px;' class='gm-cover'><div class='gm-window-topbar'><img src='"+im+"' /><h4>"+title+"</h4></div><dl class='gm-window-inner'><dt>Адрес</dt><dd>"+desc+"</dd><dt>Телефон</dt><dd>"+telephone+"</dd><dt>E-mail</dt><dd><a href='mailto:"+email+"' >"+email+"<a></dd><a href='"+link+"'' >"+web+"<a></div>";
        iw = new google.maps.InfoWindow({content:html});
        iw.open(map,marker);

      });

      google.maps.event.addListener(iw, 'closeclick', function () {
          infoWindowVisible(false);
      });
    }
  }
}
