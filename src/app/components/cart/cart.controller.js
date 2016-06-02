(function () {
  'use strict';

  angular.module('fs')
    .controller('CartController', cartController);


  cartController.$inject = ['$cart'];

  function cartController($cart) {

    var vm = this;
    vm.stepsBreadcrumbs = null;
    vm.getStepsBreadcrumbs = getStepsBreadcrumbs;
    vm.run = run;
    vm.run();







    function getStepsBreadcrumbs(){
      vm.stepsBreadcrumbs = $cart.returnStepsBreadcrumbsData();
      console.log( vm.stepsBreadcrumbs)


    }

    function run(){
      vm.getStepsBreadcrumbs();
    }
  }
})();
