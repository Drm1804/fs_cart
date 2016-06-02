(function () {
  'use strict';

  angular.module('fs')
    .controller('ShippingCartController', ShippingCartController);

  ShippingCartController.$inject = ['$state', '$cart', '$scope'];

  function ShippingCartController($state, $cart, $scope) {


    var vm = this;
    vm.thisControllerName = 'shipping';

    // Данные выведены сюда, чтобы проще ориентироваться
    vm.data = {
      recipient: {
        fullName: null,
        daytimePhone: null
      },
      address: {
        street: null,
        addressOther: null,
        city: null,
        country: null,
        zip: null
      }
    };


    vm.getMyData = getMyData;
    vm.goToNextStep = goToNextStep;
    vm.run = run;
    vm.run();

    function goToNextStep(){
      $cart.setStepsData(vm.thisControllerName, vm.data)
      .then(function(){
        $state.go('auth.cart.billing');
      })
    }


    // Запрашиваем у провайдера данные о заполненных пользователем полях
    function getMyData() {
      $cart.getStepsData(vm.thisControllerName)
        .then(function (resp) {
          vm.data = resp || vm.data;
        })
    }

    function run() {
      vm.getMyData();
      // Говорим, что теперь этот этейт активен
      $scope.$emit('cart:change-active-state', vm.thisControllerName);

    }


  }
})();
