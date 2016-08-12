angular.module('streamalong')
  .directive('sideDir', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/directives/sidebar/sidebar.html'
    };
  });
