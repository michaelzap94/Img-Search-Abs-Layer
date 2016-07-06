var mongoose = require("mongoose");
var History = require("./mySchema.js");

function historySave(searchParams){
    var objToSave ={"term": searchParams,
      "when": new Date().toLocaleString()
};
    
    History.create(objToSave,function(err,dataHistory){
        if(err){
            console.log(err);
        }
        else{
            console.log("saved to History: "+dataHistory);
        }
    });
}
function findHistory(res){
   
    History.find({},function(err, dataReturned){
    if(err){
        console.log("error happened")
    }
    else{

 //newArray with specified results
        var newArray = dataReturned.map(function(obj){
        var newObj = {term:obj.term, when:obj.when};
        return newObj;
        });
        
            res.send(newArray);
    }
    });
}

            var obj = {historySave:historySave,
            findHistory:findHistory
            };

module.exports = obj;