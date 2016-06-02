(function () {
  'use strict';

  angular.module('fs')
    .controller('CartController', cartController);


  cartController.$inject = ['$cart', '$state'];

  function cartController($cart, $state) {

    var vm = this;
    vm.orderData = {
      shipping: null,
      billing: null,
      payment: null
    };

    vm.stepsBreadcrumbs = null;
    vm.goTo = goTo;
    vm.run = run;
    vm.run();


    function goTo(state){
      $state.go(state)

    }

    function run(){
      vm.getOrderList();
    }
  }
})();
