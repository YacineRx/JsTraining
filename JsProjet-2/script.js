"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};



const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];


// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);



/////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

function displayMovements(movementsTable) {
  containerMovements.innerHTML = ""
  movementsTable.forEach((mov) => {
    const type = mov > 0 ? "deposit" : "withdrawal"
    // console.log(mov, type);
    const html = ` 
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">2 deposit</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}.00€</div>
    </div>`;
    containerMovements.insertAdjacentHTML("beforeend" ,html)
  })
}
function caclDisplaySummary(movementsTable) {
  // Cacl & Display Incomes
  let incomes = 0;
  movementsTable.forEach((mov) => {mov > 0 ? incomes += mov  : incomes+= 0})
  labelSumIn.textContent = `${incomes}.00€`

  // Calc & Display Outcomes

  const outcomes = Math.abs(movementsTable.filter((mov) => mov < 0).reduce((acc, curr, _ ) => acc + curr ));
  // console.log(outcomes);
  labelSumOut.textContent = `${outcomes}.00€`;

}

function createUsernames (accounts) {
  accounts.forEach(acc =>
      acc.username = acc.owner.toLowerCase().split(" ").map(str => str[0]).join(""))
}
createUsernames(accounts)


function caclBalance (acc) {
  const currentBalance = acc.movements.reduce((acc, curr) => acc + curr)
  labelBalance.textContent = `${currentBalance}.00€`;
  acc.balance = currentBalance;
}
// accounts.forEach((acc) => {
//  caclBalance(acc)
// })

// 

let currentAccount;

function updateUI(currentAccount) {
  displayMovements(currentAccount.movements)
  caclBalance(currentAccount);
  caclDisplaySummary(currentAccount.movements);
}

btnLogin.addEventListener("click", function(e) {
  e.preventDefault()
  const user = inputLoginUsername.value;
  const userPin = inputLoginPin.value;

  const verifAccount= accounts.find((acc) => acc.username == user && acc.pin == userPin);

  inputLoginUsername.value = inputLoginPin.value = "";
  if (verifAccount == undefined) return;
  currentAccount = verifAccount;

  labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(" ")[0]}`
  document.querySelector(".app").style.opacity = 1;

  updateUI(verifAccount)

})

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const transferAccount = inputTransferTo.value;
  const transferAmount = inputTransferAmount.value;

  inputTransferTo.value = inputTransferAmount.value = ""

  // Verif if transferAccount exist & if the current account has enough amount
  const transferVerif = accounts.find((acc) => acc.username == transferAccount)

  if (transferVerif == undefined) {
    console.log("This current does not exists");
    return;
  }

  if (transferAmount >= currentAccount.balance && transferAmount > 0) {
    console.log("You can't transfer");
    return
  }
  // Enlever transferAMount form the current account's movement
  currentAccount.movements.unshift(-transferAmount);
  console.log(currentAccount.movements);

  // Add it to transferAccount's movement table
  transferVerif.movements.unshift(transferAmount)

  updateUI(currentAccount)
})


btnLoan.addEventListener("click", function(e){
  e.preventDefault();
  const loanAmount = inputLoanAmount.value;

  
  currentAccount.movements.unshift(+loanAmount);
  setTimeout(function(){
    updateUI(currentAccount)
  }, 5000)


  console.log(+loanAmount);
})

document.addEventListener("keydown", function(e) {
  if (e.key == "Escape") {
    document.querySelector(".app").style.opacity = 0;
    console.log("keydown");
  }
})

const date = new Date();


// const tableTest = "abd-xyz-qsdf".split("-");
// const stringTest = ["qsdf", "abd", "xyz"].join("-");

// const mapTest = ["qsdf", "abd", "xyz"].map((str) => str[0]);
// const mapTest2 =  ["qsdf", "abd", "xyz"].forEach((str) => str[0]);
