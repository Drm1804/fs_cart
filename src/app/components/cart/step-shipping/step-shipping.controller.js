(function () {
  'use strict';

  angular.module('fs')
    .controller('ShippingCartController', ShippingCartController);

  ShippingCartController.$inject = ['$state', '$cart', '$scope', 'geolocation', '$geo'];

  function ShippingCartController($state, $cart, $scope, geolocation, $geo) {



    // console.log($window.navigator.geolocation.getCurrentPosition(position))

    var vm = this;
    vm.showTooltip = false;
    vm.thisControllerName = 'shipping';

    // Данные выведены сюда, чтобы проще ориентироваться
    vm.data = {
        fullName: null,
        daytimePhone: null,

        street: null,
        addressOther: null,
        city: null,
        country: null,
        zip: null
    };


    vm.getMyData = getMyData;
    vm.getGeoData = getGeoData;
    vm.goToNextStep = goToNextStep;
    vm.run = run;
    vm.run();

    function goToNextStep(form) {

      // Проверяем форму на валидность
      if (form.$valid) {
        $cart.setStepsData(vm.thisControllerName, vm.data)
          .then(function () {
            $state.go('auth.cart.billing');
          })
      } else {
        vm.showTooltip = true;
      }

    }


    // Запрашиваем у провайдера данные о заполненных пользователем полях
    function getMyData() {
      $cart.getStepsData(vm.thisControllerName)
        .then(function (resp) {
          vm.data = resp || vm.data;
        })
    }


    // Получаем геоданные
    function getGeoData() {
      geolocation.getLocation()
        .then(function (data) {
          $geo.convertGeoInTown(data.coords.longitude, data.coords.latitude)
            .then(function (resp) {
              vm.data.address = null;
              vm.data.country = resp.response.GeoObjectCollection.featureMember[0].GeoObject.description;
              vm.data.city = resp.response.GeoObjectCollection.featureMember[0].GeoObject.name;
            })
        });
    }

    function run() {
      vm.getMyData();

      // Говорим, что теперь этот этейт активен
      $scope.$emit('cart:change-active-state', vm.thisControllerName);

    }


  }
})();
