﻿(function () {
    "use strict";
    angular
        .module("sbAdminApp")
        .controller("FunctionListCtrl",
                    ["$scope", "$http", "$state", "appSettings", "shareServices", "popupService", "functionServices", "applicationServices",
                     FunctionListCtrl])

    function FunctionListCtrl($scope, $http, $state, appSettings, shareServices, popupService, functionServices, applicationServices) {
        $scope.remove = function (scope) {
            scope.remove();
        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.moveLastToTheBeginning = function () {
            console.log('moveLastToTheBeginning');
            var a = $scope.data.pop();
            $scope.data.splice(0, 0, a);
        };

        $scope.newSubItem = function (scope) {
            var nodeData = scope.$modelValue;
            nodeData.nodes.push({
                id: nodeData.id * 10 + nodeData.nodes.length,
                title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                nodes: []
            });
        };

        $scope.collapseAll = function () {
            $scope.$broadcast('collapseAll');
        };

        $scope.expandAll = function () {
            $scope.$broadcast('expandAll');
        };

        $scope.data = [{
            'id': 1,
            'title': 'node1',
            'nodes': [
              {
                  'id': 11,
                  'title': 'node1.1',
                  'nodes': [
                    {
                        'id': 111,
                        'title': 'node1.1.1',
                        'nodes': []
                    }
                  ]
              },
              {
                  'id': 12,
                  'title': 'node1.2',
                  'nodes': []
              }
            ]
        }, {
            'id': 2,
            'title': 'node2',
            'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
            'nodes': [
              {
                  'id': 21,
                  'title': 'node2.1',
                  'nodes': []
              },
              {
                  'id': 22,
                  'title': 'node2.2',
                  'nodes': []
              }
            ]
        }, {
            'id': 3,
            'title': 'node3',
            'nodes': [
              {
                  'id': 31,
                  'title': 'node3.1',
                  'nodes': []
              }
            ]
        }];

        $scope.getApplication = function () {

            functionServices.getActive()
            .success(function (data) {
                console.log('data:' + data);
                if (data.application.header.code == 0) {
                    $scope.apps = data.application.body;
                } else {
                    $scope.apps = [];
                }
            })
            .error(function (err) {
                console.log('err' + err);
                $scope.apps = [];
            });
        };

        $scope.cboAppChange = function (appId) {
            console.log(appId);
        }

        $scope.getApplication();
    }
}());