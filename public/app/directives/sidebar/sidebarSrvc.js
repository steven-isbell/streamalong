angular.module('streamalong')
  .service('sidebarSrvc', function($http) {

    this.logout = () => {
      return $http({
        method: 'GET',
        url: '/logout'
      }).then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    };

    this.putManager = (update, id) => {
      return $http({
        method: 'PUT',
        url: '/manager/' + id,
        data: update
      }).then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
    };

  });
