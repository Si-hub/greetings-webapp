module.exports = function greetingRoute() {

    const pg = require("pg");
    const Pool = pg.Pool;

    const connectionString = process.env.DATABASE_URL || 'postgresql://sim:pg123@localhost:5432/greet';

    const pool = new Pool({
        connectionString
    });

    const greetings = require('./greetings');
    const Greetings = greetings(pool);

    async function home(req, res) {

        res.render("index");
    }

    async function toGreet(req, res) {
        var userName = req.body.userName;
        var language = req.body.language;
        // console.log(req.body.userName)
        // console.log(req.body.language)

        if (!userName && !language) {
            req.flash('info', 'please enter your name and select language');
        } else if (!language) {
            req.flash('info', 'please select your language');
        } else if (userName && language) {
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
    }

    async function namesGreeted(req, res) {
        var names = await Greetings.getNames();

        res.render("greet", { name: names });
    }

    async function eachUser(req, res) {
        const userName = req.params.userName
        var namesList = await Greetings.greetedUsersCount(userName)
        let msg = 'Hello, ' + userName + ' has been greeted ' + namesList + ' times '
        res.render("counter", {
            message: msg
        });
    }

    async function Reset(req, res) {
        await Greetings.clearValues()
        res.redirect("/")

    }

    return {
        toGreet,
        home,
        namesGreeted,
        eachUser,
        Reset

    }
}