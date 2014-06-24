angular.module("doubtfire.home", [])
.config(($stateProvider) ->
  $stateProvider.state("home",
    url: "/home"
    views:
      main:
        controller: "HomeCtrl"
        templateUrl: "home/index.tpl.html"
      header:
        controller: "BasicHeaderCtrl"
        templateUrl: "common/header.tpl.html"
      sidebar:
        controller: "BasicSidebarCtrl"
        templateUrl: "common/sidebar.tpl.html"
    data:
      pageTitle: "_Home_"
      roleWhitelist: ['basic', 'admin']
  )
)

.controller("HomeCtrl", ($scope, $state, UnitRole, Project, headerService) ->
  $scope.unitRoles = UnitRole.query()
  $scope.projects = Project.query()
  headerService.clearLinks()

  #
  # Filter functions to separate units in repeater
  #
  $scope.isTutor = (unitRole) ->
    unitRole.role == "Tutor"
  $scope.isConvenor = (unitRole) ->
    unitRole.role == "Convenor"
)