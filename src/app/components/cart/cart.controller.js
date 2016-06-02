(function () {
  'use strict';

  angular.module('fs')
    .controller('CartController', cartController);


  cartController.$inject = ['$cart', '$state', '$scope'];

  function cartController($cart, $state, $scope) {

    var vm = this;
    vm.activeStep = 0;
    vm.orderData = {
      shipping: null,
      billing: null,
      payment: null
    };
    vm.stepsData = null;
    vm.getOrderList = getOrderList;
    vm.changeActiveStep = changeActiveStep;
    vm.getStepsBreadcrumbs = getStepsBreadcrumbs;
    vm.goTo = goTo;
    vm.run = run;
    vm.run();

    // Переходим на следующий шаг
    $scope.$on('cart:next-step', function () {
      vm.changeActiveStep();
      vm.goTo()
    });

    // Переходим на следующий шаг впервый раз
    $scope.$on('cart:next-new-step', function () {
      vm.activeStep = vm.activeStep+ 1;
      vm.changeActiveStep();
      vm.goTo()
    });


    // Меняем активность шагов в меню
    function changeActiveStep() {
      for (var i in vm.stepsData) {
        if (vm.activeStep >= parseInt(vm.stepsData[i].step)) {
          vm.stepsData[i].active = true;
        } else {
          vm.stepsData[i].active = false;
        }
      }
    }

    function getOrderList() {
      $cart.returnOrderList()
        .then(function (resp) {
          vm.ordeData = resp;
        });
    }

    function goTo() {
      var state = null;
      for(var i in vm.stepsData){
        if(parseInt(vm.stepsData[i].step) === vm.activeStep){
          state = vm.stepsData[i].state;
          break;
        }

      }
      $state.go(state)
    }

    function getStepsBreadcrumbs() {
      vm.stepsData = $cart.returnStepsBreadcrumbsData();
    }

    function run() {
      vm.getStepsBreadcrumbs();
      vm.changeActiveStep();
      vm.getOrderList();
    }
  }
})();
