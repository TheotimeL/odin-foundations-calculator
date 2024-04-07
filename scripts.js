// Calculator variables

let digit1 = null;
let digit2 = null;
let operator = null;

// Basic calculations

let add = (number1, number2) => number1 + number2;
let subtract = (number1, number2) => number1 - number2;
let multiply = (number1, number2) => Math.round(number1 * number2 * 100) / 100;
let divide = (number1, number2) => Math.round((number1 / number2) * 100) / 100;

function calculate(number1, number2, sign) {
  number1 = parseFloat(number1);
  number2 = parseFloat(number2);
  if (isNaN(number1) || isNaN(number2)) {
    alert("Invalid number");
    return 0;
  }
  switch (sign) {
    case "+":
      return add(number1, number2);
    case "-":
      return subtract(number1, number2);
    case "*":
      return multiply(number1, number2);
    case "/":
      return divide(number1, number2);
    default:
      alert("Invalid sign");
      return;
  }
}

// Input handlers

function handleDigitInput(digit) {
  if (digit1 === null) {
    digit1 = digit;
    printOnDisplay(digit1);
  } else if (operator === null) {
    digit1 = digit1 + digit;
    printOnDisplay(digit1);
  } else if (digit2 === null) {
    console.log("digit2", digit2);
    digit2 = digit;
    printOnDisplay(digit2);
    console.log("digit2", digit2);
  } else {
    currentDisplay = getDisplayValue();
    digit2 = currentDisplay + digit;
    printOnDisplay(digit2);
  }
}

function handleOperatorInput(operatorInput) {
  if (digit1 !== null && digit2 !== null && operator !== null) {
    result = handleEqualInput();
    digit1 = result;
    operator = operatorInput;
  } else if (digit1 === null) {
    digit1 = parseFloat(getDisplayValue()) != null ? getDisplayValue() : "0";
    operator = operatorInput;
  } else {
    operator = operatorInput;
  }
  printOnDisplay(digit1 + operator);
}

function handleEqualInput() {
  if (digit1 !== null && digit2 !== null && operator !== null) {
    result = calculate(digit1, digit2, operator);
  } else if (digit1 !== null) {
    result = digit1;
  } else {
    alert("Invalid operation");
  }
  resetOperation();
  printOnDisplay(result);
  return result;
}

function handleDotInput() {
  if (digit1 === null) {
    digit1 = "0.";
    printOnDisplay(digit1);
  } else if (digit2 === null && operator === null) {
    console.log("digit1", digit1);
    if (!digit1.includes(".")) {
      digit1 += ".";
      printOnDisplay(digit1);
    }
  } else if (digit2 === null) {
    console.log("digit1", digit1);
    digit2 = "0.";
    printOnDisplay(digit2);
  } else {
    console.log("digit1", digit1);
    if (!digit2.includes(".")) {
      digit2 += ".";
      printOnDisplay(digit2);
    }
  }
}

function handleBackspaceInput() {
  if (digit1 !== null && digit2 !== null && operator !== null) {
    digit2 = digit2.slice(0, -1);
    printOnDisplay(digit2);
    if (digit2 === "") {
      digit2 = null;
    }
  } else if (digit1 !== null && operator !== null) {
    operator = null;
    printOnDisplay(digit1);
  } else if (digit1 !== null) {
    digit1 = digit1.slice(0, -1);
    printOnDisplay(digit1);
    if (digit1 === "") {
      digit1 = null;
    }
  }
}

function handleMinusInput() {
  if (digit1 === null) {
    digit1 = "-";
    printOnDisplay(digit1);
  } else if (digit2 === null && operator !== null) {
    digit2 = "-";
    printOnDisplay(digit2);
  } else if (digit1 === "-" || digit2 === "-") {
    return;
  } else {
    handleOperatorInput("-");
  }
}

function handleZeroInput() {
  if (getDisplayValue() === "0") {
    return;
  } else if (digit2 !== null || (operator !== null && digit2 === null)) {
    console.log("digit2", digit2);
    handleDigitInput("0");
  } else if (digit1 !== null || (operator === null && digit1 === null)) {
    console.log("digit1", digit1);
    handleDigitInput("0");
  }
}

// Document elements

let display = document.querySelector(".display");
let digitsButtons = document.querySelectorAll(".number-button");
let operatorsButtons = document.querySelectorAll(".symbol-button");
let equalButton = document.getElementById("equal");
let dotButton = document.getElementById("dot");
let acButton = document.getElementById("ac");
let backspaceButton = document.getElementById("backspace");
let minusButton = document.getElementById("minus");
let zeroButton = document.getElementById("zero");
let allButtons = document.querySelectorAll("button");

// Utility functions

function resetOperation(firstDigit = null) {
  if (firstDigit !== null) {
    digit1 = firstDigit.toString();
  } else {
    digit1 = null;
  }
  digit2 = null;
  operator = null;
}

function printOnDisplay(value) {
  if (value.length > 7) {
    resetOperation();
    display.textContent = "toolong";
  } else {
    display.textContent = value;
  }
}

let getDisplayValue = () => display.textContent;

// Event listeners

digitsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let digit = button.textContent;
    handleDigitInput(digit);
  });
});

operatorsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let operator = button.textContent;
    handleOperatorInput(operator);
  });
});

equalButton.addEventListener("click", () => {
  handleEqualInput();
});

acButton.addEventListener("click", () => {
  resetOperation();
  printOnDisplay(0);
});

backspaceButton.addEventListener("click", () => {
  handleBackspaceInput();
});

dotButton.addEventListener("click", () => {
  handleDotInput();
});

minusButton.addEventListener("click", () => {
  handleMinusInput();
});

zeroButton.addEventListener("click", () => {
  handleZeroInput();
});
