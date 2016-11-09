angular.module('streamalong')
  .controller('landingCtrl', function(landingSrvc, $scope, $state, $location) {

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

    $scope.getUser = () => {
      landingSrvc.getUser().then((user) => {
        $scope.user = user;
        if ($scope.user.status === 200) {
          $('.is-logged-in').css('display', 'none');
          $('.right-float').css('justify-content', 'flex-end');
          $('.logged-in').show();
        }
      });
    };
    $scope.getUser();


    $scope.login = (username, password) => {
      console.log('Logging in with', username, password);
      landingSrvc.login({
        username: username,
        password: password
      }).then((response, err) => {
        if (response === undefined) {
          swal("Error Logging In!", "Hmm.. Something Wasn't Right. Please Try Again.", "error");
        } else {
          $scope.getUser();
          $state.go('home');
        }
      });
    };

  });
