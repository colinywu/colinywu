//Blackjack

let textArea = document.getElementById("text-area");
let textWelcome = document.getElementById("welcome");
let gameStatus = document.getElementById("gamestatus");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
let result = document.getElementById("result");
let gameStarted = false,
    gameOver = false, 
    playerWon = false,
    tie = false,
    dealerCards=[],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
 showStatus();

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = loadDeck();
  shuffleDeck(deck);
  playerCards = [getNextCard()];
  dealerCards = [getNextCard()];
  
  
  // textArea.innerText = "Started . . . ";
  showStatus();
  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
});

hitButton.addEventListener('click',function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});


stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function checkForEndOfGame () {
  updateScores();
  if (gameOver) {
    while(dealerScore< playerScore && playerScore<=21 && dealerScore < 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  if (playerScore> 21) {
    playerWon=false;
    gameOver=true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
    if (playerScore === dealerScore) {
      playerWon=true;
      tie = true;
    }
    else {
      playerWon = false;
    }
  }
}
function loadDeck() {
  const d = [];
  const suitNames = ["Spades", "Hearts", "Diamonds", "Clubs"];
  const cardNames = ["Ace", "Two", "Three", "Four", "Fve", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King",];
  
  for (let i = 0; i < suitNames.length; i++) {
  for (let j = 0; j < cardNames.length; j++) {
    let card = {
      suit: suitNames[i],
      value: cardNames[j]
    }
      d.push(card);
    }
  }
  return d;
}
function getNextCard() {
  return deck.shift();
}
  
function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIndex = Math.trunc(Math.random() * deck.length);
    let temp = deck[swapIndex];
    deck[swapIndex] = deck[i];
    deck[i] = temp;
  }
}
function getCardNumericValue(card) {
  switch(card.value) {
    case "Ace":
      return 1;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    case "Ten":
      return 10;
    default:
      return 10;
    
  }
  
}
  
  
  
function getScore(cArray) {
  let score = 0;
  let hasAce = false;
  for (let i=0; i< cArray.length; i++) {
    let card = cArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function showStatus () {
    if (gameStarted) {
        document.getElementById("welcome").style.display="none";
        gameStatus.style.display = "block";

        let dealerCardString = '';
        for (let i=0; i < dealerCards.length; i++) {
            dealerCardString += getCardString(dealerCards[i]) + '\n';
        }
        let playerCardString = '';
        for (let i=0; i < playerCards.length; i++) {
            playerCardString +=getCardString(playerCards[i]) + '\n';
        }
        
        updateScores();
        
        document.getElementById("dealercards").innerText = dealerCardString;
        document.getElementById("playercards").innerText = playerCardString;
        document.getElementById("dealerscore").innerText = dealerScore;
        document.getElementById("playerscore").innerText = playerScore;
        
        let result;
        if (gameOver) {
            if(tie) {
            result = "Lucky tie!";
            } else if (playerWon){
                result = "You win!";
            }
            else {
                result = "Dealer wins!";
            }
        document.getElementById("result").innerText = result;
        
        
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
        }
    } else {
        gameStatus.style.display = "none";
    }
}



// let obj = {
//   a: 3, 
//   b: 4
// }
// function demo(o) {
//   o.a =5;
//   o.b =6;
//   console.log(o.a, o.b);
// }
// demo(obj);
// console.log(o.a, o.b);

// let a = 3, b = 4;
// function demo2 (c, d) {
// c = 5;
// d = 6;
//   console.log(c, d);
// }

// demo2(a, b);
// console.log(a,b);

// let a = [3, 4];
// function demo2 (a) {
// a[0] = 5;
//   console.log(a);
// }

// demo2(a);
// console.log(a);

// let result = 0/0;
// console.log(Number.isNaN(result));

//function/property. DOM. 