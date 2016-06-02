(function () {
    'use strict';

  angular.module('fs')
    .provider('$cart', $cart);

  function $cart(){

    var stepsBreadcrumbsData = [];
    return{
      registrationStepBreadcrumbs: function(step){
        var newElementStep = {
          'title': 'item',
          'state': '',
          'order': Number.MAX_SAFE_INTEGER
        };
        if (step instanceof Object) {
          angular.extend(newElementStep, step);
          stepsBreadcrumbsData.push(step)
        }
      },
      $get: function($q, $http){
        return{
          returnStepsBreadcrumbsData: function(){
            return stepsBreadcrumbsData;
          },
          returnOrderList: function(){
            var dfd = $q.defer();

            $http.get('order.json')
              .then(
              function(resp){
                dfd.resolve(resp.data);
              },
              function(resp){
                dfd.reject(resp);
              }
            );

            return dfd.promise;
          }
        }


      }
    }
  }

})();
