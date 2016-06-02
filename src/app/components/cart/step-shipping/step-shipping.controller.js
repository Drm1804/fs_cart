(function () {
    'use strict';

  angular.module('fs')
    .controller('ShippingCartController', ShippingCartController);

  ShippingCartController.$inject = ['$state', '$cart', '$scope'];

  function ShippingCartController($state, $cart, $scope){



    var vm = this;
    vm.thisController = $state.current.name;
    vm.nextController = null;

    // Данные выведены сюда, чтобы проще ориентироваться
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

    vm.goToNextStep = goToNextStep;
    vm.run = run;
    vm.run();


    function goToNextStep(){
      $cart.setInfoFromUser(vm.thisController, vm.data)
      .then(function(resp){

        // Если даныне были отправлены в первый раз
        if(resp.first){
          $scope.$emit('cart:next-new-step')
        }else{

          // Если данные отправлены повторно
          $scope.$emit('cart:next-step')
        }
      })
    }

    function run(){
    }





  }
})();
