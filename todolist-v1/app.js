const express = require("express");
const bodyParser = require("body-parser");
let items = [];
let workItems = [];
const date = require(__dirname + "/date.js");
const app = express();


app.set('view engine','ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    
    
    res.render("list",{listTitle: date.getDate(), newListItems: items}) ;
}); 

app.post("/", function(req, res){
var item = req.body.newItem
console.log(item);
console.log(req);
items.push(item);
res.redirect("/");

});

app.get("/work", function(req,res){
    res.render("list",{listTitle: "Work List",newListItems: workItems});
});

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",function(req,res){
    res.render("about");
});

app.listen(3000);