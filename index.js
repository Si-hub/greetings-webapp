//import a module by name
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const express = require("express");

const greetings = require('./greetings');

// create my app
const app = express();
// function instance
const Greetings = greetings();


// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: 'this is my long string that is used for session in http',
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))// why extended false?
// for parsing application/json
app.use(bodyParser.json())

//this will make server instance to find css in the public folder
app.use(express.static('public'))

// Get
app.get("/", function (req, res) {

  res.render("index", {
    title: 'Home'
  });
});

//Post
app.post("/greetings", function (req, res) {
  var userName = req.body.userName;
  var language = req.body.language;

  if (!userName && !language){
    req.flash('info', 'please enter your name and select language');
  }else if (!language){
    req.flash('info', 'please select your language');
  }
  //display my greetings
  const displayMyGreetings = Greetings.greet(userName, language)

  const greetingsCounter = req.body.greetingsCounter;
  const counter = Greetings.greetingsCounter(greetingsCounter)// dispaly my counter
  //console.log(Greetings.getNames())
  res.render("index", {
    display: displayMyGreetings,
    count: counter
  });
})

app.get("/greeted", function (req, res) { // server receives an HTTP request, it will provide Http response
  var names = Greetings.getNames();
  for (const list in names) { // for...in loop: loop over the properties of the Object to find 
    //names that has been greeted 
  }
  res.render("greet", { name: names });
})

app.get("/counter/:userName", function (req, res) {
  const userName = req.params.userName
  var counter = Greetings.eachUserCounter(userName);
  res.render("counter", {
    userName,
    counter
  });
})

app.post("/reset", function (req, res) {

  res.redirect("")
})

let PORT = process.env.PORT || 3080;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});