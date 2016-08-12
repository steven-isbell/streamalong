angular.module('streamalong')
  .service('sidebarSrvc', function($http) {
    this.getCM = function() {
      return $http({
        method: 'GET',
        url: '/manager/:id',
        data: id
      }).then(function(response) {
        return response.data;
      });
    };
  });
