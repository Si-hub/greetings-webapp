//import a module by name
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const express = require("express");

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://sim:pg123@localhost:5432/greet';

const pool = new Pool({
    connectionString
});

// create my app
const app = express();
const greetings = require('./greetings');
const Greetings = greetings(pool);



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
app.use(bodyParser.urlencoded({ extended: false })) // why extended false?
    // for parsing application/json
app.use(bodyParser.json())

//this will make server instance to find css in the public folder
app.use(express.static('public'))

// Get
app.get("/", async function(req, res) {

    res.render("index", {
        title: 'Home'
    });
});

//Post
app.post("/greetings", async function(req, res) {
    var userName = req.body.userName;
    var language = req.body.language;
    // console.log(req.body.userName)
    // console.log(req.body.language)

    if (!userName && !language) {
        req.flash('info', 'please enter your name and select language');
    } else if (!language) {
        req.flash('info', 'please select your language');
    } else {
        // dispaly my counter
        var counter = await Greetings.counter()

        const check = await Greetings.checkName(userName)
            // console.log("check " + check)
        if (check === 0) {
            Greetings.insertNames(userName)
        } else {
            Greetings.updateCounter(userName)
        }
        //display my greetings
        var displayMyGreetings = await Greetings.greet(userName, language)
            // Greetings.setName(userName)
    }
    //console.log({ counter, displayMyGreetings })
    res.render("index", {
        display: displayMyGreetings,
        count: counter
    });
})

app.get("/greeted", async function(req, res) {
    var names = await Greetings.getNames();

    res.render("greet", { name: names });
})

app.get("/counter/:userName", async function(req, res) {
    const userName = req.params.userName
    var namesList = await Greetings.greetedUsersCount(userName)
    let msg = 'Hello, ' + userName + ' has been greeted ' + namesList + ' times '
    res.render("counter", {
        message: msg
    });
})

app.get("/reset", async function(req, res) {
    await Greetings.clearValues()
    res.redirect("/")

})

let PORT = process.env.PORT || 3080;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});