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
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true})

const articleSchema ={
    title : String ,
    content : String 
}

const Article = mongoose.model("Article",articleSchema)

app.get("/",(req,res)=>{

    res.send("wiki Rest-API")
})


app.get("/articles",(req,res)=>{

    Article.find({},(err,foundArticles)=>{
        if(err){
            res.send(err)
        }else{
            res.send(foundArticles)
        }
    })

})







//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});



