angular
  .module("Sip", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("Drink", [
    "$resource",
    drinkFunction
  ])
  .controller("indexController", [
    "Drink",
    "$state",
    "$sce",
    indexFunction
  ])
  .controller("showController", [
    "Drink",
    "$state",
    "$stateParams",
    showFunction
  ])

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
      .state("show", {
        url: "/sip/:restaurant_name",
        templateUrl: "assets/js/ng-views/show.html",
        controller: "showController",
        controllerAs: "vm"
      })
  }

  function drinkFunction($resource) {
    console.log("drink factory function");
    return $resource("/api/drinks/:restaurant_name", {}, {
      update: {method: "PUT"}
    });
  }

  function indexFunction(Drink, $state, $sce) {
    console.log("index controller");
    this.drinks = Drink.query()
  }

  function showFunction(Drink, $state, $stateParams) {
    console.log("show me the money");
    this.drink = Drink.get({restaurant_name: $stateParams.restaurant_name})
  }
