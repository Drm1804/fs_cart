'use strict';

angular.module('fs')
  .provider('$geo', $geo);


$geo.$inject = [];

function $geo() {
  return {
    $get: function ($q, $http) {
      return {
        convertGeoInTown: function (long, lat) {
          var dfd = $q.defer();

          $http.get('https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&kind=locality&geocode=' + long + ',' + lat)
            .then(function(resp){
              dfd.resolve(resp.data)

            });

          return dfd.promise;

        }
      }

    }
  }
}
