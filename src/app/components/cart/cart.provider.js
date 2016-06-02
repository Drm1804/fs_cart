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
      $get: function(){
        return{
          returnStepsBreadcrumbsData: function(){
            return stepsBreadcrumbsData;
          }
        }


      }
    }
  }

})();
