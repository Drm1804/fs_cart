(function () {
    'use strict';

  angular.module('fs')
    .controller('PaymentCartController', PaymentCartController);


  PaymentCartController.$inject = ['$scope', '$cart'];

  function PaymentCartController($scope, $cart){
    var vm = this;
    vm.thisControllerName = 'payment';

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
    vm.run = run;
    vm.run();


    // Запрашиваем у провайдера данные о заполненных пользователем полях
    function getMyData() {
      $cart.getStepsData(vm.thisControllerName)
        .then(function (resp) {
          vm.data = resp || vm.data;
        });

      // На этом момоенте можно проверить, если информация о введенных данных и отправить пользователя на послеюнюю заполненную страницу
    }

    function run() {
      vm.getMyData();
      // Говорим, что теперь этот этейт активен
      $scope.$emit('cart:change-active-state', vm.thisControllerName);

    }
  }

})();
