// document variables
const calcHistory = document.querySelector(".calculator__history");
const calcResult = document.querySelector(".calculator__result");
const keys = document.querySelector(".calculator__keys");

// local variables
let textStream = "";
let operatorFlag = false;

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
    textStream = "";
  }
}
