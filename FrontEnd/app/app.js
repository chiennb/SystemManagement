'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var myapp = angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ngMessages',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'common.services',
    'ngSanitize',
    'ui.bootstrap-slider',
    'ui.grid.treeView',
    'mgcrea.ngStrap',
    'satellizer',
    'ui.tree'//Tree
  ])
    .run(function ($rootScope, $state, $auth) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            if (toState.authenticate && !$auth.isAuthenticated()) {
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    })
    .constant("appSettings", {
        //serverPath: "http://10.15.171.35:8080/fisliftweb",
        //authPath: "http://10.15.171.35:9000"
        serverPath: "http://localhost:8080",
        authPath: "http://localhost:9000"
    })
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$authProvider', 'appSettings', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $authProvider, appSettings) {

      $ocLazyLoadProvider.config({
          debug: false,
          events: true,
      });

      $authProvider.facebook({
          clientId: '804896872898846'
      });

      $authProvider.google({
          clientId: '612423556891-59he3rnnqst0dgo8598ua1jg93tvp8ip.apps.googleusercontent.com'
      });

      $authProvider.loginUrl = appSettings.authPath + '/auth/login';
      $authProvider.signupUrl = appSettings.authPath + '/auth/signup'

      $urlRouterProvider.otherwise('/applications');

      $stateProvider          
      .state('login', {
          //templateUrl: 'views/pages/login.html',
          templateUrl: 'app/views/shares/login/login.html',
          url: '/login',
          controller: 'LoginCtrl',
          authenticate: false
      })
    .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl',
        authenticate: false
    })
    .state('signup', {
        //templateUrl: 'views/pages/login.html',
        templateUrl: 'app/views/shares/signup/signup.html',
        url: '/signup',
        controller: 'SignupCtrl',
        authenticate: false
    })
    .state('profile', {
        //templateUrl: 'views/pages/login.html',
        templateUrl: 'app/views/shares/profile/profile.html',
        url: '/profile',
        controller: 'ProfileCtrl',
        authenticate: true
    })      
      //System management
    .state('applicationList', {
        templateUrl: 'app/views/application/applicationList.html',
        url: '/applications',
        controller: "ApplicationListCtrl",
        authenticate: true
    })
    .state('applicationEdit', {
        templateUrl: 'app/views/application/applicationEdit.html',
        url: '/applications/edit/:appId',
        controller: "ApplicationEditCtrl",
        authenticate: true
    })
    .state('functionList', {
        templateUrl: 'app/views/function/functionList.html',
        url: '/functions',
        controller: "FunctionListCtrl",
        authenticate: true
    })
    .state('functionEdit', {
        templateUrl: 'app/views/function/functionEdit.html',
        url: '/functions/edit/:functionId',
        controller: "FunctionEditCtrl",
        authenticate: true
    })
    .state('groupList', {
        templateUrl: 'app/views/group/groupList.html',
        url: '/groups',
        controller: "GroupListCtrl",
        authenticate: true
    })
    .state('groupEdit', {
        templateUrl: 'app/views/group/groupEdit.html',
        url: '/groups/edit/:groupId',
        controller: "GroupEditCtrl",
        authenticate: true
    })
    .state('groupFunctionList', {
        templateUrl: 'app/views/groupfunction/groupFunctionList.html',
        url: '/groupfunctions',
        controller: "GroupFunctionListCtrl",
        authenticate: true
    })
    .state('groupFunctionEdit', {
        templateUrl: 'app/views/groupfunction/groupFunctionEdit.html',
        url: '/groupfunctions/edit/:groupFunctionId',
        controller: "GroupFunctionEditCtrl",
        authenticate: true
    })
    .state('roleList', {
        templateUrl: 'app/views/role/roleList.html',
        url: '/roles',
        controller: "RoleListCtrl",
        authenticate: true
    })
    .state('roleEdit', {
        templateUrl: 'app/views/role/roleEdit.html',
        url: '/roles/edit/:roleId',
        controller: "RoleEditCtrl",
        authenticate: true
    })
    .state('roleGroupList', {
        templateUrl: 'app/views/roleGroup/roleGroupList.html',
        url: '/rolefunctons',
        controller: "RoleGroupListCtrl",
        authenticate: true
    })
    .state('roleGroupEdit', {
        templateUrl: 'app/views/rolegroup/roleGroupEdit.html',
        url: '/rolegroups/edit/:roleGroupId',
        controller: "RoleGroupEditCtrl",
        authenticate: true
    })
    .state('userList', {
        templateUrl: 'app/views/user/userList.html',
        url: '/users',
        controller: "UserListCtrl",
        authenticate: true
    })
    .state('userEdit', {
        templateUrl: 'app/views/user/userEdit.html',
        url: '/users/edit/:userId',
        controller: "UserEditCtrl",
        authenticate: true
    })
      .state('userGroupList', {
          templateUrl: 'app/views/usergroup/userGroupList.html',
          url: '/usergroups',
          controller: "UserGroupListCtrl",
          authenticate: true
      })
    .state('userGroupEdit', {
        templateUrl: 'app/views/usergroup/userGroupEdit.html',
        url: '/usergroups/edit/:usergroupId',
        controller: "UserGroupEditCtrl",
        authenticate: true
    })
      //End
  }])
  .controller('MainCtrl', ['$scope', '$auth', function ($scope, $auth) {

      $scope.isAuthenticated = function () {
          return $auth.isAuthenticated();
      };
  }]);

