// "use strict"; 

<<<<<<< HEAD
var AYR = AYR || {};
=======
var HR = HR || {};
>>>>>>> d349d8f5b9310c02855f58d40dcd44ee08b2bc62

(function($){


<<<<<<< HEAD
  AYR = {
    currPageName:"",
    homeState: false,
    clickHandler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),

=======
  HR = {
    currPageName:"",
    homeState: false,
    pageAreaElem: $('html'),
    sideNavElem: $('.site-nav'),
    siteNavBtnElem: $('.site-nav-btn'), 
    siteNavLinkElem: $('.list-nav a'), 
    clickHandler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),
>>>>>>> d349d8f5b9310c02855f58d40dcd44ee08b2bc62
    isHome: function( page ){
      if(page === '' || page === null || page === 'index'){
        return true;
      }
    },
<<<<<<< HEAD

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
=======
    homeAnim: function() {
      /**************************************/
      /*   Home Intro Image Animation
      /***************************************************/
      var img_counter = 6;
      var curr_img = $('.lg-logo image');
      var imgInterval = setInterval(function(){ 
        animateImgs();
        if (img_counter === 0){
          clearInterval(imgInterval);
        }
      }, 600);

      function animateImgs(){
        img_counter--;
        console.log("counter: ", img_counter); 
        $img = $('.lg-logo image');
        $img.eq(img_counter).animate({
          'opacity':0
        },300);
        // curr_img.attr('xlink:href', '../intro_imgs/img_'+img_counter+'.jpg' );
      }
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
    sideNav: {
      notify: function() {
        console.log('site nav notified');
        if($('.site-nav').hasClass('expanded')){
          HR.sideNav['slideOut']();
        } else {
          HR.sideNav['slideIn']();
        }
      },
      pageAreaNotify: function(dir){
        console.log('pageAreaNotify - dir:', dir);
        if(dir === -1){
          console.log('dir false');
          HR.sideNav['slideOut']();
        }else{
          console.log('dir not false');
        }
      },
      slideOut: function() {
        console.log('slide out');
        $('.site-nav-btn').removeClass('active');
        $('#content-holder a').css({'pointer-events':'auto'});
        $('.site-nav-bkgd').css({'z-index':20});
        $('.site-header').css({'z-index':20});
        $('.list-nav').css({'z-index':20});
        $('.list-nav li a').css({'z-index':20});

        $('.site-nav').velocity({
            'margin-left': '-320px'
          },600);
          $('.site-nav-bkgd').velocity({
            'left': '-150%',
            'opacity': 0
          },600);
        $('.site-nav').removeClass('expanded');
      },
      slideIn: function() {
        console.log('slide in');
        $('.site-nav-btn').addClass('active');
        $('#content-holder a').css({'pointer-events':'none'});

        $('.site-nav').velocity({
            'margin-left':0
          },600);
          $('.site-nav-bkgd').velocity({
            'left': '-50%',
            'opacity': 1
          },600);
        $('.site-nav').addClass('expanded');
      }
    },
    pageArea: {
      observers: [],
      registerObserver: function(observer){
        this.observers.push(observer);
      },
      notifyObservers: function(dir){
        for(var i = 0; i < this.observers.length; i++) {
          this.observers[i].pageAreaNotify(dir);
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
        console.log('page nofify - ishome: ', HR.isHome(page));
        if(HR.isHome(page)){
          page = 'home';
        }
        console.log('pageContent notified - page: ', page);
        HR.pageState[page]();
      },
      home: function() {
        console.log('home state notified');
        document.querySelector('body').classList.add('home-page');
        HR.transitionContent('index');
        HR.homeAnim();
      },
      bio: function() {
        console.log('bio state notified');
        document.querySelector('body').classList.add('bio-page');
        HR.transitionContent('bio');
      },
      works: function() {
        console.log('works state notified');
        document.querySelector('body').classList.add('works-page');
        HR.transitionContent('works');
      },
      services: function() {
        console.log('services state notified');
        document.querySelector('body').classList.add('services-page');
        HR.transitionContent('services');
      },
      contact: function() {
        console.log('contact state notified');
        document.querySelector('body').classList.add('contact-page');
        HR.transitionContent('contact');
      }
    },
    transitionContent: function(page){
        console.log('*****************transitionContent*********************');

        console.log('transitionContent - name: ', HR.currPageName);
        // HR.imagesLoaded();
        // if (HR.imagesLoaded){
        //   if(page === 'index'){
        //     // $('.loader').addClass('collapsed');
        //     HR.homeAnim();
        //   }
        // }
          
        $( "#content-holder" ).load( page + ".html .content-container section" );

        // $('body').attr('class', '').addClass(page + '-page');

        // $('#content-holder').animate({
        //   opacity: 1
        // },600);
    },
    init: function () {
      console.log('init');

      HR.menuBtn.registerObserver(HR.sideNav);
      HR.pageLocation.registerObserver(HR.pageState);
      HR.pageArea.registerObserver(HR.sideNav);
>>>>>>> d349d8f5b9310c02855f58d40dcd44ee08b2bc62

      var $loading = $('.loader').hide();
      $(document)
        .ajaxStart(function () {
          $loading.show();
        })
        .ajaxStop(function () {
          $loading.hide();
        });
<<<<<<< HEAD
          


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
=======
            

      
      /**************************************/
      /*   Video Click image swap
      /***************************************************/
      $(document).on( HR.clickHandler, '.video', function() { 
        console.log('video !!!'); 
      });

      /**************************************/
      /*   History.popstate
      /***************************************************/
      window.onload = window.onpopstate = function (e) {
        console.log('*****************onpopstate/onload triggered*********************');
        var thisPage = location.href.split('/')[location.href.split('/').length -1 ];
        var thisPageName = thisPage.replace('.html','');
        console.log('thisPageName: ', thisPageName); 
        HR.pageLocation.notifyObservers(thisPageName);
      }

      /**************************************/
      /*   Navigation link click
      /***************************************************/
      $(document).on( HR.clickHandler , '.site-nav .list-nav a, .logo', function(e) { 
>>>>>>> d349d8f5b9310c02855f58d40dcd44ee08b2bc62
        e.preventDefault();
        // e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('*****************nav click*********************');

        if( History ) {
          console.log('history!');

          var href = ($(this).attr('href')) ? $(this).attr('href') : $(this).attr('xlink:href');
          var thisPage = href.replace('.html','');
<<<<<<< HEAD
          if(AYR.isHome(thisPage)){
=======
          if(HR.isHome(thisPage)){
>>>>>>> d349d8f5b9310c02855f58d40dcd44ee08b2bc62
            thisPage = 'home';
          }
          console.log('nav click - thisPage: ', thisPage); 
          history.pushState(null, null, href);
<<<<<<< HEAD
          // AYR.pageState[thisPage]();
          AYR.pageState.innerPage(thisPage);
=======
          HR.pageState[thisPage]();
>>>>>>> d349d8f5b9310c02855f58d40dcd44ee08b2bc62

        }
      });


<<<<<<< HEAD

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
=======
      // $('.content-wrapper .wrapper *').not(".site-nav").on('click', function(e) {
      //   console.log('html click'); 
      //   var dir;

      //   if(HR.sideNavElem.hasClass('expanded')){
      //     dir = -1;
      //   }else {
      //     dir = 1;
      //   }
      //   console.log('dir: ',dir); 
      //   HR.pageArea.notifyObservers(dir);
      // });

      // HR.sideNavElem.on('click', function(e) {
      //   e.stopPropagation();
      // });

      // HR.siteNavLinkElem.on('click', function(e) {
      //   console.log('nav btn click - target: ', e.target);
      //   console.log('nav btn click - current target: ', e.currentTarget);
      //   // e.stopPropagation();
      // });

      // HR.siteNavBtnElem.on('click', function(e) {
      //   console.log('menu btn click - target: ', e.target);
      //   console.log('menu btn click - current target: ', e.currentTarget);
      //   e.stopPropagation();
      // });



      /**************************************/
      /*   Remove/Add outline on a/button click
      /***************************************************/
      $("body").on("mousedown", "*", function(e) {
        if (($(this).is(":focus") || $(this).is(e.target)) && $(this).css("outline-style") == "none") {
            $(this).css("outline", "none").on("blur", function() {
                $(this).off("blur").css("outline", "");
            });
        }
      });

      /**************************************/
      /*   Site Nav button animation on click
      /***************************************************/
      $('.site-nav-btn').on( HR.clickHandler , function(){
        console.log('nav menu btn clicked - ', HR.clickHandler);
        HR.menuBtn.notifyObservers();
      }); // end on click .site-nav-btn
>>>>>>> d349d8f5b9310c02855f58d40dcd44ee08b2bc62
    }
  };
})(jQuery); // end SEF

<<<<<<< HEAD
AYR.init();
=======
HR.init();
>>>>>>> d349d8f5b9310c02855f58d40dcd44ee08b2bc62
