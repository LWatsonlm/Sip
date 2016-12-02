angular
  .module("Sip", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider", // turning on HTML5 mode
    "$urlRouterProvider", // adding redirect to root route
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
    "$scope",
    indexFunction
  ])
  .controller("showController", [
    "Drink",
    "$state",
    "$stateParams",
    showFunction
  ])

  function RouterFunction ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true) // to remove the /#/ from URL
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
      .state("about", {
        url:"/sip/about",
        templateUrl: "assets/js/ng-views/about.html"
      })
      .state("contact", {
        url: "/sip/contact",
        templateUrl: "assets/js/ng-views/contact.html"
      })
      .state("show", {
        url: "/sip/:restaurant_name",
        templateUrl: "assets/js/ng-views/show.html",
        controller: "showController",
        controllerAs: "vm"
      })
    $urlRouterProvider.otherwise("/sip")
  }

  function drinkFunction($resource) {
    return $resource("/api/drinks/:restaurant_name", {}, {
      update: {method: "PUT"}
    });
  }


  function indexFunction(Drink, $state, $sce, $scope) {
    let bars
    Drink.query({}, (response) => {
      bars = response
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 38.9064227, lng: -77.0284656},
      })
      bars.forEach((bar) => {
        new google.maps.Marker({
          position: bar.location,
          map: map
        })
      })
    })
    this.drinks = Drink.query()
      $(document).ready( function(e) {
        $('#summary').hover( function( evt ) {
          $('#detail').toggle();
        });
      })
    this.newDrink = new Drink()
    this.create = function () {
      this.newDrink.$save().then(function(drink) {
        $state.go("show", {restaurant_name: drink.restaurant_name})
      })
    }
  }


  function showFunction(Drink, $state, $stateParams) {
    console.log("show me the savings");
    this.drink = Drink.get({restaurant_name: $stateParams.restaurant_name})
    this.update = function() {
      this.drink.$update({restaurant_name: $stateParams.restaurant_name})
    }
    this.destroy = function() {
      this.drink.$delete({restaurant_name: $stateParams.restaurant_name}).then(function() {
        $state.go("index")
      })
    }
  }
