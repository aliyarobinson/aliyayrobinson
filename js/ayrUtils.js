  /**************************************/
  /*   Helper Functions for AYR Projects
  /***************************************************/

var ayrApi = (function  () {

  var api = {};

  api.isHome = function( page ){
      if(page === '' || page === null || page === 'index'){
        console.log('isHome - page: ', page);
        return true;
      }
      console.log('isHome - not home: ');
  };

  api.isMobile = function(){
      var maxWidth = 768
        , iPadDevice = null != navigator.userAgent.match(/iPad/i)
        , w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return w < maxWidth || iPadDevice ? !0 : !1
  };

  api.toTop = function(e){
    document.querySelector('body').scrollTop = 0;
  };

  api.hasClass = function(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
  };

  api.insertAfter = function(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  };

  api.getAjax = function(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
  };

  api.getClosest = function ( elem, selector ) {

      // Variables
      var firstChar = selector.charAt(0);
      var supports = 'classList' in document.documentElement;
      var attribute, value;

      // If selector is a data attribute, split attribute from value
      if ( firstChar === '[' ) {
          selector = selector.substr( 1, selector.length - 2 );
          attribute = selector.split( '=' );

          if ( attribute.length > 1 ) {
              value = true;
              attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
          }
      }

      // Get closest match
      for ( ; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode ) {

          // If selector is a class
          if ( firstChar === '.' ) {
              if ( supports ) {
                  if ( elem.classList.contains( selector.substr(1) ) ) {
                      return elem;
                  }
              } else {
                  if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
                      return elem;
                  }
              }
          }

          // If selector is an ID
          if ( firstChar === '#' ) {
              if ( elem.id === selector.substr(1) ) {
                  return elem;
              }
          }

          // If selector is a data attribute
          if ( firstChar === '[' ) {
              if ( elem.hasAttribute( attribute[0] ) ) {
                  if ( value ) {
                      if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
                          return elem;
                      }
                  } else {
                      return elem;
                  }
              }
          }

          // If selector is a tag
          if ( elem.tagName.toLowerCase() === selector ) {
              return elem;
          }

      }

      return null;
  };

  return api;

})();