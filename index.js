const express = require("express");  // Import the Express.js module.
const app = express();  // Create an instance of the Express application.
let port = 8080;  // Define the port number on which the server will listen.
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts = [
   {
    id: uuidv4(),
    username: "JBT GROUP",
    content: "I love coding",

   },
   {
    id: uuidv4(),
    username: "Bablu kumar",
    content: "Hardwork is important to achieve sucess",
   },
   {
    id: uuidv4(),
    username:"rahul kumar",
    content: "I Got selected for my 1st internship",
   },
   {
    id: uuidv4(),
    username: "Tammana kumari",
    content: "I got selected for my 1st job in apple comapany",
   },
];

app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});
app.post("/posts",(req,res) =>{
    let {username,content} = req.body;
    let id = uuidv4(); 
    posts.push({id,username,content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{posts});
})
app.patch("/posts/:id",(req,res) =>{
    let{id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id/" ,(req,res) =>{
    let{id} = req.params;
     posts = posts.filter((p) => id !== p.id);
     res.redirect("/posts");

})

app.listen(port, () => {  // Start the server and listen on the specified port.
    console.log("listening to port:8080");  // Log a message when the server starts successfully.
});
