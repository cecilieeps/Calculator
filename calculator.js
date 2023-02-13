// loop over all nodes in the buttons class and add an event
const buttons = document.querySelectorAll('.buttons');
let display = 0;
let operator;
let a = 0; // the value the calculator starts with
let b;

const operators = document.querySelectorAll('.operator');
// every time an operator button is clicked, update operator variable
// and 


operators.forEach(op => {
    addEventListener('click', () => {

    });
});
// const operatorSelected 


function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

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