angular.module('streamalong')
  .service('disSrvc', function($http) {
    this.getUser = function () {
            return $http.get('/me');
        };
  });
