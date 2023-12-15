'use strict';

/* ----------------- selecting elements ----------------- */
// 'El' stands for element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
/* ------------------------------------------------------ */
let score, currentScore, activePlayer, playing;
/* ----------------- starting conditions ---------------- */
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
/* ------------------------------------------------------ */

/* ---------------------- functions --------------------- */
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    //toggle: adds the class if it's not present & removes the class if it is present.
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

/* ------------------------------------------------------ */

/* ------------- rolling dice functionality ------------- */
btnRoll.addEventListener('click', function () {
  if (playing)
  {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
  
    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
  
    // 3. Check if the roll is 1 : id true, switch to next player.
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch to next player and reset the score
      switchPlayer();
  
      
    }
  }
});
/* ------------------------------------------------------ */

/* --------------------- hold button -------------------- */
btnHold.addEventListener('click', function() {
  if (playing)
  {
    // 1. Add current score to active player's global score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    
    // 2. Check if player's score is >= 20;
    if (score[activePlayer] >= 20) // finish game
    {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    else // switch to the next player
    {
      switchPlayer();
    }
  }
});
/* ------------------------------------------------------ */

/* ------------------- new game button ------------------ */
btnNew.addEventListener('click', init);
