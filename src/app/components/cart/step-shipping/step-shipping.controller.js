(function () {
    'use strict';

  angular.module('fs')
    .controller('ShippingCartController', ShippingCartController);

  ShippingCartController.$inject = ['$state', '$cart'];

  function ShippingCartController($state, $cart){

    var vm = this;
    vm.thisController = 'shipping';
    vm.nextController = null;
    vm.data = {
      recipient:{
        fullName: null,
        daytimePhone: null
      },
      address:{
        street: null,
        addressOther: null,
        city: null,
        country: null,
        zip: null
      }
    };
    vm.run = run;
    vm.run();


    function run(){
    }






    function goToNextStep(){
      $state.go(vm.nextController.state)
    }



  }
})();
