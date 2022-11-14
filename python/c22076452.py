import copy

# Exercise 1 - Iris Species Classifier


def exercise1(SepalLen, SepalWid, PetalLen, PetalWid):
    # Species decision tree
    if (PetalLen < 2.5):
        return "setosa"
    else:
        if (PetalWid < 1.8):
            if (PetalLen < 5.0):
                if (PetalWid < 1.7):
                    return "versicolor"
                else:
                    return "virginic"
            else:
                if (PetalWid >= 1.6):
                    if (SepalLen < 7.0):
                        return "versicolor"
                    else:
                        return "virginic"
                else:
                    return "virginic"
        else:
            if (PetalLen < 4.9):
                if (SepalLen < 6.0):
                    return "versicolor"
                else:
                    return "virginic"
            else:
                return "virginic"

# Exercise 2 - Dog Breeds Standards


def exercise2(breed, height, weight, male):
    data_table = {
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
    margin = 0.1
    if (male):
        sex_field = "Male"
    else:
        sex_field = "Female"

    # Retrieve dog breed data
    breed_data = data_table[sex_field][breed]
    weight_avg = breed_data["weight"]
    height_avg = breed_data["height"]

    # Compute boundary values
    max_height = height_avg*(1+margin)
    min_height = height_avg*(1-margin)
    max_weight = weight_avg*(1+margin)
    min_weight = weight_avg*(1-margin)

    # Check for standard compliance

    # Out-of-bound version
    if (height > max_height or height < min_height or weight > max_weight or weight < min_weight):
        return False
    else:
        return True

    # In-bound version
    if (height <= max_height and height >= min_height and weight <= max_weight and weight >= min_weight):
        return True
    else:
        return False


# Exercise 3 - Basic Statistics

# Squares a number - helper function for map()
def squared(x):
    return x*x


def median(l):
    sorted_l = sorted(l)  # Sort list to find median
    mid_pos = len(l)//2  # Middle position
    # Negated index to find potential second "mid point" in case of even value length by reverse indexing
    return (sorted_l[mid_pos] + sorted_l[~mid_pos])/2


def average(l):
    return sum(l)/len(l)


def exercise3(l):
    l_squared = list(map(squared, l))  # Square each element
    return [(min(l), average(l), median(l), max(l)),
            (min(l_squared), average(l_squared), median(l_squared), max(l_squared))]


# Exercise 4 - Finite-State Machine Simulator


def exercise4(trans, init_state, input_list):
    return None

# Exercise 5 - Document Stats


def exercise5(filename):
    return None

# Exercise 6 - List Depth


def exercise6(l):
    return None

# Exercise 7 - Change, please


def exercise7(amount, coins):
    return None

# Exercise 8 - Five Letter Unscramble


def exercise8(s):
    return None

# Exercise 9 - Wordle Set


def exercise9(green, yellow, gray):
    return None

# Exercise 10 - One Step of Wordle


def exercise10(green, yellow, gray):
    return None
