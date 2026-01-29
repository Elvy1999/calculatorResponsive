// document variables
const calcHistory = document.querySelector(".calculator__history");
const calcResult = document.querySelector(".calculator__result");
const keys = document.querySelector(".calculator__keys");

// local variables
let textStream = "";
let operatorFlag = false;
let calcResultLocal;

// Create an event listener on the .calculator__keys container
// and use event delegation to determine which child .key
// element was clicked. The clicked element is stored in
// the variable "key" and its data attributes are used
// to determine whether it is a number, operator, or action.

keys.addEventListener("click", (e) => {
  const key = e.target;
  if (!key.classList.contains("key")) return;

  const number = key.dataset.number;
  const operator = key.dataset.operator;
  const action = key.dataset.action;

  if (number != null) {
    console.log("I am a number: " + number);
    numberKey(number);
  }
  if (operator != null) {
    console.log("I am a operator: " + operator);
    operatorKey(operator);
  }
  if (action != null) {
    console.log("I am an action: " + action);
    actionKey(action);
  }
});

function numberKey(number) {
  textStream += number;
  calcResult.innerHTML = textStream;
  operatorFlag = false;
}

function operatorKey(operator) {
  if (operatorFlag == false) {

    textStream += operator;
    calcResult.innerHTML = textStream;
    operatorFlag = true;
  }
}

function actionKey(action) {
  if (action == "clear") {
    calcHistory.innerHTML = 0;
    calcResult.innerHTML = 0;
    runningTotal = 0;
    textStream = "";
  }
  if (action == "equals") {
    equalsEvaluation();
  }
}

function equalsEvaluation() {
  let divideZeroFlag = false;
  let numbersList = [];
  let operandList = [];
  const operators = ["+", "-", "*", "/"];
  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  let temp = "";
  for (let val of textStream) {
    if (!operators.includes(val)) temp += val;
    else {
      numbersList.push(Number(temp));
      temp = "";
      operandList.push(val);
    }
  }
  numbersList.push(Number(temp)); // adds the last number to the numbersList
  // Performing the calculation
  let runningTotal = numbersList.shift();
  while (numbersList.length != 0) {
    console.log(numbersList);
    let secondNum = numbersList.shift();
    let operation = operandList.shift();
    if (operation == "/" && secondNum == 0) {
      calcResult.innerHTML = "Cant do that boo";
      divideZeroFlag = true;
      textStream = "";
      break;
    }
    runningTotal = operations[operation](runningTotal, secondNum);
  }
  //calcResultLocal = runningTotal;
  //calcHistory.innerHTML = runningTotal;
  if (divideZeroFlag == false) {
    calcResultLocal = runningTotal;
    calcResult.innerHTML = runningTotal;

  }
}
