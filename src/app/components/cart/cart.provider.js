(function () {
    'use strict';

  angular.module('fs')
    .provider('$cart', $cart);

  function $cart(){
    return{
      $get: function(){

      }
    }
  }

})();
