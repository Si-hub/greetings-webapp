module.exports = function greetings(pool) {

    async function greet(name, language) {
        var username = name.toUpperCase().charAt(0) + name.slice(1);
        //if you forgot to type a name but you did select a language do the following//
        if (!username) {
            if (language === "IsiXhosa") {
                return "Nceda ufake igama lakho"
            }
            if (language === "English") {
                return "Please put your name"
            }
            if (language === "Afrikaans") {
                return "Plaas jou naam"
            }
        }


        if (language === "IsiXhosa") { // greet a person with his language followed by name
            return "Molo " + username;
        }
        if (language === "English") {
            return "Good day " + username;
        }
        if (language === "Afrikaans") {
            return "Goeie daag " + username;
        }
    }

    async function insertNames(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1);
        const insertUsers = await pool.query('INSERT INTO greet_me (name, greet_counter) VALUES($1,$2)', [name, 1])
            // return insertUsers.rows;
    }

    async function getNames() {
        const users = await pool.query('select name from greet_me ')
        return users.rows;
    }


    async function checkName(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1);
        const users = await pool.query('select name from greet_me where name=$1', [name])
        return users.rowCount;
    }
    async function updateCounter(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1);
        const userCounter = await pool.query('update greet_me set greet_counter = greet_counter + 1 where name=$1', [name]); /*update records */
        return userCounter.rows
    }

    async function counter() {
        const count = await pool.query('select greet_id from greet_me')
        return count.rowCount
    }

    async function greetedUsersCount(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1);
        const greetedUsers = await pool.query('select greet_counter from greet_me where name=$1', [name])

        if (greetedUsers.rowCount === 1) {
            return greetedUsers.rows[0].greet_counter

        } else {
            return 0;
        }
    }



    async function clearValues() {
        await pool.query("delete from greet_me")
    }
    return {
        insertNames,
        greet,
        updateCounter,
        clearValues,
        getNames,
        // eachUserCounter,
        // setName,
        checkName,
        counter,
        greetedUsersCount
    }
}