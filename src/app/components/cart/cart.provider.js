(function () {
  'use strict';

  angular.module('fs')
    .provider('$cart', $cart);

  function $cart() {

    return {

      $get: function ($q, $http, $timeout) {
        return {
          setInfoFromUser: function (type, data) {
            // Я сделал этот метод асинхронным, поскольку, возможно, что информация о каждом шаге будет отправляться на сервер
            var dfd = $q.defer();


            switch (type) {
              case('shipping'):
                data.shipping = data;
                $timeout(function () {
                  dfd.resolve()
                });
                break;
              case('billing'):
                data.billing = data;
                $timeout(function () {
                  dfd.resolve()
                });
                break;
              case('payment'):
                data.payment = data;
                $timeout(function () {
                  dfd.resolve()
                });
                break;
              default:
                $timeout(function () {
                  dfd.reject()
                });
                break;
            }

            return dfd.promise;

          },
          getInfoFromUser: function (type) {
            switch (type) {
              case('shipping'):
                return data.shipping;
                break;
              case('billing'):
                return data.billing;
                break;
              case('payment'):
                return data.payment;
                break;
              default:
                return data;
                break;
            }
          }
        }
      }
    }
  }

})();
