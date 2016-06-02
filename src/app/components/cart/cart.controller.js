(function () {
  'use strict';

  angular.module('fs')
    .controller('CartController', cartController);


  cartController.$inject = ['$mdToast'];

  function cartController($mdToast) {

    var vm = this;
    vm.urlInput = 'test.html';
    vm.arrMeta = [];


  }
})();
