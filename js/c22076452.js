/*
Coursework 1 - CMT120 Programming - Cardiff University
Author: Selman Tabet - https://selman.io/
*/

const fs = require('fs');
const { isAnyArrayBuffer } = require('util/types');

module.exports = {

    // Exercise 1 - Iris Species Classifier
    /**
     * Takes dimensions of a flower and returns its species based on the provided measurements.
     * @param {number} SepalLen Sepal Length
     * @param {number} SepalWid Sepal Width
     * @param {number} PetalLen Petal Length
     * @param {number} PetalWid Petal Width
     * @returns {string} Species Name
     */
    exercise1: (SepalLen, SepalWid, PetalLen, PetalWid) => {
    //  Species decision tree
    if (PetalLen < 2.5){return "setosa";}
    else {
        if (PetalWid < 1.8){
            if (PetalLen < 5.0){
                if (PetalWid < 1.7){return "versicolor";}
                else {return "virginic";}
            }
            else {
                if (PetalWid >= 1.6){
                    if (SepalLen < 7.0){return "versicolor";}
                    else{return "virginic";}
                }
                else {return "virginic";}
            }
        }
        else {
            if (PetalLen < 4.9){
                if (SepalLen < 6.0){return "versicolor";}
                else {return "virginic";}
            }
            else {return "virginic";}
        }
    }
    },

    // Exercise 2 - Dog Breeds Standards
    /**
     * Returns whether the dog's measurements conforms to their respective breed's standards.
     * @param {string} breed 
     * @param {number} height 
     * @param {number} weight 
     * @param {boolean} male 
     * @returns {boolean} Conformity result
     */
    exercise2: (breed, height, weight, male) => {
        let dataTable = {
            "Male": {
                "Bulldog": {
                    "height": 15,
                    "weight": 50
                },
                "Dalmatian": {
                    "height": 24,
                    "weight": 70
                },
                "Maltese": {
                    "height": 9,
                    "weight": 7
                }
            },
            "Female": {
                "Bulldog": {
                    "height": 14,
                    "weight": 40
                },
                "Dalmatian": {
                    "height": 19,
                    "weight": 45
                },
                "Maltese": {
                    "height": 7,
                    "weight": 6
                }
            }
        }
        let margin = 0.1 // 10% margin, predefined.

        // Determine sex field
        if (male) {sexField = "Male"}
        else {sexField = "Female"}

        // Retrieve dog breed data
        let breedData = dataTable[sexField][breed]
        let weightAverage = breedData["weight"]
        let heightAverage = breedData["height"]

        // Compute boundary values
        let maxHeight = heightAverage*(1+margin)
        let minHeight = heightAverage*(1-margin)
        let maxWeight = weightAverage*(1+margin)
        let minWeight = weightAverage*(1-margin)

        // Check for standard compliance
        // Out-of-bound implementation
        if ((height > maxHeight) || (height < minHeight) || (weight > maxWeight) || (weight < minWeight)){return false;}
        else {return true;}
    },

    // Exercise 3 - Basic Statistics
    /**
     * Takes a list and applies a variety of statistical operations on it.
     * @param {object} l Array of numbers.
     * @returns {object} Array of arrays containing the results of the operations.
     */
    exercise3: (l) => {
        let lSquared = l.map(x => x**2);
        let lAverage = arrAverage(l)
        let lSquaredAverage = arrAverage(lSquared)
        // Apply max and min functions to arrays
        let lMax = l.reduce(maxArray, -Infinity);
        let lMin = l.reduce(minArray, Infinity);
        let lMaxSquared = lSquared.reduce(maxArray, -Infinity);
        let lMinSquared = lSquared.reduce(minArray, Infinity);
        let result = [[lMin, lAverage, median(l), lMax],
        [lMinSquared, lSquaredAverage, median(lSquared), lMaxSquared]];
        return result;
    },

    // Exercise 4 - Finite-State Machine Simulator
    /**
     * Takes an FSM transition table, an initial state and an input list and returns its output list.
     * @param {object} trans Transition Table
     * @param {string} init_state Initial State
     * @param {object} input_list Input Array
     * @returns {object} Output Array
     */
    exercise4: (trans, init_state, input_list) => {
        let state = init_state; // Set initial state
        let result = [];
        for(let i=0; i<input_list.length; i++){
            let input = input_list[i];
            let lookup = `${state}/${input}`; // Construct lookup key
            let output = trans[lookup]; // Retrieve output from transition table
            let outputSplit = output.split("/");
            state = outputSplit[0]; // Update state
            result.push(outputSplit[1]); // Add output to result
        }
        return result;
    },

    // Exercise 5 - Document Stats
    /**
     * Takes a filename and returns a tuple containing the number of alpha characters, numeric characters, symbol characters, words, sentences and paragraphs.
     * @param {string} filename Relative file path
     * @returns {object} An array containing the number of alpha characters, numeric characters, symbol characters, words, sentences and paragraphs.
     */
    exercise5: (filename) => {
        const data = fs.readFileSync(filename, "utf8");
        let lines = data.split('\n');
        // Initialize counters
        let letterCounter = 0;
        let digitCounter = 0;
        let symbolCounter = 0
        let wordCounter = 0;
        let sentenceCounter = 0;
        for (let i=0; i<lines.length; i++){
            // Remove all non-letter characters (negated alpha set) and measure length
            let lettersOnly = lines[i].replace(/[^a-zA-Z]+/g, '').length;
            let numbersOnly = lines[i].replace(/[^0-9]+/g, '').length;
            let symbolsOnly = lines[i].replace(/[^-'".,]+/g, '').length;
            let sentencesOnly = lines[i].replace(/[^.!?]+/g, '').length;
            var wordsOnly = 0;
            if (lines[i].length != 0){
                wordsOnly = lines[i].match(/(\w+)/g).length;
            }
            // Update counters
            letterCounter += lettersOnly;
            digitCounter += numbersOnly;
            symbolCounter += symbolsOnly;
            wordCounter += wordsOnly;
            sentenceCounter += sentencesOnly;
        }
        var paragraphsCounter = 0;
        var flag = false; // Flag to check if the last paragraph was counted
        for (let j=0; j<lines.length; j++){
            if ((lines[j].length == 0) && (flag == false)){ // New paragraph condition
                paragraphsCounter += 1;
                flag = true;
                continue;
            }
            if (lines[j].length == 0){ // Empty line but not a new paragraph
                continue;
            }
            else{
                flag = false; // Reset flag for next paragraph
            }
        }
        if (flag == false){
            // In case the last paragraph was not counted due to lack of empty line trailing the last paragraph
            paragraphsCounter += 1;
        }
        let result = [letterCounter, digitCounter, symbolCounter, wordCounter, sentenceCounter, paragraphsCounter];
        return result;
    },

    // Exercise 6 - List Depth
    /**
     * Takes a list and returns its depth.
     * @param {object} l List
     * @returns {number} Depth of the list
     */
    exercise6: (l) => {
        var depth = 1  // As far as the first level is concerned, it's already 1
        for (let i=0; i<l.length; i++){
            if (typeof l[i] == 'object'){
                depth += 1  // At this point, there is an extra layer
                // Recursively check for sublists, and update depth depending on whether the sublist goes further in depth.
                depth = Math.max(depth, module.exports.exercise6(l[i]))
            }
        }
        return depth
    },

    // Exercise 7 - Change, please
    /**
     * @param {number} amount Amount
     * @param {number} coins Number of coins
     * @returns {boolean} Whether the amount can be made with the given number of coins.
     */
    exercise7: (amount, coins) => {
        let amt = amount*100; // Convert amount to cents
        // Base cases
        if (coins==0){ // No coins left
            if (amount==0){ // No money and no coins
                return true;
            }
            else{ // Amount left but no coins left
                return false;
            }
        }
        let denominations = [200, 100, 50, 20, 10, 5, 2, 1] // Denominations list
        if (coins == 1){
            if (denominations.includes(amt)){ // Check if amount is one of the denominations
                return true;
            }
            else{
                return false;
            }
        }
        for (let i=0; i<denominations.length; i++){ // Try all denominations against the remaining amount
            // Recursively check if the remaining amount can be made with the remaining coins using the current denomination
            if (module.exports.exercise7((amt-denominations[i])/100, coins-1)){
                return true;
            }
        }
        return false;
    },

    // Exercise 8 - Five Letter Unscramble
    /**
     * @param {string} s The string to be used to construct the candidate set of words.
     * @returns {number} The number of words in the wordle.txt file that can be made from the string.
     */
    exercise8: (s) => {
        const data = fs.readFileSync("test_data/wordle.txt", "utf8");
        let words = data.split('\n');
        
        let permutationsArray = permutations(s);

        let result = new Set();
        permutationsArray.forEach(value => {
            for (let k=0; k<words.length; k++){
                if (value.includes(words[k])){ // Check if word is one of the permutations
                    result.add(words[k]);
                }
            }
        })
        return result.size;
    },

    // Exercise 9 - Wordle Set
    /**
     * Takes the green and yellow objects along with a gray wordle set, and returns the cardinality of the set of words that match the specifications.
     * @param {object} green Green object (key: position, value: letter)
     * @param {object} yellow Yellow object (key: letter, value: set of letter positions)
     * @param {Set<string>} gray Gray letter set
     * @returns {number} Cardinality of the wordle set
     */
    exercise9: (green, yellow, gray) => {
        words = generateWordleSet(green,yellow,gray);
        return words.size;
    },

    // Exercise 10 - One Step of Wordle
    exercise10: (green, yellow, gray) => {
        return undefined;
    },
}

/*
############################################ 
            Auxiliary functions
############################################
*/

// ----- Exercise 3 helper functions ----- //
function median(array) {
    let sortedArray = array.sort((a, b) => a - b)
    let arrayLength = sortedArray.length
    if (arrayLength % 2 == 0) { // Two midpoint values to even out
        return (sortedArray[arrayLength/2] + sortedArray[arrayLength/2 - 1])/2
    }
    else {
        return sortedArray[Math.floor(arrayLength/2)]
    }
}

function maxArray(total,item) {
    return Math.max(total,item);
}

function minArray(total,item) {
    return Math.min(total,item);
}

function sumArray(total, item) {
    return total + item;
  }

function arrAverage(array) {
    return array.reduce(sumArray)/array.length;
}


// ----- Exercise 8 helper function ----- //
/**
 * This function takes a string as input and returns an array of all possible permutations of the string.
 * @param {string} input The string to be shuffled
 * @returns {object} Array of all possible permutations of the string
 */
function permutations(input) {
    var results = [];
    if (input.length === 1) { // Base case
        results.push(input);
        return results;
    }
    for (let i = 0; i < input.length; i++) {
        let firstChar = input[i]; // Fix current character
        let charsRemaining = input.substring(0, i) + input.substring(i + 1); // Slice the remaining characters
        let innerPermutations = permutations(charsRemaining); // Recursively call permutations on the remaining characters
        for (let j = 0; j < innerPermutations.length; j++) {
            results.push(firstChar + innerPermutations[j]); // Combined fixed character with permutations of remaining characters
        }
    }
    return results;
};

// ----- Exercise 9 (and 10) helper function ----- //
/**
 * Takes the green and yellow dictionaries along with a gray wordle set, and returns a set of words that match the specifications.
 * @param {object} green Green object (key: position, value: letter)
 * @param {object} yellow Yellow object (key: letter, value: set of letter positions)
 * @param {Set<string>} gray Gray letter set
 * @returns {Set<string>}
 */
function generateWordleSet(green, yellow, gray) {
    const data = fs.readFileSync("test_data/wordle.txt", "utf8");
    let words = new Set(data.split('\n')); // To be used throughout the colored filtration process
    let wordsArray = Array.from(words); // Will be iterated over to compare and remove words from the "words" Set object

    let greenIndices = Object.keys(green); // To be used to check for green letters in words
    let yellowLetters = Object.keys(yellow); // To be used to check for yellow letters in words

    for (let i=0; i<wordsArray.length; i++){
        let word = wordsArray[i]; // Current word to be checked

        let grayFilter = false; // Gray filter flag
        for (let j = 0; j<word.length; j++){
            if (gray.has(word[j])){ // Wrong letter ==> Wrong word
                grayFilter = true; // Flag set for word removal
                break;
            }
        }
        if (grayFilter){ // Word removal
            words.delete(word);
            continue;
        }

        let yellowFilter = false; // Yellow filter flag
        yellowLetters.forEach(yellowLetter => { // Check all yellow letters
            if (!word.includes(yellowLetter)){ // Yellow letter not present in word ==> Wrong word
                yellowFilter = true; // Flag set for word removal
            }
        })
        if (yellowFilter){ // Word removal
            words.delete(word);
            continue;
        }

        let greenFilter = false; // Green filter flag
        for (let j=0; j<greenIndices.length; j++){ // Check all green indices
            if (word[greenIndices[j]] != green[greenIndices[j]]){ // Mismatched letters in the same index
                greenFilter = true; // Flag set for word removal
                break;
            }
        }

        if (greenFilter){ // Word removal
            words.delete(word);
            continue;
        }
    }

    // The final filter; removes all words that have yellow marked letters in what we know to be the wrong position.
    let result = words;
    words.forEach(word => {
        for (let i=0; i<word.length; i++){
            if (yellowLetters.includes(word[i])){
                let letterIndices = yellow[word[i]]; // Retrieve known wrong positions of the correct letter
                if (letterIndices.has(i)){ // Check if the current index is in the set of known wrong positions
                    result.delete(word); //Correct letter in the wrong position
                    break;
                }
            }
            else continue; // Untested letter, move on to the next one.
        }
    })
    return words;
}