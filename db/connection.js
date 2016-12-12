var mongoose = require("mongoose");

var DrinkSchema = new mongoose.Schema(
  {
    restaurant_name: String,
    type: String,
    price: Number,
    day: String,
    date: Date,
    address: String,
    time_start: Number,
    time_end: Number,
    meridiem: String,
    votes: Number,
    location: {
      lat: Number,
      lng: Number
    }
  }
);

mongoose.model("Drink", DrinkSchema);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sip")



module.exports = mongoose;
