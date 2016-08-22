angular.module('streamalong')
    .controller('clientCtrl', function($scope, user, clientSrvc) {

        $scope.user = user.data;

        $scope.getClients = function(id) {
            clientSrvc.getClients(id).then(function(results) {
                $scope.clients = results;
            });
        };
        $scope.getClients($scope.user.id);

        $scope.addClient = function(newClient) {
            clientSrvc.addClient(newClient).then(function(results) {
                $('.client-modal').hide(300);
                if (results.status === 200) {
                    swal("Success!", "A New Client Has Been Added!", "success");
                } else if (results.status === 400) {
                    swal("Uh-Oh!", "There Was An Error!", "error");
                }
                $scope.getClients($scope.user.id);
            });
        };

        $scope.deleteClient = function(id) {
            clientSrvc.deleteClient(id).then(function(results) {
                $('.makeWiggle').toggleClass('wiggle');
                $('.remove-client').toggleClass('hidden');
                if (results.status === 200) {
                    swal("Success!", "The Client Has Been Removed!", "success");
                } else {
                    swal("Uh-Oh!", "There Was An Error!", "error");
                }
                $scope.getClients($scope.user.id);
            });
        };

        $scope.readClientId = function(client) {
            $scope.selectedClient = client;
        };

    });
