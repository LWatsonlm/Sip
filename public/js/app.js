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
    "$scope",
    showFunction
  ])

  function RouterFunction ($stateProvider, $locationProvider, $urlRouterProvider) {
    // $locationProvider.html5Mode(true) // to remove the /#/ from URL
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
    Drink.query({}, (response) => {   // querying API
      bars = response     // set the query to bars
      let map = new google.maps.Map(document.getElementById('map'), {  // Init the Google Map from Google API
        zoom: 14,
        center: {lat: 38.9064227, lng: -77.0284656},
      })  // end of map options
      bars.forEach((bar) => {       // for Each enum to go through all drinks in API
        new google.maps.Marker({
          position: bar.location,   // find the Lat and Long from API and set a market for each positionn
          map: map
        })
      })
    })
    this.drinks = Drink.query()
      $(document).ready( function(e) {
        $('#summary').hover( function( evt ) {  // working on make details appear on hover
          $('#detail').toggle();
        });
      })
    this.newDrink = new Drink()
    this.create = function () {
      this.newDrink.$save().then(function(drink) {   // on form submit, save the data in database
        $state.go("show", {restaurant_name: drink.restaurant_name})
      })
    }
  }


  function showFunction(Drink, $state, $stateParams) {   // for the show page will like to make a modal in near future
    this.drink = Drink.get({restaurant_name: $stateParams.restaurant_name})
    this.update = function() {   // handles updates, updates from form and directly into database
      this.drink.$update({restaurant_name: $stateParams.restaurant_name})
    }
    this.destroy = function() {  // handles deleting, and deletes from database
      this.drink.$delete({restaurant_name: $stateParams.restaurant_name}).then(function() {
        $state.go("index")
      })
    }
  }
