(function () {
  'use strict';

  angular.module('fs')
    .provider('$cart', $cart);

  function $cart() {
    var data = {
      shipping: null,
      billing: null,
      payment: null
    };


    return {
      $get: function ($q, $http, $timeout) {
        return {
          returnOrderList: function () {
            var dfd = $q.defer();

            $http.get('order.json')
              .then(
                function (resp) {
                  dfd.resolve(resp.data);
                },
                function (resp) {
                  dfd.reject(resp);
                }
              );

            return dfd.promise;
          },

          // Методы setStepsData и getStepsData я сделал асинхронными, чтобы в дальнейшем реализовать хранение промежуточных значений на сервере
          setStepsData: function (type, _data_) {

            var dfd = $q.defer();

            $timeout(function() {
              switch (type) {
                case('shipping'):
                  data.shipping = _data_;
                  break;
                case('billing'):
                  data.billing = _data_;
                  break;
                case('payment'):
                  data.payment = _data_;
                  break;
              }
              dfd.resolve();
            });

            return dfd.promise;

          },
          getStepsData: function (type) {
            var dfd = $q.defer();

            var resp = null;
            $timeout(function(){
              switch (type) {
                case('shipping'):
                  resp =  data.shipping;
                  break;
                case('billing'):
                  resp =  data.billing;
                  break;
                case('payment'):
                  resp =  data.payment;
                  break;
                default:
                  resp =  data;
                  break;
              }

              dfd.resolve(resp);
            });


            return dfd.promise;
          }
        }
      }
    }
  }

})();
