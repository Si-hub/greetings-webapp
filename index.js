//import a module by name
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser'); 
const express = require("express");

const greetings = require('./greetings');
//instances
const app = express();
const settingsBill = greetings();

//registering the template engine express-handlebars as handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//this will make server instance to find css, other resources stored in the public folder
app.use(express.static('public'))

// Home page route
app.get("/", function(req, res){
    // send the rendered view to the client (index.handlebars file)
    res.render("index");
    });

app.post("/greetings", function(req, res){
      res.redirect("")  
      })    
    

app.post("/greeted", function(req, res){
    
    res.render("")  
    })
     
app.get("/counter/:USER_NAME", function(req, res){   
    res.render("");
    });

app.post("/reset", function(req, res){
  res.redirect("") 
})

  let PORT = process.env.PORT || 3080;
  
  app.listen(PORT, function(){
    console.log('App starting on port', PORT); 
  });