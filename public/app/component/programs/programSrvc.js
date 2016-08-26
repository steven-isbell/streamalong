angular.module('streamalong')
    .service('programSrvc', function($http) {

        this.getPrograms = () => {
            return $http({
                method: 'GET',
                url: '/programs',
            }).then((response) => {
                var results = response.data;
                return results;
            });
        };

        this.addProgram = (newProgram) => {
            return $http({
                method: 'POST',
                url: '/programs',
                data: newProgram
            }).then((response) => {
                return response;
            });
        };

        this.deleteProgram = (id) => {
            return $http({
                method: 'DELETE',
                url: '/program/' + id,
            }).then((response) => {
                return response;
            });
        };

        this.getUser =  () => {
            return $http.get('/me');
        };

    });
