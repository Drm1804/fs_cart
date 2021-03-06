(function () {
    'use strict';

  angular.module('fs')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$rootScope', '$cart'];

  function NavbarController($rootScope, $cart){
    var vm = this;
    vm.ordeData = null;
    vm.getOrderList = getOrderList;
    vm.run = run;
    vm.run();

    // Подписываемся на события
    $rootScope.$on('cart:change', function(ev, data){
      vm.ordeData = data;
    });

    $rootScope.$on('cart:change-active-state', function(ev, data){
      if(data === 'success'){
        vm.ordeData = null;
      }

    });

    // Получаем список покупок в первый раз
    function getOrderList() {
      $cart.returnOrderList()
        .then(function (resp) {
          vm.ordeData = resp;
        });
    }

    function run(){
      vm.getOrderList()
    }
  }

})();
