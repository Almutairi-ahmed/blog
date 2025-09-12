const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogDB");
const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));


const postSchema = new mongoose.Schema({
    Titles: String,
    contacts: String,
    slug: String
});


const Post = mongoose.model("Post", postSchema);

const contactsSchema = {
    name: String,
    email: String,
    message: String
}

const contactspost = mongoose.model("contactspost", contactsSchema);

app.get("/", async function (req, res) {
    try{
       await Post.find({}).then(function (result) {
        if (result != null) {
            res.render("home", {
                posts: result
            });
        }
        else {
            res.render("home");
        }
    })
    }
    catch(err){
        console.log(err);
        res.status(500).send("An error occurred");
        
    }
    
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

app.post("/contact",  async function (req, res) {
    try {
        const contact = new contactspost({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });


        await contact.save();
        res.redirect("/");
    }
    catch (err) {
        console.log(err);
        res.status(500).render("contact", {
            errorMessage: "failed to send message. p;ease try again"
        })
    }

});

app.get("/compose", function (req, res) {
    res.render("compose", {
        errorMessage: null,
        postTitle: "",
        postContent: ""
    });
});

app.post("/compose", async function (req, res) {
    try {
        const Newpost = new Post({
            Titles: req.body.postTitle,
            contacts: req.body.postContent,
            slug: _.kebabCase(req.body.postTitle)
        });

        await Newpost.save();
        res.redirect("/");
    } catch (err) {
        console.log(err);
        // Render compose page with an error message
        res.render("compose", {
            errorMessage: "Failed to save post. Please try again.",
            postTitle: req.body.postTitle,
            postContent: req.body.postContent
        });
    }
});


app.get("/post", function (req, res) {
    res.redirect("/")
    // console.log(req.params.title);
});

app.get("/post/:postId", function (req, res) {
    const requespostId = req.params.postId;

    // Try direct match first
    Post.findOne({ _id: requespostId })
        .then(function (foundPost) {
            if (foundPost) {
                console.log("Post found!");
                res.render("post", {
                    post: foundPost
                });
            } else {
                console.log("Post not found");
                res.status(400).render("notFound");
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send("An error occurred");
        })

});

app.listen(3002, function () {
    console.log("server runing on 3002")
});