(function(){
  'use strict';


  angular.module('fs')
    .config(config);


  config.$injector = ['$stateProvider'];
  function config($stateProvider){

    $stateProvider
      .state('auth.cart', {
        url: '/cart',
        templateUrl: 'app/components/cart/cart.html'
      })

  }
})();
