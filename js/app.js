/*
 * Create a list that holds all of your cards
 */
const icons=[
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube"
];

const cardsContainer = document.querySelector(".deck");

//array to hold openedCards
let openedCards= [];
//array to hold matchedCards
let matchedCards= [];

//start the game for first time
 init();
//initialize
function init(){
//create cards
const array = shuffle(icons);
for(let i=0; i<icons.length; i++)
{
const card = document.createElement("li");
card.classList.add("card");
card.innerHTML = `<i class="${icons[i]}"></i>`;
cardsContainer.appendChild(card);

//Add click event to each cards
click(card);
}
}

//click event
function click(card) {
card.addEventListener("click",function()
{
    const currentCard= this;
    const previousCard= openedCards[0];

//if there exist an open card
if(openedCards.length === 1)
{
    
    card.classList.add("open" , "show" , "disable");
    openedCards.push(this);

//compare the 2 opened cards
compare(currentCard, previousCard);

}
//no opened cards
else
{
    currentCard.classList.add("open" , "show" , "disable");
     openedCards.push(this);
}

});
}

//compare the cards
function compare(currentCard, previousCard){
    if(currentCard.innerHTML=== previousCard.innerHTML)
{
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    //push the matched cards
    matchedCards.push(currentCard,previousCard);
    //variable for card matches
    let matching = document.querySelectorAll('.match').length;
    // open the modal if all cards match
            if (matching === 16) {
              matchedCards = 1;
              modal.style.display = 'block';
              clearTimeout(timing);
            }
    openedCards= [];
   }
else
{
    
    //wait for 500ms
    setTimeout(function() {
    
    currentCard.classList.remove("open" , "show" , "disable");
    previousCard.classList.remove("open" , "show" , "disable");
    },500);
    
    openedCards= [];
}
 }

 // Timer
  let timer = document.querySelector(".timer");
  let timing;
  let minute = 0;
  let second = 0;

  function startTimer() {
    timing = window.setInterval(function () {
      timer.innerHTML = minute + " mins " + second + " secs ";
      let timeTook = document.querySelector('.timer').innerText;
      //console.log(timeTook);
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
      var youWin = document.querySelector('.content');
      youWin.innerHTML = `Congratulations! you win *_* Your score is ${starCount}, it took you ${timeTook} to finish,you made ${moves} moves...play again?`;
      console.log(timeTook);
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timing);
  }
  startTimer();
  document.querySelector(".restart").addEventListener("click", resetTimer);


// move counter and star rating
let moves = 0;
let moveCounter = document.querySelector(".moves");
let starOne = document.querySelector("#sO");
let starTwo = document.querySelector("#sT");
let starCount = 3;

function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
  console.log(moves);
  // remove stars as the move count goes higher
  if (moves > 8 && moves <= 12) {
    starOne.style.display = 'none';
    starCount = 2;
    console.log(starCount);
  } else if (moves > 13) {
    starTwo.style.display = 'none';
    starCount = 1;
    console.log(starCount);
  }
}

//modal
var modal = document.getElementById('myModal');
// let player restart the game without winning
var replay = document.querySelector('.close');
replay.onclick = function () {
    window.location.reload();
};

//player restart from the modal
var btn = document.querySelector('#playAgain');
btn.onclick = function () {
    window.location.reload();
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
