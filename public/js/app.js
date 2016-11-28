angular
  .module("Sip", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  // .controller(["indexController", [
  //   "$state",
  //   indexFunction
  // ])

  function RouterFunction ($stateProvider) {
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "assets/js/ng-views/welcome.html"
      })
      .state("index", {
        url: "/sip",
        templateUrl: "assets/js/ng-views/index.html",
        controller: "indexController",
        controllerAs: "vm"
      })
  }
