angular.module('streamalong')
  .directive('sideDir', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/directives/sidebar/sidebar.html',
      scope: false,
      controller: 'sidebarCtrl',
      link: (scope, elem, attr) => {
        console.log(scope.user);
        let $scope = scope;
      }
    };
  });
