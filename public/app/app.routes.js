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
                    user: (homeSrvc) => {
                        return homeSrvc.getUser();
                    },
                    authUser: ($state, homeSrvc) => {
                        return homeSrvc.checkAuth().then((response) => {
                            if (response === 'unauthorized') {
                                $state.go('landing page');
                                setTimeout(() => {
                                    swal("Error", 'Please Login or Sign Up', 'error');
                                }, 400);
                            } else {
                                return response;
                            }
                        });
                    }
                }
            })
            .state('clients', {
                url: '/clients',
                templateUrl: './app/component/client_view/client_view.html',
                controller: 'clientCtrl',
                resolve: {
                    user: (homeSrvc) => {
                        return homeSrvc.getUser();
                    },
                    authUser: ($state, homeSrvc) => {
                        return homeSrvc.checkAuth().then((response) => {
                            if (response === 'unauthorized') {
                                $state.go('landing page');
                                setTimeout(() => {
                                    swal("Error", 'Please Login or Sign Up', 'error');
                                }, 400);
                            } else {
                                return response;
                            }
                        });
                    }
                }
            })
            .state('programs', {
                url: '/programs',
                templateUrl: './app/component/programs/programs.html',
                controller: 'programCtrl',
                resolve: {
                    user: (homeSrvc) => {
                        return homeSrvc.getUser();
                    },
                    authUser: ($state, homeSrvc) => {
                        return homeSrvc.checkAuth().then((response) => {
                            if (response === 'unauthorized') {
                                $state.go('landing page');
                                setTimeout(() => {
                                    swal("Error", 'Please Login or Sign Up', 'error');
                                }, 400);
                            } else {
                                return response;
                            }
                        });
                    }
                }
            });
            // .state('distraction', {
            //     url: '/distraction',
            //     templateUrl: './app/component/distraction/games.html',
            //     controller: 'disCtrl',
            //     resolve: {
            //         user: (homeSrvc) => {
            //             return homeSrvc.getUser();
            //         },
            //         authUser: ($state, homeSrvc) => {
            //             return homeSrvc.checkAuth().then((response) => {
            //                 if (response === 'unauthorized') {
            //                     $state.go('landing page');
            //                     setTimeout(() => {
            //                         swal("Error", 'Please Login or Sign Up', 'error');
            //                     }, 400);
            //                 } else {
            //                     return response;
            //                 }
            //             });
            //         }
            //     }
            // });





    });
