const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
  };

  getWord();

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function (e) {
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
        countRemainingGuesses(guess);
        showGuessedLetters();
        updatedWord(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      guessedLettersElement.append(li);  
    }
};

const updatedWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
            if (guessedLetters.includes(letter)) {
                revealWord.push(letter.toUpperCase());
             } else {
      revealWord.push("●");
    }
            
        }
         // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfIWon();
};

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, there's no ${guess}.`;
        remainingGuesses -= 1;
    } else { 
        message.innerText = `The letter  ${guess} is in the word.`;
     }

     if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
     } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
     }
};

    const checkIfIWon = function () {
        if (word.toUpperCase() === wordInProgress.innerText) {
            message.classList.add("win");
            message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
           
            startOver();  
        }
    };

const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    getWord();

    guessLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});
