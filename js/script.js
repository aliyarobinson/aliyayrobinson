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

    isMobile: function(){
        var maxWidth = 768
          , iPadDevice = null != navigator.userAgent.match(/iPad/i);
        return $(window).width() < maxWidth || iPadDevice ? !0 : !1
    },

    scrollTop: function(e){
      $('html,body').animate({                                                             
        scrollTop: $('html,body').offset().top
      }, 500);
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
          


      /**************************************/
      /*   Window Scroll
      /***************************************************/
      $(window).scroll(function() {
        
        var yPos = -($(window).scrollTop()); 

        if(AYR.isMobile() === false) {
          if(yPos <= -100 ){
          $('.site-header').addClass('small');
          }else{
            $('.site-header').removeClass('small');
          }
        }
        
      });



      /**************************************/
      /*   Window Load
      /***************************************************/
      window.onload = window.onpopstate = function (e) {
        AYR.scrollTop();
        AYR.updateCurrPage();
        if(AYR.currPageName === "resume"){
          AYR.growSkills();
        }

        // if(isMobile() === true) {
        //   $('.site-header').addClass('small');
        // }

      }



      /**************************************/
      /*   Window Resize
      /***************************************************/
      $( window ).resize(function() {
        if(AYR.isMobile()) {
          $('.site-header').removeClass('small');
        }
      });



      /**************************************/
      /*   History.popstate
      /***************************************************/
      window.onpopstate = function (e) {
        console.log('*****************onpopstate/onload triggered*********************');
        AYR.updateCurrPage();
        console.log('thisPageName: ', AYR.currPageName); 
        AYR.pageLocation.notifyObservers(AYR.currPageName);
      }


      /**************************************/
      /*   Navigation link click
      /***************************************************/
      $(document).on( AYR.clickHandler , '.site-nav a, .logo-wrapper a, .project .cta-btn, .btn.back', function(e) { 
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
          // AYR.pageState[thisPage]();
          AYR.pageState.innerPage(thisPage);

        }
      });



      /**************************************/
      /*   Mobile Navigation Trigger
      /***************************************************/
      $(document).on( AYR.clickHandler , '.menu-btn', function(e) { 
        $(this).toggleClass('active');
        $('.site-nav').toggleClass('active');
        $('.site-header').toggleClass('mobile-active');
      });
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
        // AYR.pageState[page]();
        AYR.pageState.innerPage(page);
      },
      // home: function() {
      //   console.log('home state notified');
      //   document.querySelector('body').classList.add('home-page');
      //   AYR.transitionContent('index');
      //   AYR.homeAnim();
      // },
      // projects: function() {
      //   console.log('projects state notified');
      //   document.querySelector('body').classList.add('projects-page');
      //   AYR.transitionContent('projects');
      // },
      // resume: function() {
      //   console.log('resume state notified');
      //   document.querySelector('body').classList.add('resume-page');
      //   AYR.transitionContent('resume');
      // },
      // contact: function() {
      //   console.log('contact state notified');
      //   document.querySelector('body').classList.add('contact-page');
      //   AYR.transitionContent('contact');
      // },
      innerPage: function(pName){
        document.querySelector('body').classList.add( pName + '-page');
        AYR.transitionContent(pName);
        if(pName === "home"){
          AYR.homeAnim();
        }
      }
    },

    growSkills: function() {
      var skillsArr = [];
      $( ".skill" ).each(function( index ) {
        console.log( index + ": " + $( this ).data('rating') );
        skillsArr.push($( this ).data('rating'));
      });
      d3.selectAll(".skill")
      .data(skillsArr)
      .style("font-size", "0px")
      .transition(5000)
      .delay(function(d, i) {
          return i * 100;
      })
      .style("font-size", function(d) { return d * 2.5  + "px"; });
    },

    updateCurrPage: function() {
      var thisPage = location.href.split('/')[location.href.split('/').length -1 ];
      AYR.currPageName = thisPageName = thisPage.replace('.html','');
    },

    transitionContent: function(page){
      console.log('*****************transitionContent*********************');
      AYR.updateCurrPage();
      AYR.currPageName = page;
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
      $('.content-wrapper').hide();
      $('#content-holder').innerHTML = "";
      $( "#content-holder" ).load( page + ".html .content-wrapper", function(){
        console.log('page name after content load: ', AYR.currPageName);
        if(AYR.currPageName === "resume"){
          AYR.growSkills();
        }
        AYR.scrollTop();
      });
    }
  };
})(jQuery); // end SEF

AYR.init();