var mongoose = require("./connection.js")
var seedData = require("./seeds.json")

var Drink = mongoose.model("Drink")

Drink.remove({}).then(function() {
  Drink.collection.insert(seedData).then(function() {
    process.exit();
  });
});
