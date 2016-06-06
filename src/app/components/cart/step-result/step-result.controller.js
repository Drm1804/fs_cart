(function () {
    'use strict';

  angular.module('fs')
    .controller('SuccessCartController', SuccessCartController);


  SuccessCartController.$inject = ['$scope'];

  function SuccessCartController($scope){
    var vm = this;
    vm.thisControllerName = 'success';
    vm.run = run;
    run();

    function run(){
      $scope.$emit('cart:change-active-state', vm.thisControllerName);
    }
  }

})();
