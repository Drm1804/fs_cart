(function () {
    'use strict';

  angular.module('fs')
    .config(config);

  config.$injector = ['$stateProvider', '$cartProvider'];
  function config($stateProvider, $cartProvider ){
    $stateProvider
      .state('auth.cart.billing', {
        url: '/billing',
        templateUrl: 'app/components/cart/step-billing/step-billing.html'
      });

    $cartProvider
      .registrationStepBreadcrumbs({
        title:'Billing',
        state:'auth.cart.billing',
        order:'10'
      })
  }
})();
