(function () {
  'use strict';

  angular.module('fs')
    .config(config);

  config.$injector = ['$stateProvider', '$cartProvider'];
  function config($stateProvider, $cartProvider ){
    $stateProvider
      .state('auth.cart.payment', {
        url: '/payment',
        templateUrl: 'app/components/cart/step-payment/step-payment.html'
      });

  }
})();
