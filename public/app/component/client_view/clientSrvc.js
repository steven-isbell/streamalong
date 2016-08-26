angular.module('streamalong')
    .service('clientSrvc', function($http) {
        this.getUser = () => {
            return $http.get('/me');
        };

        this.getClients = (id) => {
                return $http({
                    method: 'GET',
                    url: '/clients/' + id,
                }).then((response) => {
                    var results = response.data;
                    return results;
                });
            };

            this.addClient = (newClient) => {
                return $http({
                    method: 'POST',
                    url: '/client',
                    data: newClient
                }).then((response) => {
                    return response.data;
                })
                .catch((err) => {
                    console.log('Error Adding Client', err);
                });
            };

            this.deleteClient = (id) => {
                return $http({
                    method: 'DELETE',
                    url: '/client/' + id,
                }).then((response) => {
                    return response.data;
                });
            };

            this.putClient = (updatedClient, name) => {
                return $http({
                    method: 'PUT',
                    url: '/client/' + name,
                    data: updatedClient
                }).then((response) => {
                    return response;
                });
            };
    });
