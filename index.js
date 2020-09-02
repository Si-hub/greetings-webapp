//import a module by name
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require("express");

const greetings = require('./greetings');

// create my app
const app = express();
// function instance
const Greetings = greetings();

// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))// why extended false?
// for parsing application/json
app.use(bodyParser.json())

//this will make server instance to find css in the public folder
app.use(express.static('public'))

// Get
app.get("/", function (req, res) {
  // send the rendered view to the client
  res.render("index");
});

//Post
app.post("/greetings", function (req, res) {
  var userName = req.body.userName;
  var language = req.body.language;

  //display my greetings
  const displayMyGreetings = Greetings.greet(userName, language)
  res.render("index", {
    display: displayMyGreetings,
  });
})


app.get("/greeted", function (req, res) {

  res.render("")
})

app.get("/counter/:USER_NAME", function (req, res) {
  res.render("");
});

app.post("/reset", function (req, res) {
  res.redirect("/")
})

let PORT = process.env.PORT || 3080;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});