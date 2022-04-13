const  mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: {
        type: String,
        required: [true]
    },
    content: String
}

const Article = mongoose.model('Article', articleSchema);

app.route("/articles")
    .get((req, res)=>{
        Article.find((err, foundArticles)=>{
            if(!err){
                res.send(foundArticles);
            }
            else {
                res.send(err);
            }
        });
    })
    .post((req,res)=>{
        // console.log(req.body);
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(err=>{
            if(!err){
                res.send("Posted successfully.");
            }
            else {
                res.send(err);
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany(err => {
            if(!err){
                res.send("Successfully deleted all articles");
            }
            else {
                res.send(err);
            }
        });
    });

// app.post("/articles/:articleTitle",(req,res)=>{


app.route("/articles/:articleTitle")
    .get((req,res)=>{
        const articleTitle = req.params.articleTitle;
        // const articleTitle = _.lowerCase(req.params.articleTitle);
        console.log(articleTitle);
        Article.findOne({title: articleTitle},(err, result)=>{
            if(result){
                res.send(result);
            }
            else{
                res.status(404).send("Couldn't find that");
            }
        })
        
    })









app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});

