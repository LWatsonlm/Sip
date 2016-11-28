var express       = require("express")
var bodyParser    = require("body-parser")
var mongoose      = require("./db/connection.js")
var hbs           = require("hbs")

var app = express()

var Drink = mongoose.model("Drink")

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");

app.use(express.static(__dirname + '/public'))   // what's the difference?
app.use("/assets", express.static("public"));   // ^
app.use(bodyParser.json({extended: true}));  // handles json post requests
app.use(bodyParser.urlencoded({extended: true}));  // handles form submissions

app.get("/", function(req, res) {
  res.render("drinks")
})

app.get("/drinks", function(req, res) {
  Drink.find({}).then(function(drinks) {
    res.render("drinks-index", {
      drinks: drinks
    })
  })
})

app.get("/drinks/:restaurant_name", function(req, res) {
  Drink.findOne({restaurant_name: req.params.restaurant_name}).then(function(drink) {
    res.render("drink-show", {
      drink: drink
    })
  })
})

app.post("/drinks", function(req, res) {
  Drink.create(req.body.drink).then(function(drink) {
    res.redirect("/drinks/" + drink.restaurant_name)
  })
})

app.post("/drinks/:restaurant_name", function(req, res) {
  Drink.findOneAndUpdate({restaurant_name: req.params.restaurant_name}, req.body.drink, {new: true}).then(function(drink) {
    res.redirect("/drinks/" + drink.restaurant_name)
  })
})

app.listen(3000, () => {
  console.log("it's aliiiivee on 3000!!");
})
