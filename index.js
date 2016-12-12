var express       = require("express")
var cool          = require("cool-ascii-faces")
var bodyParser    = require("body-parser")
var mongoose      = require("./db/connection.js")
var hbs           = require("hbs")

var app = express()

var Drink = mongoose.model("Drink")

// app.set("port", process.env.PORT || 3001);
// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/sip')
app.set("view engine", "hbs");

app.use(express.static(__dirname + '/public'))
app.use("/assets", express.static("public"));
app.use(bodyParser.json({extended: true}));  // handles json post requests

app.listen(app.get("port"), function(){
  console.log("It's aliiive like in port!");
});

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

app.delete("/api/drinks/:restaurant_name", function(req, res) {
  Drink.findOneAndRemove({restaurant_name: req.params.restaurant_name}).then(function() {
    res.json({success: true})
  })
})

app.put("/api/drinks/:restaurant_name", function(req, res) {
  Drink.findOneAndUpdate({restaurant_name: req.params.restaurant_name}, req.body, {new: true}).then(function(drink) {
    res.json(drink)
  })
})

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get("*/", function(req, res) {
  res.render("drinks")
})

app.listen(3000, () => {
  console.log("it's aliiiivee on 3000!!");
})
