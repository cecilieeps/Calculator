let operator;
let a; 
let b;
let result;

const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const smallDisplay = document.querySelector('.small-display');
const mainDisplay = document.querySelector('.main-display');
const equals = document.querySelector('.equals');

equals.addEventListener('click', () => {
    if (a && b && operator) {
        smallDisplay.textContent += '=';
        result = operate(operator, a, b); // sets operator to ''
        mainDisplay.textContent = result;
        console.log(mainDisplay.textContent);
        console.log("equals");
        // now update a to be the result of the above operation
    }
    a = result;
    b = '';
});

operators.forEach(o => {
    o.addEventListener('click', () => {
        operator = o.textContent;
        if (a && !b) {
            smallDisplay.textContent += operator;
        }
        if (a && b) {
            console.log(a);
            console.log(b);
            /* if a and b both have values assigned and an operator has been clicked on
            we need to update the operator value and perform operation on a, b.
            Change the small display value and the main value to the result and add the new operator to the new value.
            */
            smallDisplay.textContent = operate(a, b, operator);
            mainDisplay.textContent = operate(a, b, operator);
        }
    });
});

function updateDisplay(x) {
    smallDisplay.textContent += x;
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        /* a number has been clicked on. Check if a has a value, update it with the number thats been clicked on if it doesnt.
        */
        if (!a) {
            a = number.textContent;
            mainDisplay.textContent = number.textContent;
            smallDisplay.textContent = number.textContent;
        }
        else if (!b) {
            preceedingValue = a;
            b = number.textContent;
            mainDisplay.textContent = number.textContent;
            smallDisplay.textContent += number.textContent;
        }
        else {
            /*
            If another operator is clicked on while a, b have values
            then automatically do the operation on a, b and then update
            the operator variable. 
            */
        }
    });
})

// whenever an operation is performed, we need to update the display
// to be equal to the answer here;
function add(a, b){
    return Number(a)+Number(b);
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
            // reset operator
            operator = '';
            console.log("in operate");
            return add(a, b);
        case '-':
            operator = '';
            return subtract(a, b);
        case '*':
            operator = '';
            return multiply(a, b);
        case '÷':
            operator = '';
            return divide(a, b);
        default:
            break;
    }
}