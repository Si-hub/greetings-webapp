module.exports = function greetings() {
    var object = {};

    function errorMessage() {
        if (userName === "") {
            return "please enter your name and select language"
        }
    }
    function greet(name, language) {

        //if you forgot to type a name but you did select a language do the following//
        if (!name) {
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

        var take = name.toUpperCase().charAt(0) + name.slice(1);   //convert all string typed in lower cases 
        if (object[take] === undefined) {  //"undefined" if someone didnt put anything 
            object[take] = 0;            // dont increase the counter
        }
        if (object[take] === 1) {

        }
        else {
            object[take] += 1;
        }

        if (language === "IsiXhosa") {   // greet a person with his language followed by name
            return "Molo " + take;
        }
        if (language === "English") {
            return "Good day " + take;
        }
        if (language === "Afrikaans") {
            return "Goeie daag " + take;
        }
    }

    function getNames() {
        return object;
    }

    function greetingsCounter() {
        var calculate = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {  //use for...in statement to loop through 
                calculate++;                //the properties of an object
                // also use "hasOwnProperty" method to check whether if the
            }               //property(key) belongs to the object
        }
        return calculate;
    }

    function eachUserCounter(name) {
        // use for..in loop to iterate over an object (objects store properties)      
        for (var key in object) { //"key" in obj: To check if a property with the given key exists 
            if (key === name) {   
              var element = object[key] //Square brackets allow us to take the key from a variable object                
                
            }                           //values that are inside the object
        }
        return element;
    }

    function clean() { //i will use this function to clean up my 
        object = {};  // localstorage with "localstorage.clear()"
    }
    return {
        errorMessage,
        greet,
        greetingsCounter,
        clean,
        getNames,
        eachUserCounter,

    }
}