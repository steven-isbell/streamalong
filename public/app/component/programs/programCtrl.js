angular.module('streamalong')
  .controller('programCtrl', function($scope, programSrvc, user) {
    $scope.user = user.data;
    
    $scope.getPrograms = function() {
      programSrvc.getPrograms().then(function(results) {
        console.log(results);
        $scope.programs = results;
      });
    };
    $scope.getPrograms();

    $scope.addProgram = function(newProgram) {
      programSrvc.addProgram(newProgram).then(function(results) {
        $('.programs-modal').hide(300);
        swal("Success!", "A New Program Has Been Added!", "success");
        $scope.getPrograms();
      });
    };

    $scope.deleteProgram = function(id) {
      programSrvc.deleteProgram(id).then(function(results) {
        console.log(results);
        $('.makeWiggle').toggleClass('wiggle');
        $('.remove-program').toggleClass('hidden');
        swal("Success!", "The Program Has Been Removed!", "success");
        $scope.getPrograms();
      });
    };

    $scope.readProgramId = function(program) {
      $scope.selectedProgram = program;
    };
  });
