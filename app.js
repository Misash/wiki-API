//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


//connect mongoDB
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true })

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema)

app.get("/", (req, res) => {

    res.send("wiki Rest-API")
})



app.route("/articles")
    .get((req, res) => {

        Article.find({}, (err, foundArticles) => {
            if (err) {
                res.send(err)
            } else {
                res.send(foundArticles)
            }
        })

    })
    .post((req, res) => {

        console.log(req.body.title)
        console.log(req.body.content)

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save((err) => {
            if (!err) {
                res.send("Succesfully added a  new article")
            } else {
                res.send(err)
            }
        })

    })
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.send("Succesfully deleted all articles")
            } else {
                res.send(err)
            }
        })
    })


app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
            if (foundArticle) {
                res.send(foundArticle)
            } else {
                res.send("Article was not found")
            }
        })
    })
    .put((req, res) => {
        Article.replaceOne(
            { title: req.params.articleTitle },
            { title: req.body.title , content: req.body.content } ,
             (err)=> {
                if(!err){
                    res.send("Successfully updated all article")
                }else{
                    res.send(err)
                }
        })
    })
    .patch((req,res)=>{
        Article.updateOne(
            { title: req.params.articleTitle },
            req.body ,
             (err)=> {
                if(!err){
                    res.send("Successfully updated article")
                }else{
                    res.send(err)
                }
        })
    })
    .delete((req,res)=>{
        Article.deleteOne({title : req.params.articleTitle}, (err) => {
            if (!err) {
                res.send("Succesfully deleted article")
            } else {
                res.send(err)
            }
        })
    })



//TODO

app.listen(3000, function () {
    console.log("Server started on port 3000");
});



