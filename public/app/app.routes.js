angular.module('streamalong')
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './component/landingPage/home.html'
      })
      .state()





  });
