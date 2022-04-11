const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname+"/index.html");
    // console.log(req);
});

app.post("/",function(req, res){
    res.send(req.body);
});

app.listen(3000);