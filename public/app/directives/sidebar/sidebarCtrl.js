angular.module('streamalong')
  .controller('sidebarCtrl', function($scope, sidebarSrvc) {
    $scope.getOne = function(id) {
      sidebarSrvc.getCM().then(function(response) {
        console.log(response);
        $scope.user = response;
      });
    };


  });
