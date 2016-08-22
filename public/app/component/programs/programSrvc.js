angular.module('streamalong')
    .service('programSrvc', function($http) {

        this.getPrograms = function() {
            return $http({
                method: 'GET',
                url: '/programs',
            }).then(function(response) {
                console.log(response);
                var results = response.data;
                return results;
            });
        };

        this.addProgram = function(newProgram) {
            return $http({
                method: 'POST',
                url: '/programs',
                data: newProgram
            }).then(function(response) {
                return response;
            });
        };

        this.deleteProgram = function(id) {
            return $http({
                method: 'DELETE',
                url: '/program/' + id,
            }).then(function(response) {
                return response;
            });
        };

        this.getUser = function () {
            return $http.get('/me');
        };

    });
