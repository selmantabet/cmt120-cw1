import copy

"""
Coursework 1 - CMT120 Programming - Cardiff University
Author: Selman Tabet - https://selman.io/
"""

# Exercise 1 - Iris Species Classifier


def exercise1(SepalLen, SepalWid, PetalLen, PetalWid):
    """
    Takes dimensions of a flower and returns its species based on the provided measurements.
    @param SepalLen: Sepal Length
    @param SepalWid: Sepal Width
    @param PetalLen: Petal Length
    @param PetalWid: Petal Width
    """
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
    """
    Returns whether the dog's measurements conforms to their respective breed's standards.
    @param breed: Dog Breed
    @param height: Dog Height
    @param weight: Dog Weight
    @param male: Whether the dog is male or not
    """
    data_table = {
        (True, "Bulldog"): (15, 50),
        (True, "Dalmatian"): (24, 70),
        (True, "Maltese"): (9, 7),
        (False, "Bulldog"): (14, 40),
        (False, "Dalmatian"): (19, 45),
        (False, "Maltese"): (7, 6)
    }
    margin = 0.1  # 10% margin, predefined.

    # Retrieve dog breed data
    height_avg, weight_avg = data_table[(male, breed)]

    # Compute boundary values
    max_height = height_avg*(1+margin)
    min_height = height_avg*(1-margin)
    max_weight = weight_avg*(1+margin)
    min_weight = weight_avg*(1-margin)

    # Check for standard compliance

    # Out-of-bound version - The one being used.
    if (height > max_height or height < min_height or weight > max_weight or weight < min_weight):
        return False
    else:
        return True

    # In-bound version - Bonus implementation (Inactive)
    if (height <= max_height and height >= min_height and weight <= max_weight and weight >= min_weight):
        return True
    else:
        return False


###### Exercise 3 Auxiliary Functions ######

def squared(x):
    """Squares a number - helper function for map()"""
    return x*x


def median(l):
    """Median element from a list"""
    sorted_l = sorted(l)  # Sort list to find median
    mid_pos = len(l)//2  # Middle position
    # Negated index to find potential second "mid point" in case of even value length by reverse indexing
    return (sorted_l[mid_pos] + sorted_l[~mid_pos])/2


def average(l):
    """Average value of a number list"""
    return sum(l)/len(l)


# Exercise 3 - Basic Statistics

def exercise3(l):
    """
    Takes a list and applies a variety of statistical operations on it.
    @param l: List of numbers
    """
    l_squared = list(map(squared, l))  # Square each element
    return [(min(l), average(l), median(l), max(l)),
            (min(l_squared), average(l_squared), median(l_squared), max(l_squared))]


# Exercise 4 - Finite-State Machine Simulator


def exercise4(trans, init_state, input_list):
    """
    Takes an FSM transition table, an initial state and an input list and returns its output list.
    @param trans: Transition Table
    @param init_state: Initial State
    @param input_list: Input List
    """
    state = init_state
    trans_table = {}
    output = []
    # Build transition table in an improved format
    for i in trans:
        trans_table[tuple(i.split("/"))] = tuple(trans[i].split("/"))
    for j in input_list:
        output.append(trans_table[(state, j)][1])  # Append output
        state = trans_table[(state, j)][0]  # Update state
    return output


# Exercise 5 - Document Stats


def exercise5(filename):
    """
    Takes a filename and returns a tuple containing the number of alpha characters, numeric characters, symbol characters, words, sentences and paragraphs.
    @param filename: Relative file path
    """
    with open(filename, "r") as f:
        lines = f.readlines()
        # Initialize lists
        alpha_chars = []
        numeric_chars = []
        symbol_chars = []
        words = []

        # Filter out empty lines
        paragraph_indices = [index for (
            index, item) in enumerate(lines) if item == '\n']

        for i in enumerate(paragraph_indices):
            # Last index case, out of bound otherwise
            if i[0] == len(paragraph_indices)-1:
                break
            if (i[1]+1 == paragraph_indices[i[0]+1]):
                paragraph_indices[i[0]] = -1
        paragraph_fixed = list(filter(lambda x: x != -1, paragraph_indices))
        paragraphs = len(paragraph_fixed) + 1
        # Append filtered strings on a per-line basis
        for i in lines:
            alpha_chars.append(''.join(filter(str.isalpha, i)))
            numeric_chars.append(''.join(filter(str.isnumeric, i)))
            symbol_chars.append(''.join(
                filter(lambda x: not str.isalnum(x) and not str.isspace(x), i)))
            words_formatted = i.strip().replace(
                "\n", "").replace("\r", "").replace("\t", "").replace("'", ".").replace("-", ".").replace(" ", ".").replace(",", ".").split(".")
            # Extending this time because we're handling splitted strings (which are lists)
            words.extend(words_formatted)

        # Filter out empty "words" for word count output
        words = list(filter(lambda x: x != '', words))

        # Combine all strings into one string for character counting.
        all_alpha = ''.join(alpha_chars)
        all_numeric = ''.join(numeric_chars)
        all_symbol = ''.join(symbol_chars)
        sentences = sum(1 for x in all_symbol if (
            x == "?") or (x == "!") or (x == "."))  # Count sentences by counting sentence-terminating symbols

    return (len(all_alpha), len(all_numeric), len(all_symbol), len(words), sentences, paragraphs)


# Exercise 6 - List Depth


def exercise6(l):
    """
    Takes a list and returns its depth.
    @param l: List
    """
    depth = 1  # As far as the first level is concerned, it's already 1
    for i in l:
        if isinstance(i, list):
            depth += 1  # At this point, there is an extra layer
            # Recursively check for sublists, and update depth depending on whether the sublist goes further in depth.
            depth = max(depth, exercise6(i))
    return depth

# Exercise 7 - Change, please


def exercise7(amount, coins):
    """
    Takes an amount and a number of coins and returns whether the amount can be made with the given number of coins.
    @param amount: Amount
    @param coins: Number of coins
    """
    # Base cases
    amt = amount*100  # Convert to cents
    if (coins == 0):  # No coins left
        if (amount == 0):  # No amount left
            return True
        else:  # Amount left but no coins left
            return False
    denominations = [200, 100, 50, 20, 10, 5, 2, 1]
    if (coins == 1):
        if (amt in denominations):  # Check if amount is a valid denomination
            return True
        else:
            return False
    # Recursive case
    for i in denominations:  # Try all denominations against the remaining amount
        # Recursively check if the remaining amount can be made with the remaining coins using the current denomination
        if (exercise7((amt-i)/100, coins-1)):
            return True
    return False


WORDLE_DIR = "test_data/wordle.txt"

global permutations  # Global variable to store permutations
permutations = []  # Initialize empty list on runtime

########## Exercise 8 helper function ##########


def generate_permutations(start, end=[]):
    """
    This function takes a string list as input and returns
    an array of all possible permutations of the string.
    @param start: The string list to be shuffled
    @param end: This is used for recursive calls.
    """
    # Default end value is an empty list, but the argument will be used for recursive calls
    if len(start) == 0:
        permutations.append("".join(end))
    else:
        for i in range(len(start)):
            # Fix the first character, and generate permutations for the rest of the string
            generate_permutations(start[:i] + start[i+1:], end + start[i:i+1])


# Exercise 8 - Five Letter Unscramble


def exercise8(s):
    """
    Takes a string and returns the number of words in the wordle.txt file that can be made from the string.
    @param s: The string to be used to construct the candidate set of words.
    """
    with open(WORDLE_DIR, "r") as f:
        words = f.read().split("\n")

    permutations.clear()  # Clear the global variable to ensure correct results
    generate_permutations(list(s))
    filtered_permutations = list(set(permutations))  # Get rid of duplicates
    permutations.clear()  # Clear the global variable for the next call

    result = []
    for i in filtered_permutations:
        for j in words:
            if j in i:  # Some permutation strings might constitute the word itself
                result.append(j)
    # Duplicates exist since some permutations might constitute the word itself, like "househ" and "hhouse"
    return len((set(result)))


def generate_wordle_set(green, yellow, gray):
    """
    Takes the green and yellow dictionaries along with a gray wordle set, and returns a set of words that match the specifications.
    @param green: Green wordle dictionary (key: position, value: letter)
    @param yellow: Yellow wordle dictionary (key: letter, value: set of letter positions)
    @param gray: Gray wordle set
    """
    with open(WORDLE_DIR, "r") as f:
        words = f.read().split("\n")
    filtered_words = set(words)

    for i in words:
        for j in i:  # Gray filter
            if j in gray:
                filtered_words.remove(i)
                break
        for k in green:  # Green filter
            if i[k] != green[k]:  # Not a match
                try:
                    filtered_words.remove(i)
                except KeyError:  # Already removed from previous filter
                    pass
                finally:
                    break  # No need to check the rest of the word
        for l in yellow:  # Yellow filter
            if l not in i:  # Yellow letter not found
                try:
                    filtered_words.remove(i)
                except KeyError:  # Already removed from previous filter
                    pass
                finally:
                    break  # No need to check the rest of the word

    result = list(filtered_words)

    # The final filter; removes all words that have yellow marked letters in what we know to be the wrong position.
    for i in filtered_words:
        for j in enumerate(i):
            try:
                # Retrieve known wrong positions of the correct letter
                letter_indices = yellow[j[1]]  # <- KeyError failure point
                # Test if the current index is in the set of known wrong positions
                if j[0] in letter_indices:  # Correct letter in the wrong position
                    result.remove(i)
                    break
            except KeyError:  # Untested letter, move on to the next one.
                continue

    return result

# Exercise 9 - Wordle Set


def exercise9(green, yellow, gray):
    """
    Takes the green and yellow dictionaries along with a gray wordle set, and returns the cardinality of the set of words that match the specifications.
    @param green: Green wordle dictionary (key: position, value: letter)
    @param yellow: Yellow wordle dictionary (key: letter, value: set of letter positions)
    @param gray: Gray wordle set
    """
    # Cardinality of the set
    return len(generate_wordle_set(green, yellow, gray))


# Exercise 10 - One Step of Wordle


def exercise10(green, yellow, gray):
    """
    Takes the green and yellow dictionaries along with a gray wordle set, and returns the set of words with the best fit for the configuration.
    @param green: Green wordle dictionary (key: position, value: letter)
    @param yellow: Yellow wordle dictionary (key: letter, value: set of letter positions)
    @param gray: Gray wordle set
    """
    words = generate_wordle_set(green, yellow, gray)  # Retrieve the wordle set
    # This is will store cardinality scores as keys to the set of words with that score
    word_scores = {}

    for v in words:
        # This will store the cardinalities of the wordle sets from all other words' configurations
        cardinalities = []
        # Copy the list to avoid modifying the original
        words_no_v = copy.deepcopy(words)
        # This allows us to scan every OTHER word in the set
        words_no_v.remove(v)

        for w in words_no_v:
            # Define original configuration using the original parameters (copied)
            word_config = {"green": copy.deepcopy(green), "yellow": copy.deepcopy(
                yellow), "gray": copy.deepcopy(gray)}

            for k in enumerate(v):  # v_1,v_2,v_3...
                if k[1] == w[k[0]]:  # v_i = w_i
                    word_config["green"][k[0]] = k[1]
                elif k[1] in w:  # In w but not in the same position
                    try:
                        word_config["yellow"][k[1]].add(k[0])
                    except KeyError:  # New letter, add to yellow dictionary
                        word_config["yellow"][k[1]] = {k[0]}
                else:  # Add to gray set
                    word_config["gray"].add(k[1])
            # Calculate cardinality of the new configuration
            word_cardinality = exercise9(
                word_config["green"], word_config["yellow"], word_config["gray"])
            # Add the cardinality to the list of cardinalities for v
            cardinalities.append(word_cardinality)

        # Calculate the score by summing cardinalities, then add it to the dictionary
        score = sum(cardinalities)
        try:  # In case a word has the same score as another
            word_scores[score].add(v)
        except KeyError:  # New score value, add to dictionary
            word_scores[score] = {v}

    lowest_score = min(word_scores.keys())  # Retrieve the lowest score key
    # Return the set of words with the lowest score
    return word_scores[lowest_score]


"""
This was my first attempt at exercise 7, which is the iterative version.
I have since implemented a recursive version, which is much more elegant.
But I'm keeping this here because I felt too bad to dump it after all the effort I put.
"""


def exercise7_iterative(amount, coins):
    """
    Takes an amount and a number of coins and returns whether the amount can be made with the given number of coins.
    @param amount: Amount
    @param coins: Number of coins
    """
    # The Lookup Table - LUT
    lookup_table = {
        (0.00, 0): 0.0,
        (0.01, 1): 0.01,
        (0.02, 1): 0.02,
        (0.05, 1): 0.05,
        (0.1, 1): 0.1,
        (0.2, 1): 0.2,
        (0.5, 1): 0.5,
        (1, 1): 1,
        (2, 1): 2
    }
    lookup_key = (amount, int(coins))
    if lookup_key in lookup_table:
        return True
    # (0,0) lookup already checked the case where they are both 0
    if coins == 0 or amount == 0:
        return False

    coin_list = [2.0, 1.0, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]
    # Index of the denomination to consider for change (coin_list[cmp])
    cmp = 0
    while (cmp < len(coin_list)):
        # Check if it's perfectly divisible by any single denomination (e.g. amt=50, coin=25)
        for coin in coin_list:
            # Convert from primary unit float to subunit (cents/pennies) integer representation
            condition_1 = int(amount*100) % int(coin*100) == 0
            # Coins must be appropriately exhausted
            condition_2 = int(amount*100) / int(coin*100) == coins
            if (condition_1 and condition_2):
                # If the amount is a multiple of the coin (and fits coin quota), it's possible to make change
                return True

        if (amount >= coin_list[cmp]):
            amount -= coin_list[cmp]
            coins -= 1
            amount = round(amount, 2)  # Python float fix (e.g 1.4-1)
            # This check would prevent an extra iteration earlier.
            if (amount, coins) in lookup_table:
                return True
            elif amount == 0:  # Revert change
                amount += coin_list[cmp]
                coins += 1
                amount = round(amount, 2)  # Python float fix (e.g 1.4-1)
                cmp += 1  # Seek lower denomination instead
                continue
            # Used the highest denomination every time and still need more coins, so, False.
            elif coins == 0:
                return False
            else:
                continue  # Keep trying with the same denomination

        else:
            cmp += 1  # Seek lower denomination
            continue
    """
    The while loop should terminate because of the following:
    - The comparator variable (cmp) is incremented in each case except the else clause.
    meaning that after going through the entire list, the loop guard will turn false.
    - In the else clause, the comparator is not incremented, but the amount and coins variables will be reduced.
     * Sufficiently low amount will trigger the outer else clause, causing a cmp increment.
     * Sufficiently low coins will trigger the inner else-if clause, exiting the function.
    """
    return True
