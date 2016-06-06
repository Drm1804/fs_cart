(function () {
  'use strict';

  angular.module('fs')
    .controller('ShippingCartController', ShippingCartController);

  ShippingCartController.$inject = ['$state', '$cart', '$scope', 'geolocation'];

  function ShippingCartController($state, $cart, $scope, geolocation) {

    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });

    // console.log($window.navigator.geolocation.getCurrentPosition(position))

    var vm = this;
    vm.showTooltip = false;
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

    function goToNextStep(form) {

      console.log(form)

      // Проверяем форму на валидность
      if (form.$valid) {
        $cart.setStepsData(vm.thisControllerName, vm.data)
          .then(function () {
            $state.go('auth.cart.billing');
          })
      } else {
        vm.showTooltip = true;
      }

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
