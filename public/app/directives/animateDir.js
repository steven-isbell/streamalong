angular.module('streamalong')
  .directive('jqDir', function() {
    return {
      restrict: 'EA',
      link: function(scope, element, attrs) {
        $(document).ready(function() {

        });
      }
    };
  });
