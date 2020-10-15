const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const express = require("express");
const routes = require('./greetingsRoutes');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://sim:pg123@localhost:5432/greet';

const pool = new Pool({
    connectionString
});

// create my app
const app = express();
const greetingsRoutes = require('./greetingsRoutes');

const GreetingsRoutes = greetingsRoutes(pool);



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
app.use(bodyParser.urlencoded({ extended: false }))
    // for parsing application/json
app.use(bodyParser.json())

//this will make server instance to find css in the public folder
app.use(express.static('public'))


app.get("/", GreetingsRoutes.home);

app.post("/greetings", GreetingsRoutes.toGreet);

app.get("/greeted", GreetingsRoutes.namesGreeted);

app.get("/counter/:userName", GreetingsRoutes.eachUser);

app.get("/reset", GreetingsRoutes.Reset);

let PORT = process.env.PORT || 3080;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});