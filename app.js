const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.set("view engine" , "ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

const posts = [];
const contacts = [];

app.get("/" , function(req,res){
    res.render("home",{
        posts:posts
    });
});

app.get("/about", function(req, res) {
    res.render( "about");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.post("/contact",function(req,res){
    const contact = {
        name : req.body.name,
        email: req.body.email,
        message :req.body.message
    }
    contacts.push(contact);
    // console.log("new contact :" , contacts)
    res.redirect("/");

})

app.get("/compose",function(req,res){
    res.render("compose");
});

app.post("/compose", function(req, res) {
    
    
    const post = {
        Titles: req.body.postTitle,
        conten: req.body.postContent,
        slug: _.kebabCase(req.body.postTitle)
    };
    posts.push(post);
    // console.log("New post created:",posts);
    
    res.redirect("/");
});


app.get("/post",function(req,res){
    res.render("post")
    // console.log(req.params.title);
});

app.get("/post/:slug",function(req,res){
    // Try direct match first (for properly formatted URLs)
    let foundPost = posts.find(function(post){
        return post.slug === req.params.slug;
    });
    
    // If not found, try to match by converting the URL parameter to kebab-case
    if(!foundPost) {
        foundPost = posts.find(function(post){
            return post.slug === _.kebabCase(req.params.slug);
        });
    }
    
    if(foundPost){
        console.log("Post found!");
        res.render("post", {
            post: foundPost
        });
    } else {
        console.log("Post not found");
        res.status(404).render("notFound");
    }
});


app.listen(3002,function(){
    console.log("server runing on 3002")
});