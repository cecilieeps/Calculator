// loop over all nodes in the buttons class and add an event
const buttons = document.querySelectorAll('.buttons');
let displayValue = '0';
let value = '';
let operator;
// the value of a will be updated continuously as it will be passed to the functions
// the value the calculator starts with
let a; 
let b;
// what will be displayed above current value 
let values = "";

const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const smallDisplay = document.querySelector('.small-display');
const mainDisplay = document.querySelector('.main-display');
const equals = document.querySelector('.equals');

equals.addEventListener('click', () => {

})

operators.forEach(o => {
    o.addEventListener('click', () => {
        value += o.textContent;
        operator = o.textContent;
        updateDisplay();
    });
});

function updateDisplay() {
    mainDisplay.textContent = value;
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        value += number.textContent; // already a string
        if (!a) {
            a = number;
        }
        else {
            b = number; // after b is assigned a value then we can perform the operation
            value = operate(operator, a, b);
        }
        updateDisplay();
    });
})

console.log(value);

// whenever an operation is performed, we need to update the display
// to be equal to the answer here;
function add(a, b){
    value = a + b;
    return a+b;
}

function subtract(a, b){
    value = a - b;
    return a-b;
}

function multiply(a, b){
    value = a * b;
    return a*b;
}

function divide(a, b){
    value = a/b;
    return a/b;
}

// a will be the previous stored value
// whenever this is called, add some string to values variable i.e. what will be
// displayed above the result 
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            break;
    }
}