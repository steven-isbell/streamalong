angular.module('streamalong')
  .controller('disCtrl', function(disSrvc, $scope, user) {
    $scope.user = user.data;  
  });
