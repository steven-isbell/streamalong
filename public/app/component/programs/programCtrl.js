angular.module('streamalong')
  .controller('programCtrl', function($scope, programSrvc) {

    $scope.getPrograms = function() {
      programSrvc.getPrograms().then(function(results) {
        console.log(results);
        $scope.programs = results;
      });
    };
    $scope.getPrograms();

    // $scope.addProgram() = function() {
    //   programSrvc.addProgram().then(function(results) {
    //
    //   })
    // }
  });
