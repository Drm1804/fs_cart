(function () {
    'use strict';


  angular.module('fs')
    .config(config);

  config.$injector = ['$stateProvider', '$cartProvider'];
  function config($stateProvider, $cartProvider ){
    $stateProvider
      .state('auth.cart.result', {
        url: '/success',
        templateUrl: 'app/components/cart/step-result/step-result.html'
      });

  }
})();
