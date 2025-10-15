const buttonContainer = document.querySelector(".buttons");
const addBtn = document.querySelector(".add");
const subtractBtn = document.querySelector(".subtract");
const multiplyBtn = document.querySelector(".multiply");
const divideBtn = document.querySelector(".divide");
const display = document.querySelector(".display");
const square = document.querySelector(".square");

const point = document.querySelector(".point");
const erase = document.querySelector(".erase");
const sqrtBtn = document.querySelector(".sqrt");
const prcnt = document.querySelector(".prcnt");
const equals = document.querySelector(".equals");
const neg = document.querySelector(".neg");
const clear = document.querySelector(".clear");

const binaryOps = [addBtn, subtractBtn, multiplyBtn, divideBtn];
const unaryOps = [sqrtBtn, square];

let firstNumber = null;
let operation = null;
let secondNumber = null;
let percentIndicator = false;
let pointIndicator = false;

point.addEventListener("click", e => {
  if (pointIndicator) {
    return;
  }
  else {
    display.textContent += ".";
    pointIndicator = true;
  }
});

function writeNumber(event) {
  if (!event.target.classList.contains("number")) {
    return;
  }
  display.textContent += event.target.textContent;
}

for (let btn of binaryOps){
  btn.addEventListener("click", e => {
    firstNumber = Number(display.textContent);
    clearDisplay();
    operation = e.target.className;
  });
}

for (let btn of unaryOps){
  btn.addEventListener("click", e => {
    num = Number(display.textContent);
    operation = e.target.className;
    display.textContent = operate(num, operation);
  });
}

prcnt.addEventListener("click", e =>{
  if (firstNumber === null || percentIndicator) {
    return;
  }
  secondNumber = Number(display.textContent) * firstNumber / 100 ;
  display.textContent += "%";
  percentIndicator = true;
});

equals.addEventListener("click", e => {
  if (display.textContent.slice(-1) !== "%") {
    secondNumber = Number(display.textContent);
  }
  clearDisplay();
  if (firstNumber && operation) {
    display.textContent = operate(firstNumber, operation, secondNumber);
  }
  firstNumber = Number(display.textContent);
});

function operate(first, op, second = null) {
  console.log(first, op, second);
  switch (op) {
  case "add":
    return first + second;
  case "subtract":
    return first - second;
  case "multiply":
    return first * second;
  case "divide":
    return second == 0 ? "MATH ERROR": first / second;
  case "sqrt":
    return  first > 0 ? first ** 0.5: "MATH ERROR";
  case "square":
    return first ** 2;
  }
}

function clearDisplay(event) {
  display.textContent = "";
  pointIndicator = false;
  percentIndicator = false;
}

buttonContainer.addEventListener("click", writeNumber);

erase.addEventListener("click", e => {
  if (display.textContent.slice(-1) === ".") {
    pointIndicator = false;
  }
  display.textContent = display.textContent.slice(0, -1);
});

clear.addEventListener("click",  e => {
  firstNumber = null;
  operation = null;
  secondNumber = null;
  pointIndicator = false;
  clearDisplay();
});
