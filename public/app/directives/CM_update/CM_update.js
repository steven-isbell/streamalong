angular.module('streamalong')
    .directive('cmModal', () => {
        return {
            restrict: 'EA',
            templateUrl: './app/directives/CM_update/CM_update.html',
            scope: false,
            controller: 'sidebarCtrl',
            link: (scope, elem, attr) => {
                let $scope = scope;
            }
        };
    });
