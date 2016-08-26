angular.module('streamalong')
    .controller('programCtrl', function($scope, programSrvc, user) {
        $scope.user = user.data;

        $scope.getPrograms = () => {
            programSrvc.getPrograms().then((results) => {
                $scope.programs = results;
                if (results.length < 1) {
                    $('.no-clients').removeClass('no-display');
                } else if (results.length >= 1) {
                    $('.no-clients').addClass('no-display');
                }
            });
        };
        $scope.getPrograms();

        $scope.addProgram = (newProgram) => {
            programSrvc.addProgram(newProgram).then((results) => {
                $('.programs-modal').hide(300);
                $scope.newProgram = "";
                swal("Success!", "A New Program Has Been Added!", "success");
                $scope.getPrograms();
            });
        };

        $scope.deleteProgram = (id) => {
            programSrvc.deleteProgram(id).then((results) => {
                swal("Success!", "The Program Has Been Removed!", "success");
                $scope.getPrograms();
            });
        };

        $scope.readProgramId = (program) => {
            $scope.selectedProgram = program;
        };
    });
