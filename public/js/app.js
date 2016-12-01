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
      .state("show", {
        url: "/sip/:restaurant_name",
        templateUrl: "assets/js/ng-views/show.html",
        controller: "showController",
        controllerAs: "vm"
      })
    $urlRouterProvider.otherwise("/sip")
  }

  function drinkFunction($resource) {
    console.log("drink factory function");
    return $resource("/api/drinks/:restaurant_name", {}, {
      update: {method: "PUT"}
    });
  }

  function indexFunction(Drink, $state, $sce, $scope) {
    console.log("index controller");
    this.initMap = initMap
    function initMap() {
      console.log("can u see mE?");
      var map;
      window.onload = function() {
        console.log(document.getElementById('map'));
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(38.889931,-77.009003),
          mapTypeId: 'terrain'
        });
        // Create a <script> tag and set the API URL as the source.
        var script = document.createElement('script');
        script.src = 'http://localhost:3000/api/drinks/';
        document.getElementsByTagName('head')[0].appendChild(script);

        // Loop through the results array and place a marker for each
        // set of coordinates.
        window.eqfeed_callback = function(results) {
          console.log("does this even happen?");
          for (var i = 0; i < results.features.length; i++) {
            var coords = results.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map
            });
          }
        }
      }
    }
    this.drinks = Drink.query()
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
