(function () {
  'use strict';

  angular.module('fs')
    .provider('$cart', $cart);

  function $cart() {
    var stepsData = [];

    return {
      registrationStepBreadcrumbs: function (step) {
        var newElementStep = {
          'title': 'item',
          'state': '',
          'order': Number.MAX_SAFE_INTEGER
        };
        if (step instanceof Object) {
          angular.extend(newElementStep, step);
          stepsData.push(step)
        }
      },
      $get: function ($q, $http, $timeout) {
        return {
          returnStepsBreadcrumbsData: function () {
            return stepsData;
          },

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
          setInfoFromUser: function (state, data) {
            // Я сделал этот метод асинхронным, поскольку, возможно, что информация о каждом шаге будет отправляться на сервер
            var dfd = $q.defer();

            // Переменная с ответом конроллеру
            var resp = {
              first: true
            };


            for (var i in stepsData) {
              if (state === stepsData[i].state) {

                // Проверям, были ли данные у этого шага, если были, то в ответе сообщим об этом конроллеру
                if(stepsData[i].data){
                  resp.first = false
                }
                stepsData[i].data = data;
                $timeout(function () {
                  dfd.resolve(resp)
                });
                break;
              }
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
