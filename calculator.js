const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const smallDisplay = document.querySelector('.small-display');
const mainDisplay = document.querySelector('.main-display');
const equals = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const decimal = document.querySelector('.decimal');

let result;
let operator;
let a = null;
let b = null;

decimal.addEventListener('click', () => {
    if (result) {
        a = result;
    }
    if(!a) {
        a = '0.';
    }
    else if(a && !operator && !b) {
        a = a.toString() + '.';
    }
    else if (operator && !b) {
        b = '0.';
    }
    else if (b) {
        b = b.toString() + '.';
    }
    mainDisplay.textContent = a;
    smallDisplay.textContent = a;
    if (b) {
        mainDisplay.textContent = b;
        smallDisplay.textContent = a + operator + b;
    }
});

delButton.addEventListener('click', () => {
    if (a && !operator && !b) {
        a = a.toString().slice(0, -1);
        mainDisplay.textContent = a;
        smallDisplay.textContent = a;
    }
    else if (a && operator) {
        b = b.toString().slice(0, -1);
        smallDisplay.textContent = a + operator + b;
        mainDisplay.textContent = b;
    }
    else if (result) {
        a = null;
        b = null;
        operator = null;
        mainDisplay.textContent = 0;
        smallDisplay.textContent = '';
    }
});

clearButton.addEventListener('click', () => {
    mainDisplay.textContent = '0';
    smallDisplay.textContent = '';
    a = null;
    b = null;
    operator = null;
});

equals.addEventListener('click', () => {
    if (b == 0 && operator === '÷') {
        result = operate(operator, a, b); // gives alert
    }
    else if (a && b && operator) {
        console.log(b);
        result = operate(operator, a, b);
        let decimalIndex = result.toString().indexOf('.');
        let zeroIndex = result.toString().indexOf('0');
        // check if there are 0s after the decimal point
        if (decimalIndex < zeroIndex) {
            result = result.toString().slice(0, zeroIndex);
        }
        else { result = result.toFixed(8); }
        smallDisplay.textContent += '=';
        mainDisplay.textContent = result;
        a = null;
        b = null;
        operator = null;
    }
});

operators.forEach(o => {
    o.addEventListener('click', () => {
        let newOperator = o.textContent;
        if (result) {
            a = result;
        }
        if (a && !operator) {
            operator = newOperator;
        }
        else if (a && b && operator) {
            result = operate(operator, a, b);
            operator = newOperator;
            a = result;
        }
        else if (a && operator && !b) {
            operator = newOperator;
        }
        smallDisplay.textContent = a + operator;
        mainDisplay.textContent = a;
        result = null;
    });
});

numbers.forEach(number => {
    number.addEventListener('click', () => {
        let numAsString = number.textContent;
        if (result) {
            a = null;
            result = null;
        }
        if (!a && numAsString != 0) {
            a = numAsString;
        }
        else if (a && !operator) {
            a += numAsString;
        }
        else if (a && operator === '÷' && !b && numAsString == 0) {
            alert('You cannot divide by 0!');
        }
        else if (a && operator && !b) {
            b = numAsString;
        }
        else if (a && operator && b) {
            if (b == 0) {
                b = numAsString;
            }
            else { b += numAsString; }
        }
        mainDisplay.textContent = a;
        smallDisplay.textContent = a;
        if (b) {
            console.log(operator);
            smallDisplay.textContent = a + operator + b;
            mainDisplay.textContent = b;
        }
    });
})

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
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            break;
    }
}