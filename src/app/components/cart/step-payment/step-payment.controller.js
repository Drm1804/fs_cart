(function () {
    'use strict';

  angular.module('fs')
    .controller('PaymentCartController', PaymentCartController);


  PaymentCartController.$inject = ['$scope', '$cart', '$state', 'cardValidator'];

  function PaymentCartController($scope, $cart, $state, cardValidator){
    var vm = this;
    vm.thisControllerName = 'payment';


    // Данные выведены сюда, чтобы проще ориентироваться
    vm.data = {
      card: null,
      cardUrlLogo: null
    };
    vm.getMyData = getMyData;
    vm.changeCard = changeCard;
    vm.goToNextStep = goToNextStep;
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

    function goToNextStep(){
      $cart.setStepsData(vm.thisControllerName, vm.data)
        .then(function(){
          $state.go('auth.cart.result');
        })
    }

    function changeCard(){
      vm.data.cardUrlLogo = cardValidator.returnLogoCard(vm.data.card);
      console.log(vm.data.cardUrlLogo);
    }

    function run() {
      vm.getMyData();
      // Говорим, что теперь этот этейт активен
      $scope.$emit('cart:change-active-state', vm.thisControllerName);

    }
  }

})();
