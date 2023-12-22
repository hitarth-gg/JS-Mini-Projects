'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Hitarth Rajput',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/* ------------------ display movements ----------------- */
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // remember that we don't want to sort the original array but only want to display the sorted list so we'll make the copy the array using slice()
  const movs = sort ? movements.slice().sort((a,b) => b-a) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
/* ------------------------------------------------------ */

/* ------------------ create usernames ------------------ */
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.slice(0, 1))
      .join('');
  });
};
// note that acc.username = ... is creating a new property in the object
createUsernames(accounts);
/* ------------------------------------------------------ */

/* --------- calc print balance (total balance) --------- */
const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;

  acc.balance = balance;
};
/* ------------------------------------------------------ */

/* ---------------- calc display summary ---------------- */

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`; // since money is coming out therefore no need of adding the negative sign

  // lets assume that this bank pays out an interest each time there is a deposit in the bank account, interest rate is 1.2% of the deposited amt (fictional bank hai bhai seriously mat lena zada uwu)

  const interest = acc.movements
    .filter(mov => mov > 0)
    .reduce((accu, mov) => accu + mov * (acc.interestRate / 100), 0);
  labelSumInterest.textContent = `${interest}€`;
};

/* ------------------------------------------------------ */

/* ------------------- Event Handlers ------------------- */
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //event parameter
  e.preventDefault(); // we are doing this because the default behaviour of a button in a form element is to reload the page after the submit button has been clicked and we do not want this to happen
  
  
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
    );
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
    document.querySelector('.help').style.display = 'none';
      // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  }
  // clear fields
  inputLoginUsername.value = inputLoginPin.value = '';

  // to lose focus from the PIN input field (otherwise login karne par cursor wahi blink karta rahega which kinda ugly)
  inputLoginPin.blur();

  updateUI(currentAccount);
  
});

const updateUI = function updateUI(currentAccount) {
  // display movements
  displayMovements(currentAccount.movements);
  // display balance
  calcDisplayBalance(currentAccount);
  // display summary
  calcDisplaySummary(currentAccount);
}

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
    inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // update the UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  // we will only be provided with a loan if there is at least one deposit which is greater than 10% of the loan amt
  if(amount > 0 && currentAccount.movements.some(mov => mov > 0.1 * amount))
  {
    // add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
})

btnClose.addEventListener('click', function (e){
  e.preventDefault();
  
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin)
  {
    const index = accounts.findIndex(acc => acc.username == currentAccount.username)
    // delete account
    accounts.splice(index, 1);
    // logout the user (hide the ui)
    containerApp.style.opacity = 0;
    // console.log(index);
    // console.log(accounts);
  }
  inputCloseUsername.value = inputClosePin.value = '';
  document.querySelector('.help').style.display = 'flex';
});

let sorted = false;
btnSort.addEventListener('click', function(e)
{
  e.preventDefault();
  // sorted = sorted == true ? false : true;
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/* ------------------------------------------------------ */



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
