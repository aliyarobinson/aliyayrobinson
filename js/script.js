// "use strict"; 

var AYR = AYR || {};

(function($){


  AYR = {
    currPageName:"",
    homeState: false,
    clickHandler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),
    isHome: function( page ){
      if(page === '' || page === null || page === 'index'){
        return true;
      }
    },
    homeAnim: function() {
      /**************************************/
      /*   Home Intro Image Animation
      /***************************************************/
      
    },
    menuBtn: {
        observers: [],
        registerObserver: function(observer){
          this.observers.push(observer);
        },
        notifyObservers: function(){
          for(var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify();
          }
        }
    },
    siteNav: {
      notify: function() {
        console.log('site nav notified');
        if($('.site-nav').hasClass('expanded')){
          AYR.siteNav['slideOut']();
        } else {
          AYR.siteNav['slideIn']();
        }
      }
    },
    pageLocation: {
      observers: [],
      registerObserver: function(observer){
        this.observers.push(observer);
      },
      notifyObservers: function(page){
        var thisPage = page;
        for(var i = 0; i < this.observers.length; i++) {
          this.observers[i].notify(thisPage);
        }
      }
    },
    pageState: {
      notify: function(page) {
        console.log('page nofify - ishome: ', AYR.isHome(page));
        if(AYR.isHome(page)){
          page = 'home';
        }
        console.log('pageContent notified - page: ', page);
        AYR.pageState[page]();
      },
      home: function() {
        console.log('home state notified');
        document.querySelector('body').classList.add('home-page');
        AYR.transitionContent('index');
        AYR.homeAnim();
      },
      projects: function() {
        console.log('projects state notified');
        document.querySelector('body').classList.add('projects-page');
        AYR.transitionContent('projects');
      },
      resume: function() {
        console.log('resume state notified');
        document.querySelector('body').classList.add('resume-page');
        AYR.transitionContent('resume');
      },
      contact: function() {
        console.log('contact state notified');
        document.querySelector('body').classList.add('contact-page');
        AYR.transitionContent('contact');
      }
    },
    transitionContent: function(page){
        console.log('*****************transitionContent*********************');

        console.log('transitionContent - name: ', AYR.currPageName);
        // AYR.imagesLoaded();
        // if (AYR.imagesLoaded){
        //   if(page === 'index'){
        //     // $('.loader').addClass('collapsed');
        //     AYR.homeAnim();
        //   }
        // }
        // $('.content-container').hide(600);
        $('.content-container').addClass('collapsed');
        $( "#content-holder" ).load( page + ".html .content-wrapper" );

        // $('body').attr('class', '').addClass(page + '-page');

        // $('#content-holder').animate({
        //   opacity: 1
        // },600);
    },
    init: function () {
      console.log('init');

      AYR.menuBtn.registerObserver(AYR.siteNav);
      AYR.pageLocation.registerObserver(AYR.pageState);

      var $loading = $('.loader').hide();
      $(document)
        .ajaxStart(function () {
          $loading.show();
        })
        .ajaxStop(function () {
          $loading.hide();
        });
          
      $(window).scroll(function() {
        
        var yPos = -($(window).scrollTop()); 

        if(yPos <= -100 ){
          $('.site-header').addClass('small');
        }else{
          $('.site-header').removeClass('small');
        }
      });

      /**************************************/
      /*   History.popstate
      /***************************************************/
      // window.onload = window.onpopstate = function (e) {
      window.onpopstate = function (e) {
        console.log('*****************onpopstate/onload triggered*********************');
        var thisPage = location.href.split('/')[location.href.split('/').length -1 ];
        var thisPageName = thisPage.replace('.html','');
        console.log('thisPageName: ', thisPageName); 
        AYR.pageLocation.notifyObservers(thisPageName);
      }

      /**************************************/
      /*   Navigation link click
      /***************************************************/
      $(document).on( AYR.clickHandler , '.site-nav a, .logo-wrapper a', function(e) { 
        e.preventDefault();
        // e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('*****************nav click*********************');

        if( History ) {
          console.log('history!');

          var href = ($(this).attr('href')) ? $(this).attr('href') : $(this).attr('xlink:href');
          var thisPage = href.replace('.html','');
          if(AYR.isHome(thisPage)){
            thisPage = 'home';
          }
          console.log('nav click - thisPage: ', thisPage); 
          history.pushState(null, null, href);
          AYR.pageState[thisPage]();

        }
      });

    }
  };
})(jQuery); // end SEF

AYR.init();