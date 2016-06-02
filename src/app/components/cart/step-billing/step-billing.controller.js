(function () {
  'use strict';

  angular.module('fs')
    .controller('BillingCartController', BillingCartController);

  BillingCartController.$inject = ['$scope', '$cart', '$state'];
  function BillingCartController($scope, $cart, $state){
    var vm = this;
    vm.thisControllerName = 'billing';

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
          $state.go('auth.cart.payment');
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
