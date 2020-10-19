module.exports = function greetingRoute(pool) {

    const greetings = require('./greetings');
    const Greetings = greetings(pool);

    async function home(req, res) {
        var counter = await Greetings.counter()
        res.render("index", {
            count: counter
        });
    }

    async function toGreet(req, res) {
        var userName = req.body.userName;
        var language = req.body.language;

        if (!userName && !language) {
            req.flash('info', 'please enter your name and select language');
        } else if (!language) {
            req.flash('info', 'please select your language');
        } else if (userName && language) {


            const check = await Greetings.checkName(userName)

            if (check === 0) {
                await Greetings.insertNames(userName)
            } else {
                await Greetings.updateCounter(userName)
            }
            //display my greetings
            var displayMyGreetings = await Greetings.greet(userName, language)
            var counter = await Greetings.counter()

        }

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