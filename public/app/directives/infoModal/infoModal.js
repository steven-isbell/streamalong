angular.module('streamalong')
    .directive('infoModal', () => {
        return {
            restrict: 'EA',
            templateUrl: './app/directives/infoModal/info-modal.html',
            scope: false,
            controller: 'sidebarCtrl',
            link: (scope, elem, attr) => {
                let $scope = scope;
            }
        };
    });
