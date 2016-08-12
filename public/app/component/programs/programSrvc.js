angular.module('streamalong')
  .service('programSrvc', function($http) {

    this.getPrograms = function() {
      return $http({
      method: 'GET',
      url: '/programs',
    }).then(function(response) {
      var results = response.data;
      return results;
    });
  };

    this.addProgram = function(program) {
      return ({
        method: 'GET',
        url: '/program'
      }).then(function(response) {
        return response;
      });
    };
  });
