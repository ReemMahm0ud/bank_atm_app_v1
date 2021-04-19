'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
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

const display = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1}${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });


};
//display(account1.movements);

const clacdisBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};


//clacdisBalance(account1.movements);

const calcDisSummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter(int => int >= 1).reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

//calcDisSummary(account1.movements);

const createuser = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(function (word) {
      return word[0];
    }).join('');
  })

};

//const user = 'Steven Thomas Williams'; //stw
createuser(accounts);

const updateUI = function (acc) {
  display(acc.movements);

  clacdisBalance(acc);

  calcDisSummary(acc);

};


//events

let currentAcc;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAcc);

  if (currentAcc && currentAcc.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAcc.owner.split(' ')[0]}!`;

    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAcc);


  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  //console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAcc.balance >= amount && receiverAcc.username !== currentAcc.username) {
    currentAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAcc);
  }

});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAcc.movements.some(mov => move >= amount * 0.1)) {
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
  }

  inputLoanAmount = '';
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (currentAcc.username === inputCloseUsername.value && currentAcc.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAcc.username);
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';

});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  display(currentAcc.movements, !sorted);
  sorted = !sorted;
});




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice());
console.log(...arr);
//console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr); */

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`movement ${i+1}: you deposited ${movement}`);
}
else {
  console.log(`movement ${i+1}: you withdrew ${Math.abs(movement)}`);
}
}
console.log('---------------------------------');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`movement ${i+1}: you deposited ${movement}`);
  } else {
    console.log(`movement ${i+1}: you withdrew ${Math.abs(movement)}`);
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

const currenciesUnique = new Set(['usd', 'gbp', 'usd', 'eur', 'eur']);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});*/
/* const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (arr1, arr2) {
  const newArr1 = arr1.slice();
  newArr1.splice(0, 1);
  newArr1.splice(-2, 2);
  const dogs = newArr1.concat(arr2);
  console.log(dogs);
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i+1} is still a puppy 🐶`);
    }
  });


};


checkDogs(dogsJulia, dogsKate); */

/* const eurTOusd = 1.1;

const movementUSD = movements.map(function (mov) {
  return mov * eurTOusd;
});

console.log(movements);
console.log(movementUSD); */

/* const deposit = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposit);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);
console.log(balance); */

/* const max = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max);

const calcAverageHumanAge = function (dogs) {
  const humanAge = dogs.map(function (d) {
    if (d <= 2) {
      return d = 2 * d;
    } else if (d > 2) {
      return d = 16 + d * 4;
    }
  });
  console.log(humanAge);
  const humanAgefilterd = humanAge.filter(function (d) {
    return d >= 18;
  });
  console.log(humanAgefilterd);

  const sumAge = humanAgefilterd.reduce(function (acc, d) {
    return acc + d;
  }, 0);
  console.log(sumAge);

  const averageAge = sumAge / humanAgefilterd.length;
  console.log(averageAge);


};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); */

/* const calcAverageHumanAge = function (arr) {
  const ages = arr.map(d => (d <= 2 ? 2 * d : 16 + d * 4)).filter(d => d >= 18).reduce((acc, d, i, arr) => acc + d / arr.length, 0);
  return ages;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])); */

//ascending
/* movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);
//descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements); */

/* const y = Array.from({
  length: 7
}, () => 1);
console.log(y);

const z = Array.from({
  length: 7
}, (cur, i) => i + 1);

console.log(z);

const dice = Array.from({
  length: 100
}, () => Math.trunc(Math.random() * 6) + 1);
console.log(dice); */

const dogs = [{
    weight: 22,
    curFood: 250,
    owners: ['Alice', 'Bob']
  },
  {
    weight: 8,
    curFood: 200,
    owners: ['Matilda']
  },
  {
    weight: 13,
    curFood: 275,
    owners: ['Sarah', 'John']
  },
  {
    weight: 32,
    curFood: 340,
    owners: ['Michael']
  },
];


dogs.forEach(function (dog) {
  dog.recommend = Math.trunc(dog.weight ** 0.75 * 28)
});
console.log(dogs);


const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
if (sarahDog) {
  if (sarahDog.curFood > (sarahDog.recommend * 0.90) && sarahDog.curFood < (sarahDog.recommend * 1.10)) {
    console.log("sarah's dog eating okay");
  } else {
    console.log("sarah's dog not eating okay");
  }
} else {
  console.log("sarah doesn't have a dog!");
};

const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommend).flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recommend).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`);

console.log(dogs.some(dog => dog.curFood === dog.recommend));
console.log(dogs.some(dog => dog.curFood > (dog.recommend * 0.90) && dog.curFood < (dog.recommend * 1.10)));

const dogOkay = dogs.filter(dog => dog.curFood > (dog.recommend * 0.90) && dog.curFood < (dog.recommend * 1.10));
console.log(dogOkay);

const newDogs = dogs.slice().sort((a, b) => b.recommend - a.recommend);
console.log(newDogs);


/* const createuser = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(function (word) {
      return word[0];
    }).join('');
  })

}; */