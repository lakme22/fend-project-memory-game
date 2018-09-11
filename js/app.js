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

//firstClick indicator
let firstClick= true;
//click event
function click(card) {
card.addEventListener("click",function()
{
    //start timer after firstClick
    if(firstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
            firstClick = false;
        }

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
    
    openedCards= [];

    //call the function for gameover
    isOver();
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
    //add new move
    addMove();
 

}
//game over
function isOver()
{
   if(matchedCards.length === icons.length);
   {
   //stop timer
   stopTimer();
   alert("GAME OVER"); 
   }
}

//Add moves
const movesContainer= document.querySelector(".moves");
let moves= 0;
movesContainer.innerHTML= 0;
function addMove(){
    moves++;
    movesContainer.innerHTML= moves;
    //call rating
    rating();
    
}

//rating
const starsContainer= document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {
    switch(moves){
        case 20:
        starsContainer.innerHTML= `<li><i class="fa-fa-star"></i></li>
        <li><i class="fa-fa-star"></i></li>`;
        break;

        case 25:
        starsContainer.innerHTML= `<li><i class="fa-fa-star"></i></li>`;
        break;
    }  
 }

//Timer
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

// Sets default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';
function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}
function stopTimer() {
    clearInterval(liveTimer);
}

//restart
const restartBtn= document.querySelector(".restart");

    restartBtn.addEventListener("click", function() {
     
        //delete cards
     cardsContainer.innerHTML = "";
     
       //call init
       init();

       //reset any related variables
      resetGame();
    });

function resetGame() {
    // Empty the `matchedCards` array
    matchedCards = [];

    // resets `moves`
    moves = 0;
    movesContainer.innerHTML = moves;

    // resets `rating`
    starsContainer.innerHTML = star + star + star;
    
    stopTimer();
    firstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
}


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
