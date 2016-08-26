angular.module('streamalong')
  .service('landingSrvc', function($http) {
    this.addManager = (user) => {
      return $http({
        method: 'POST',
        url: '/signup',
        data: user
      }).then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => {
        console.log('ERROR SIGNING UP', err);
      });
    };

    this.login = (user) => {
      return $http({
        method: 'POST',
        url: '/auth/local',
        data: user
      }).then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log('ERROR LOGGING IN!', err);
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
