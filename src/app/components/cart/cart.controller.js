(function () {
  'use strict';

  angular.module('fs')
    .controller('CartController', cartController);


  cartController.$inject = ['$cart', '$scope'];

  function cartController($cart, $scope) {

    var vm = this;
    vm.orderData = {};
    vm.cover = false;
    vm.steps =[
      {
        name: 'shipping',
        active: true,
        show: true,
        state: 'auth.cart.shipping'
      },
      {
        name: 'billing',
        active: false,
        show: true,
        state: 'auth.cart.billing'
      },
      {
        name: 'payment',
        active: false,
        show: true,
        state: 'auth.cart.payment'
      },
      {
        name: 'success',
        active: false,
        show: false,
        state: 'auth.cart.result'
      }
    ];

    vm.getOrderList = getOrderList;
    vm.changeStepsNav = changeStepsNav;


    vm.run = run;
    vm.run();

    $scope.$on('cart:change-active-state', function(ev, data){
      console.log(data)
      if(data === 'success'){
        vm.cover = true;
      }

    });


    // Получаем список покупок
    function getOrderList() {
      $cart.returnOrderList()
        .then(function (resp) {
          vm.ordeData = resp;
          $scope.$emit('cart:change',resp);
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
