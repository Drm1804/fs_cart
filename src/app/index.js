(function(){
  'use strict';

  angular.module('fs', ['ui.router', 'ngMaterial'])
    .config(config);



  config.$ingect = ['$urlRouterProvider', '$stateProvider'];

  function config($urlRouterProvider, $stateProvider){

    $urlRouterProvider.otherwise('/cart/shipping');

    $stateProvider
      .state('auth', {
        abstract: true,
        template: '<div ui-view=""></div>',
        resolve: {

          // Закладываем авторизацию

          auth: function ($q, $auth, $rootScope, $state) {

            var dfd = $q.defer();
            $auth.isAuthorized()
              .then(
              function () {
                dfd.resolve();
              },
              function () {
                $state.go('login');
              });

            return dfd.promise;
          }
        }
      });

  }


})();
