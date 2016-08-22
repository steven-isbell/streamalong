angular.module('streamalong')
  .controller('sidebarCtrl', ($scope, sidebarSrvc, $state) => {
    // $scope.getOne = (id) => {
    //   sidebarSrvc.getCM().then(function (response) {
    //     console.log(response);
    //     $scope.user = response;
    //   });
    // };

    $scope.logout = function() {
      sidebarSrvc.logout().then((response) => {
        // console.log(response);
        swal("Success!", "Logout Successful!", "success");
        setTimeout(() => {
          if (response) { $state.go('landing page'); }
        }, 1500);
      });
    };


  });
