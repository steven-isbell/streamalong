angular.module('streamalong')
    .controller('landingCtrl', function(landingSrvc, $scope, $state) {

        $scope.addManager = function(user) {
            landingSrvc.addManager(user).then(function(response) {
                $('.signup-modal').hide();
                swal("Successfully Registered!", "Please Login Using The Login Screen!", "success");
                console.log(response);
                if (response.data) {
                    $state.go('landing page');
                }
            });
        };

        function getUser() {
            landingSrvc.getUser().then(function(user) {
                if (user) $scope.user = user.username;
                else $scope.user = 'NOT LOGGED IN';
            });
        }

        $scope.login = function(username, password) {
            console.log('Logging in with', username, password);
            landingSrvc.login({
                username: username,
                password: password
            }).then(function(response, err) {
                if (response === undefined) {
                    swal("Error Logging In!", "Hmm.. Something Wasn't Right. Please Try Again.", "error");
                }
                else {
                    getUser();
                    $state.go('home');
                }
            });
        };

    });
