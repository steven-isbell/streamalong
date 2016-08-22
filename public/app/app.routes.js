angular.module('streamalong')
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

          $stateProvider
            .state('landing page', {
              url: '/',
              templateUrl: './app/component/landingPage/landingPage.html',
              controller: 'landingCtrl'
            })
            .state('home', {
                 url: '/home',
                 templateUrl: './app/component/home/home.html',
                 controller: 'homeCtrl',
                 resolve: {
                     user: function (homeSrvc) {
                         return homeSrvc.getUser();
                     }
                 }
            })
            .state('clients', {
               url: '/clients',
               templateUrl: './app/component/client_view/client_view.html',
               controller: 'clientCtrl',
               resolve: {
                   user: function (homeSrvc) {
                       return homeSrvc.getUser();
                   }
               }
           })
           .state('programs', {
               url: '/programs',
               templateUrl: './app/component/programs/programs.html',
               controller: 'programCtrl',
               resolve: {
                   user: function (homeSrvc) {
                       return homeSrvc.getUser();
                   }
               }
           })
           .state('distraction', {
               url: '/distraction',
               templateUrl: './app/component/distraction/games.html',
               controller: 'disCtrl',
               resolve: {
                   user: function (homeSrvc) {
                       return homeSrvc.getUser();
                   }
               }
           });





    });
