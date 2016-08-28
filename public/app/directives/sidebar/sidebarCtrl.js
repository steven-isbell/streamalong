angular.module('streamalong')
    .controller('sidebarCtrl', ($scope, sidebarSrvc, $state) => {

        $scope.logout = () => {
            sidebarSrvc.logout().then((response) => {
                swal("Success!", "Logout Successful!", "success");
                setTimeout(() => {
                    if (response) {
                        $state.go('landing page');
                    }
                }, 1500);
            });
        };

        $scope.putManager = (update, id) => {
            sidebarSrvc.putManager(update, id).then((response) => {
                $('.CM-modal').hide(300);
                console.log(response);
                if (response.status === 200) {
                    swal("Success!", "Your Information Has Been Saved!", "success");
                } else {
                    swal("Error!", "Hmm...Something Wasn't Right", "error");
                }
            });
        };

    });
