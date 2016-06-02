(function () {
  'use strict';

  angular.module('fs')
    .controller('CartController', cartController);


  cartController.$inject = ['$cart', '$state', '$scope'];

  function cartController($cart, $state, $scope) {

    var vm = this;
    vm.orderData = {};
    vm.steps =[
      {
        name: 'shipping',
        active: true,
        state: 'auth.cart.shipping'
      },
      {
        name: 'billing',
        active: false,
        state: 'auth.cart.billing'
      },
      {
        name: 'payment',
        active: false,
        state: 'auth.cart.payment'
      }
    ];

    vm.getOrderList = getOrderList;
    vm.changeStepsNav = changeStepsNav;


    vm.run = run;
    vm.run();


    // Получаем список покупок
    function getOrderList() {
      $cart.returnOrderList()
        .then(function (resp) {
          vm.ordeData = resp;
        });
    }

    // Перестраиваем меню
    function changeStepsNav(activeState){
       for(var i in vm.steps){
         vm.steps[i].active = true;
        if(vm.steps[i].name === activeState){
          break;
        }
      }
    }

    function run() {

      $scope.$on('cart:change-active-state', function(ev, data){
        vm.changeStepsNav(data)
      });


      vm.getOrderList();
    }
  }
})();
