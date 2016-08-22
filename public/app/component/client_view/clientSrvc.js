angular.module('streamalong')
    .service('clientSrvc', function($http) {
        this.getUser = function() {
            return $http.get('/me');
        };

        this.getClients = function(id) {
                return $http({
                    method: 'GET',
                    url: '/clients/' + id,
                }).then(function(response) {
                    var results = response.data;
                    return results;
                });
            };

            this.addClient = function(newClient) {
                return $http({
                    method: 'POST',
                    url: '/client',
                    data: newClient
                }).then(function(response) {
                    console.log(response);
                    return response;
                });
            };

            this.deleteClient = function(id) {
                return $http({
                    method: 'DELETE',
                    url: '/client/' + id,
                }).then(function(response) {
                    return response;
                });
            };
    });
