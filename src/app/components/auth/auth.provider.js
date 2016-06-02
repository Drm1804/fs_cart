(function () {
    'use strict';

  angular.module('fs')
    .provider('$auth', $auth);


  function $auth(){
    return{
      $get: function($q, $timeout){
        return{
          isAuthorized: function(){
            var dfd = $q.defer();

            $timeout(function(){
              dfd.resolve();
            });
            return dfd.promise;
          }

        }
      }
    }

  }

})();
