angular.module('streamalong')
    .controller('landingCtrl', function(landingSrvc, $scope, $state) {

        $scope.addManager = (user) => {
            landingSrvc.addManager(user).then((response) => {
                $('.signup-modal').hide();
                if (response === true) {
                    swal("Successfully Registered!", "Please Login Using The Login Screen!", "success");
                } else {
                    $state.go('landing page');
                }
            });
        };

        function getUser() {
            landingSrvc.getUser().then((user) => {
                if (user) $scope.user = user.username;
                else $scope.user = 'NOT LOGGED IN';
            });
        }

        $scope.login = (username, password) => {
            console.log('Logging in with', username, password);
            landingSrvc.login({
                username: username,
                password: password
            }).then((response, err) => {
                if (response === undefined) {
                    swal("Error Logging In!", "Hmm.. Something Wasn't Right. Please Try Again.", "error");
                } else {
                    getUser();
                    $state.go('home');
                }
            });
        };

    });
