const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function(e) {
    e.preventDefault();
const guess = letterInput.value;
message.innerText = "";
const goodGuess = correctInput(guess);

if (goodGuess) {
    makeGuess(guess);
}
letterInput.value = ""; 
});

const correctInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
message.innerText = "Enter a letter please.";
    } else if (input.length >1) {
     message.innerText = "Please, enter only one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only please!";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Try again, you guessed that already :)"
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};