var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));


app.get("/",function(req,res){
    console.log("done root");
 res.sendFile(__dirname + "/public/main.html");//only when accessing static files in js.

});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});