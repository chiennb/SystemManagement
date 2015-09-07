(function () {
    "use strict";
    angular
        .module("sbAdminApp")
        .controller("ApplicationListCtrl",
                    ["$scope", "$http", "$state", "shareServices", "popupService", "applicationServices",
                     ApplicationListCtrl])

    function ApplicationListCtrl($scope, $http, $state, shareServices, popupService, applicationServices) {
        $scope.items = [];

        $scope.name = '';
        $scope.status = '';
        $scope.order_by = 'created_date';


        //-----------paging--------------
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 20;
        $scope.itemsPerPage = 20;

        $scope.pageChanged = function () {
            $scope.search();
        };

        $scope.search = function () {

            applicationServices.search($scope.name, $scope.status, $scope.currentPage, $scope.itemsPerPage, $scope.order_by)
            .success(function (data) {
                if (data.application.header.code == 0) {
                    $scope.items = data.application.body;
                    $scope.totalItems = data.application.count;
                } else {
                    $scope.items = [];
                    $scope.totalItems = 0;
                }
            })
            .error(function (err) {
                $scope.items = [];
            });
        };


        //Broadcast message
        $scope.goEdit = function (index) {

            if ($scope.items.length && (index != null || index != undefined)) {

                shareServices.setCurrentObject($scope.items[index]);
                $state.go('applicationEdit', { appId: $scope.items[index]._id });
            }
        };


        // Delete
        $scope.modelDelete = function (index) {
            if (popupService.showPopup('Are you sure delete this model?')) {

                applicationServices.destroy($scope.items[index]._id)
                    .success(function (data, status, headers, config) {
                        if (data.application.header.code == 0) {
                            $scope.items.splice(index, 1);
                            popupService.showMessage('Delete success!');
                        } else {
                            popupService.showMessage('Delete error!');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        popupService.showMessage('Delete error!');
                    });
            }
        }

        $scope.search();
    }
}());