(function () {
  'use strict';

  angular.module('fs')
    .config(config);

  config.$injector = ['$stateProvider', '$cartProvider'];
  function config($stateProvider, $cartProvider ){
    $stateProvider
      .state('auth.cart.shipping', {
        url: '/shipping',
        templateUrl: 'app/components/cart/step-shipping/step-shipping.html'
      });

    $cartProvider
      .registrationStepBreadcrumbs({
        title:'Shipping',
        state:'auth.cart.shipping',
        step:'0'
      })
  }
})();
