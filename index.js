var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));
var collecHandler = require("./dbs/collecHandler.js");

//DB
var mongoose = require("mongoose");
var dburl = process.env.DATABASEURL || "mongodb://localhost/HistoryDb";
mongoose.connect(dburl);

//SEARCH --------------------------------
var Search = require('bing.search');
var search = new Search(process.env.SEARCHKEY);

 function mySearch(searchParams, offset, myCallbackSearch){
        
        search.images(searchParams,
          {top: offset},
          function(err, results) {
              
          //newArray with specified results
              var newArray = results.map(function(obj){
                  var newObj = {url:obj.url, snippet:obj.title, thumbnail:obj.thumbnail.url, context:obj.sourceUrl};
            return newObj;
        });

      
    myCallbackSearch(newArray);
  }
);

};


//--------------------------------


//ROUTES

app.get("/",function(req,res){
    console.log("done root");
 res.sendFile(__dirname + "/public/main.html");//only when accessing static files in js.

});

app.get("/api/imagesearch/:searchParams",function(req,res){
    var searchParams = req.params.searchParams;
    var offset = req.query.offset || 5;// get values from a QUERY IN THE URL
    
  
  
  mySearch(searchParams,offset,function(dataResults){
      console.log("dataResults"+dataResults);
      
      collecHandler.historySave(searchParams);
      
      res.send(dataResults);
      
      
  });
   
});
    
app.get("/api/latest/imagesearch",function(req,res){
    
          collecHandler.findHistory(res);
  });
    
app.get("*",function(req,res){
        res.send({error:"Sorry, the url entered is not valid, Please enter a valid URL"});
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});