const fs = require('fs');
const { isAnyArrayBuffer } = require('util/types');

module.exports = {

    // Exercise 1 - Iris Species Classifier
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
    exercise2: (breed, height, weight, male) => {
        let data_table = {
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
        let margin = 0.1
        if (male) {sex_field = "Male"}
        else {sex_field = "Female"}

        // Retrieve dog breed data
        let breed_data = data_table[sex_field][breed]
        let weight_avg = breed_data["weight"]
        let height_avg = breed_data["height"]

        // Compute boundary values
        let max_height = height_avg*(1+margin)
        let min_height = height_avg*(1-margin)
        let max_weight = weight_avg*(1+margin)
        let min_weight = weight_avg*(1-margin)

        // Check for standard compliance

        // Out-of-bound version
        if ((height > max_height) || (height < min_height) || (weight > max_weight) || (weight < min_weight)){return false;}
        else {return true;}
    },

    // Exercise 3 - Basic Statistics
    exercise3: (l) => {
        let l_squared = l.map(x => x**2);
        let l_avg = arrAverage(l)
        let l_squared_avg = arrAverage(l_squared)
        let max_l = l.reduce(maxArray, -Infinity);
        let min_l = l.reduce(minArray, Infinity);
        let max_l_squared = l_squared.reduce(maxArray, -Infinity);
        let min_l_squared = l_squared.reduce(minArray, Infinity);
        let result = [[min_l, l_avg, median(l), max_l],
        [min_l_squared, l_squared_avg, median(l_squared), max_l_squared]];
        return result;
    },

    // Exercise 4 - Finite-State Machine Simulator
    exercise4: (trans, init_state, input_list) => {
        let state = init_state;
        let result = [];
        for(let i=0; i<input_list.length; i++){
            let input = input_list[i];
            let lookup = `${state}/${input}`;
            let output = trans[lookup];
            let output_split = output.split("/");
            state = output_split[0];
            result.push(output_split[1]);
        }
        
        return result;
    },

    // Exercise 5 - Document Stats
    exercise5: (filename) => {
        const data = fs.readFileSync(filename, "utf8");
        let lines = data.split('\n');
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

            letterCounter += lettersOnly;
            digitCounter += numbersOnly;
            symbolCounter += symbolsOnly;
            wordCounter += wordsOnly;
            sentenceCounter += sentencesOnly;
        }
        var paragraphsCounter = 0;
        var flag = false;
        for (let j=0; j<lines.length; j++){
            if ((lines[j].length == 0) && (flag == false)){
                paragraphsCounter += 1;
                flag = true;
                continue;
            }
            if (lines[j].length == 0){
                continue;
            }
            else{
                flag = false;
            }
        }
        if (flag == false){
            // In case the last paragraph was not counted due to lack of empty line
            paragraphsCounter += 1;
        }
        let result = [letterCounter, digitCounter, symbolCounter, wordCounter, sentenceCounter, paragraphsCounter];
        return result;
    },

    // Exercise 6 - List Depth
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
    exercise7: (amount,coins) => {
        let amt = amount*100;
        if (coins==0){
            if (amount==0){
                return true;
            }
            else{
                return false;
            }
        }
        let denominations = [200, 100, 50, 20, 10, 5, 2, 1]
        if (coins == 1){
            if (denominations.includes(amt)){
                return true;
            }
            else{
                return false;
            }
        }
        ;
        for (let i=0; i<denominations.length; i++){
            if (module.exports.exercise7((amt-denominations[i])/100, coins-1)){
                return true;
            }
        }
        
        return false;
    },

    // Exercise 8 - Five Letter Unscramble
    exercise8: (s) => {
        const data = fs.readFileSync("test_data/wordle.txt", "utf8");
        let words = data.split('\n');
        
        let permutation = permutations(s);
        let permutationSet = new Set(permutation);

        let result = new Set();
        permutationSet.forEach(value => {
            for (let k=0; k<words.length; k++){
                if (value.includes(words[k])){
                    result.add(words[k]);
                }
            }
        })
        return result.size;
    },

    // Exercise 9 - Wordle Set
    exercise9: (green,yellow,gray) => {
        words = generateWordleSet(green,yellow,gray);
        return words.size;
    },

    // Exercise 10 - One Step of Wordle
    exercise10: (green,yellow,gray) => {
        return undefined;
    },
}

/*
############################################ 
            Auxiliary functions
############################################
*/

function median(array) {
    let sorted_array = array.sort((a, b) => a - b)
    let array_length = sorted_array.length
    if (array_length % 2 == 0) { // Two midpoint values to even out
        return (sorted_array[array_length/2] + sorted_array[array_length/2 - 1])/2
    }
    else {
        return sorted_array[Math.floor(array_length/2)]
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


function permutations(input) {
    var results = [];
    if (input.length === 1) {
        results.push(input);
        return results;
    }
    for (let i = 0; i < input.length; i++) {
        let firstChar = input[i];
        let charsRemaining = input.substring(0, i) + input.substring(i + 1);
        let innerPermutations = permutations(charsRemaining);
        for (let j = 0; j < innerPermutations.length; j++) {
            results.push(firstChar + innerPermutations[j]);
        }
    }
    return results;
};

function generateWordleSet(green, yellow, gray) {
    const data = fs.readFileSync("test_data/wordle.txt", "utf8");
    let words = new Set(data.split('\n'));
    let wordsArray = Array.from(words);

    let greenIndices = Object.keys(green);
    let greenValues = Object.values(green);
    let yellowLetters = Object.keys(yellow);

    for (let i=0; i<wordsArray.length; i++){
        let word = wordsArray[i];


        let grayFilter = false;
        for (let j = 0; j<word.length; j++){
            if (gray.has(word[j])){
                grayFilter = true;
                break;
            }
        }
        if (grayFilter){
            words.delete(word);
            continue;
        }

        let yellowFilter = false;
        yellowLetters.forEach(yellowLetter => {
            if (!word.includes(yellowLetter)){
                yellowFilter = true;
            }
        })
        if (yellowFilter){
            words.delete(word);
            continue;
        }

        let greenFilter = false;
        for (let j=0; j<greenIndices.length; j++){
            if (word[greenIndices[j]] != green[greenIndices[j]]){
                greenFilter = true;
                break;
            }
        }

        if (greenFilter){
            words.delete(word);
            continue;
        }
    }

    // FINAL FILTER STAGE
    let result = words;
    words.forEach(word => {
        for (let i=0; i<word.length; i++){
            if (yellowLetters.includes(word[i])){
                let letterIndices = yellow[word[i]];
                if (letterIndices.has(i)){
                    result.delete(word);
                    break;
                }
            }
            else continue;
        }
    })
    return words;
}