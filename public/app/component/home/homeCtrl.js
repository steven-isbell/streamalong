angular.module('streamalong')
    .controller('homeCtrl', function($scope, homeSrvc) {
            $scope.saveNote = function(newNote) {
                $scope.note = {};
                homeSrvc.addNote(newNote);
                fetchNotes();
            };

            function fetchNotes() {
                homeSrvc.fetchNotes().then(function(response) {
                    $scope.notes = response;
                });
            }

            fetchNotes();

            $scope.deleteNote = function() {

            };

    });
