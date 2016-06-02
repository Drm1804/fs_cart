(function () {
  'use strict';

  angular.module('fs')
    .controller('CartController', cartController);


  cartController.$inject = ['$cart'];

  function cartController($cart) {

    var vm = this;
    vm.ordeData = null;
    vm.stepsBreadcrumbs = null;
    vm.getStepsBreadcrumbs = getStepsBreadcrumbs;
    vm.getOrderList = getOrderList;
    vm.run = run;
    vm.run();






    function getOrderList(){
      $cart.returnOrderList()
        .then(function(resp){
          vm.ordeData = resp;
        });
    }

    function getStepsBreadcrumbs(){
      vm.stepsBreadcrumbs = $cart.returnStepsBreadcrumbsData();
    }

    function run(){
      vm.getStepsBreadcrumbs();
      vm.getOrderList();
    }
  }
})();
