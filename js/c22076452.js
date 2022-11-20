const fs = require('fs');

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
        return undefined;
    },

    // Exercise 4 - Finite-State Machine Simulator
    exercise4: (trans, init_state, input_list) => {
        return undefined;
    },

    // Exercise 5 - Document Stats
    exercise5: (filename) => {
        return undefined;
    },

    // Exercise 6 - List Depth
    exercise6: (l) => {
        return undefined;
    },

    // Exercise 7 - Change, please
    exercise7: (amount,coins) => {
        return undefined;
    },

    // Exercise 8 - Five Letter Unscramble
    exercise8: (s) => {
        return undefined;
    },

    // Exercise 9 - Wordle Set
    exercise9: (green,yellow,gray) => {
        return undefined;
    },

    // Exercise 10 - One Step of Wordle
    exercise10: (green,yellow,gray) => {
        return undefined;
    },
}
