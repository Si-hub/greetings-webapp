const assert = require('assert');
const Greet = require('./greetings');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://sim:pg123@localhost:5432/greet_test';

const pool = new Pool({
    connectionString
});

describe('The Greet function', function() {

    beforeEach(async function() {
        // clean the tables before each test run
        await pool.query("delete from greet_me;");

    });

    it('should greet the user with the language selected', async function() {

        // the Factory Function is called greet
        let greetings = Greet(pool);
        assert.equal("Good day John", await greetings.greet('John', "English"))


    });

    it('should be able to greet the user with different languages', async function() {

        let greetings = Greet(pool);
        assert.equal("Good day John", await greetings.greet('John', "English"))
        assert.equal("Molo Simthera", await greetings.greet('Simthera', "IsiXhosa"))
        assert.equal("Goeie daag Angelo", await greetings.greet('Angelo', "Afrikaans"))
    });
    it('should return an error message if user didnt enter a name', async function() {

        let greetings = Greet(pool);
        assert.equal('Please put your name', await greetings.greet('', "English"))
    })

    it('should return an error message if user didnt select a language', async function() {

        let greetings = Greet(pool);
        assert.equal(undefined, await greetings.greet('Andre', ""))
    })

    it('should be able to count for each user that is greeted', async function() {

        let greetings = Greet(pool);
        await greetings.insertNames('Simthera')
        await greetings.insertNames('John')
        await greetings.insertNames('Michelle')
        assert.equal(3, await greetings.counter())
    })

})

describe('Insert names and Get names on database', function() {

    it('should insert name and update counter for john', async function() {

        let greetings = Greet(pool);
        var name = await greetings.checkName('John');

        if (name === 0) {
            await greetings.insertNames('John')
            await greetings.insertNames('John')
            await greetings.insertNames('John')

        } else {
            await greetings.updateCounter("John");
        }


        assert.equal(3, await greetings.counter())
    })


    after(function() {
        pool.end();
    })
})