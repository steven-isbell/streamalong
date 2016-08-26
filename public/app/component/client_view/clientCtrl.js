angular.module('streamalong')
    .controller('clientCtrl', function($scope, user, clientSrvc) {

        $scope.user = user.data;

        $scope.getClients = (id) => {
            clientSrvc.getClients(id).then((results) => {
                $scope.clients = results;
                if (results.length < 1) {
                    $('.no-clients').removeClass('no-display');
                } else if (results.length >= 1) {
                    $('.no-clients').addClass('no-display');
                }
            });
        };
        $scope.getClients($scope.user.id);

        $scope.addClient = (newClient) => {
            if (newClient.case_manager_id == $scope.user.id) {
                clientSrvc.addClient(newClient).then((results) => {
                    $('.client-modal').hide(300);
                    $scope.newClient = "";
                    if (results === undefined) {
                        swal("Uh-Oh!", "There Was An Error!", "error");
                    } else {
                        swal("Success!", "A New Client Has Been Added!", "success");
                    }
                    $scope.getClients($scope.user.id);
                });
            } else if (newClient.case_manager_id !== $scope.user.id) {
                swal("Error", "You Can Only Add Clients To Your Case Management.", "error");
            }
        };

        $scope.deleteClient = (id) => {
            clientSrvc.deleteClient(id).then((results) => {
                if (results === undefined) {
                    swal("Uh-Oh!", "There Was An Error!", "error");
                } else {
                    swal("Success!", "The Client Has Been Removed!", "success");
                }
                $scope.getClients($scope.user.id);
            });
        };

        $scope.putClient = (updatedClient, name) => {
            clientSrvc.putClient(updatedClient, name).then((results) => {
                if (results.status === 200) {
                    swal("Success!", "The Client Has Been Updated!", "success");
                } else {
                    swal("Uh-Oh!", "There Was An Error!", "error");
                }
                $scope.getClients($scope.user.id);
            });
        };
    });
