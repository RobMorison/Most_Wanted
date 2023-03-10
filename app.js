/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            displayPeople(personFamily, 'Spouse');
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            displayPeople(personDescendants, "descendants")
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people, type) {
    alert(
        people
            .map(function (person) {
                return `${type}: ${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `D.O.B: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

function findPersonFamily(person, people) {
   let spouse = findSpouse(person, people);
   if (spouse != null) {
    return spouse
       }
}




function findSpouse(person, people){
    if (person.currentSpouse != null) {
        let currentSpouse = people.filter(function(element){
            if(element.id === person.currentSpouse){
                return true;
            }
        });
       return currentSpouse
        
    }else{
        alert('This person does not have a spouse.');
       }
}


function findChildren(person,people){
    let foundChildren = people.filter(function(element){
        if(element.parents.includes(person.id)){
            return true
        }
    })
    return foundChildren
}


function findPersonDescendants(person,people,descendants=[]){
    // finds our children
    let arrayOfChildren = people.filter(function(el){
        return el.parents.includes(person.id);
    });
    // checks to see if there was results
    if(arrayOfChildren.length === 0) return [person]
    descendants = [person];
    // for looping over the results from above, now we are looking for grandchildren
    arrayOfChildren.forEach((person) => {
        // ... is called a spread operator, we are using it to hold onto the existing value of descendants 
        // the below logic prevents us from overwriting it with the new results 
        descendants = [...descendants, ...findPersonDescendants(person, people)]
    });
    return descendants;
}

function searchByTraits(people){
    let searchType = promptFor(
        "Do you want to search by multiple traits? 'yes' or 'no'",
        yesNo
    ).toLowerCase()
    let searchResults;
    switch (searchType){
        case "yes":
            searchResults = searchByMultipleTraits(people);
            let personInfo = displayPerson(searchResults[0]);
            alert(personInfo);
            break;
        case  "no":
            searchResults = searchBySingleTrait(people);
            break;
        default:
            app(people);
            break;
    }
    return searchResults
}

// {
//     let foundItems = searchBySingleTrait(people);
//     displayPeople(foundItems, "Response")
// }

function searchBySingleTrait(person, people) {
    let trait = findSingleTrait(person, people);
    if (trait != null) {
        let personInfo = displayPerson(trait[0]);
        alert(personInfo);
    }
    return foundItems
}


function findSingleTrait(people){
    let userInputProp = prompt("Enter search property: 'firstName', 'lastName', 'gender', 'dob', 'height', 'weight', 'eyeColor', 'occupation', 'parents', 'currentSpouse' ");
    let userInputVal = prompt("Enter search value: ");
    let foundItems = people.filter(function(el){
        try{
            if(el[userInputProp] === (userInputVal)){
                return true;
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            if(el[userInputProp] === parseInt(userInputVal)){
                return true;
            }
        }
    })
    return foundItems;

}


function searchByMultipleTraits(people) {
    let results = findSingleTrait(people)
    while (results.length > 1){
        let userInput = prompt("Would you like to narrow your search more?: 'yes' or 'no'")
        if (userInput === 'yes'){
            results = findSingleTrait(results);
           }
        else if (userInput === 'no'){
            break;
           }
        }
        return results
    // while loop, ask the user if they would like to search again
    // if they want to search again call findSingleTrait(results) pass in results rather than the full list of people
    }

