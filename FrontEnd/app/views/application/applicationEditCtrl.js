(function () {
    "use strict";
    angular
        .module("sbAdminApp")
        .controller("ApplicationEditCtrl",
                    ["$scope", "$http", "$state", "$stateParams", "appSettings", "shareServices", "popupService", "applicationServices",
                     ApplicationEditCtrl])

    function ApplicationEditCtrl($scope, $http, $state, $stateParams, appSettings, shareServices, popupService, applicationServices) {

        // Iniit data
        initData();

        $scope.originalModel = angular.copy($scope.currentItem);


        // Get detail
        if ($scope.currentItem._id == undefined && $stateParams.appId != '' && $stateParams.appId != undefined) {
            applicationServices.detail($stateParams.appId)
                .success(function (data) {
                    if (data.application.header.code == 0) {
                        $scope.currentItem = data.application.body;
                        $scope.originalModel = angular.copy($scope.currentItem);
                    } else {
                        $scope.currentItem = {};
                    }
                });
        }

        //Back update data
        console.log($scope.originalModel);

        // Sava data
        $scope.save = function (type) {

            if (!$scope.editForm.$valid) {
                //console.log("Form valid!");
                return;
            }

            if ($scope.currentItem._id == null || $scope.currentItem._id == 'undefined' || $scope.currentItem._id == '') {

                applicationServices.insert($scope.currentItem)
                    .success(function (data, status, headers, config) {
                        if (data.application.header.code == 0) {
                            popupService.showMessage('Insert Success!');
                            $scope.back(type);
                        } else {
                            popupService.showMessage('Insert error!');
                        }
                    });
            }
            else {
                //modelServices.updated($scope.currentItem)
                applicationServices.update($scope.currentItem)
                    .success(function (data, status, headers, config) {
                        if (data.application.header.code == 0) {
                            popupService.showMessage('Update Success!');
                            $scope.back(type);
                        } else {
                            popupService.showMessage('Update error!');
                        }
                    });
            }

        }

        // Reset data to default
        function initData() {
            $scope.currentItem = {};
            //$scope.edit_Form.$setPristine();
        }

        // Reset data to original
        $scope.cancel = function (editForm) {
            editForm.$setPristine();
            $scope.currentItem = angular.copy($scope.originalModel);
            $scope.message = "";
        };

        // Back to list
        $scope.back = function (type) {
            if (type == null || type == '' || type == 'back')
                $state.go("applicationList");
            else
                initData();
        }
    }
}());