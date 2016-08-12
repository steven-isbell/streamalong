angular.module('streamalong')
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

          $stateProvider
            .state('landing page', {
              url: '/',
              templateUrl: './app/component/landingPage/landingPage.html'
            })
            .state('home', {
                 url: '/home',
                 templateUrl: './app/component/home/home.html',
                 controller: 'homeCtrl'
            })
            .state('clients', {
               url: '/clients',
               templateUrl: './app/component/client_view/client_view.html',
               controller: 'clientCtrl'
           })
           .state('programs', {
               url: '/programs',
               templateUrl: './app/component/programs/programs.html',
               controller: 'programCtrl'
           })
           .state('distraction', {
               url: '/distraction',
               templateUrl: './app/component/distraction/games.html'
           });





    });
