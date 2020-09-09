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

  const greetingsCounter = req.body.greetingsCounter;
  const counter = Greetings.greetingsCounter(greetingsCounter)// dispaly my counter
  console.log(Greetings.getNames())
  res.render("index", {
    display: displayMyGreetings,
    count: counter
  });
})


app.get("/greeted", function (req, res) {
  var names = Greetings.getNames();
  for (const list in names) {

  }

  res.render("greet", { name: names });
})

app.get("/counter/:user_name", function (req, res) {
    const user_name = req.params.user_name
    var counter = Greetings.greetingsCounter(user_name);
  res.render("counter", {
    names : Greetings.getNames(),
    user_name,
     counter});
})

app.post("/reset", function (req, res) {

  res.redirect("")
})

let PORT = process.env.PORT || 3080;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});