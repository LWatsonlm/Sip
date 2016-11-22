var express       = require("express")
var bodyParser    = require("body-parser")
var mongoose      = require("./db/connection.js")
var hbs           = require("hbs")

var app = express()

var Drink = mongoose.model("Drink")

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");


app.use(express.static(__dirname + '/public'))
// app.use("/assets", express.static("public"));
app.use(bodyParser.json({extended: true}));  // handles json post requests
app.use(bodyParser.urlencoded({extended: true}));  // handles form submissions



app.get("/drinks", function(req, res) {
  Drink.find({}).then(function(drinks) {
    res.render("drinks-index", {
      drinks: drinks
    })
  })
})



app.listen(3000, () => {
  console.log("app listening on port 3000!!");
})
