const letterElements = document.querySelectorAll('.letter');
const answerSection = document.getElementById('answer-section');

let wrongAttempts = 0;
const maxAttempts = 6; 
const words = ['SEFACTORY', 'FSW', 'FCS', 'ASSIGNMENT', 'JAVASCRIPT', 'CSS','HTML','BDD'];

let chosenWord = '';
let displayWord = '';

function loadGame(){
    wrongAttempts=0;
    letterElements.forEach(letter => {
        letter.addEventListener('click', letterClicked);
      });
    document.addEventListener('keypress', handleKeyPress);
    hang.innerHTML='<img src="./assets/hang.svg" class="stand" />';
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayWord='';
    for (let i = 0; i < chosenWord.length; i++) {
    displayWord += '-';
    }
    console.log('Debug1');
    answerSection.textContent = displayWord;
}

const displayBodyPart = () => {
  if (wrongAttempts === 1) {
    head();
  } else if (wrongAttempts === 2) {
    body();
  } else if (wrongAttempts === 3) {
    leftHand();
  } else if (wrongAttempts === 4) {
    rightHand();
  } else if (wrongAttempts === 5) {
    leftLeg();
  } else if (wrongAttempts === 6) {
    rightLeg();
  }
};

const handleLetter = (letter) => {
    console.log('Letter clicked or typed:', letter);

    let letterFound = false;
    let displayWordArray = displayWord.split('');

    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            displayWordArray[i] = letter;
            letterFound = true;
        }
    }

    if (!letterFound) {
        wrongAttempts++;
        displayBodyPart();
        if (wrongAttempts === maxAttempts) {
            setTimeout(function(){
              alert('Game over!');
              loadGame();
            },700);  
        }
    } 
    else {
        displayWord = displayWordArray.join(''); 
        answerSection.textContent = displayWord;
        console.log(displayWord);
        console.log(chosenWord);
        if (displayWord === chosenWord) {
            console.log('debug3');
            answerSection.textContent = displayWord;
            console.log('debug4');
            answerSection.innerHTML=chosenWord;
            setTimeout(function(){
                alert('Congratulations! You won');
                loadGame();
            },700); 
        }
    }
};













const letterClicked = (event) => {
  const clickedLetter = event.target.textContent.toUpperCase();
  handleLetter(clickedLetter);
  event.target.removeEventListener('click', letterClicked);
};

const handleKeyPress = (event) => {
  const pressedKey = event.key.toUpperCase();
  if (/^[A-Z]$/.test(pressedKey)) {
    handleLetter(pressedKey)
  }
};

loadGame();