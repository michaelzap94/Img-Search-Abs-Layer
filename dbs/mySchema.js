var mongoose = require("mongoose");

var Schema = new mongoose.Schema({
   term: String,
   when:{type:String, default:Date.now}// if date is empty the default is Date.now
  
});

module.exports = mongoose.model("History", Schema);