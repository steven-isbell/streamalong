angular.module('streamalong')
  .service('landingSrvc', function($http) {
    this.addManager = function(user) {
      return $http({
        method: 'POST',
        url: '/signup',
        data: user
      }).then(function(response) {
        console.log(response);
        return response;
      });
    };

    this.login = function(user) {
      return $http({
        method: 'POST',
        url: '/auth/local',
        data: user
      }).then(function(response) {
        // console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        // console.log('ERROR LOGGING IN!', err);
        // return err;
      });
    };

    this.getUser = () => {
      return $http({
        method: 'GET',
        url: '/me'
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    };

  });
