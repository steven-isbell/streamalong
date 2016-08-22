angular.module('streamalong')
  .service('sidebarSrvc', function($http) {
    // this.getCM = function() {
    //   return $http({
    //     method: 'GET',
    //     url: '/manager/:id',
    //     data: id
    //   }).then(function(response) {
    //     return response.data;
    //   });
    // };

    this.logout = function() {
      return $http({
        method: 'GET',
        url: '/logout'
      }).then(function(response) {
        console.log(response);
        return response.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    };

  });
