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

app.get("/", function(req, res) {
  res.render("drinks")
})

app.get("/api/drinks", function(req, res) {
  Drink.find({}).then(function(drinks) {
      res.json(drinks)
  })
})

app.get("/api/drinks/:restaurant_name", function(req, res) {
  Drink.findOne({restaurant_name: req.params.restaurant_name}).then(function(drink) {
    res.json(drink)
  })
})

app.post("/api/drinks", function(req, res) {
  Drink.create(req.body).then(function(drink) {
    res.json(drink)
  })
})

app.put("/api/drinks/:restaurant_name", function(req, res) {
  Drink.findOneAndUpdate({restaurant_name: req.params.restaurant_name}, req.body.drink, {new: true}).then(function(drink) {
    res.json(drink)
  })
})

app.listen(3000, () => {
  console.log("it's aliiiivee on 3000!!");
})
