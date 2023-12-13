'use strict';

//here math.trunc()will remove decimal (doesn't round off the number) & we do +1 so that '20' is also present in the domain as math.random gives a number b/w 0 and 1 so if we multiply by 20 then the max number that we can get will be 19.99999 only.
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);

let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
//   console.log(guess);

  if (!guess) 
  {
    document.querySelector('.message').textContent = 'No Number 😡😡';
  }

  else if (guess === secretNumber)
  {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    score++;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent= secretNumber;

    // we have to use strings while using .style props
    // also, use camelCase notation with .style props
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    document.querySelector('.check').disabled=true;
    document.querySelector('.check').style.backgroundColor= '#cccccc'

    if (score > highscore)
    {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
    }

  }

  else if (guess !== secretNumber)
  {
    if (score > 1)
    {
        document.querySelector('.message').textContent = (guess > secretNumber ? '📈 Too High!' : '📈 Too Low!');
        score--;
        document.querySelector('.score').textContent = score;
    }
    else
    {
        document.querySelector('.message').textContent = '😭 You Lost the Game';
        document.querySelector('.score').textContent = 0;
    }
  }
  
});


document.querySelector('.again').addEventListener('click', function(){
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    console.log(secretNumber);
    document.querySelector('.guess').value='';
    document.querySelector('.number').textContent='?';
    document.querySelector('.score').textContent=score;
    document.querySelector('.message').textContent='Start guessing...';
    document.querySelector('body').style.backgroundColor='#222';
    document.querySelector('.number').style.width='15rem';
    document.querySelector('.check').disabled=false;
})
