const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const smallDisplay = document.querySelector('.small-display');
const mainDisplay = document.querySelector('.main-display');
const equals = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');

let operator;
let equalsSelected;
let result;
let operands = {
    a : '',
    b : '',
}

// removes characters from the main display.
// we also have to remove the number from either a or b
delButton.addEventListener('click', () => {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    if (!operator) {
        operands.a = operands.a.slice(0, -1);
    }
    else if (operator) {
        operands.b = operands.b.slice(0, -1);
    }
});

clearButton.addEventListener('click', () => {
    mainDisplay.textContent = '';
    smallDisplay.textContent = '';
    operands.a = '';
    operands.b = '';
});

equals.addEventListener('click', () => {
    if (operands.b == '0' && operator === '÷') {
        result = operate(operator, operands.a, operands.b);
        operator = '÷'; // update since operate() re-sets variable to empty string
    }
    else if (operands.a && operands.b && operator) {
        // the number of decimal numbers should be max 4.
        // there should be no trailing 0's.
        result = operate(operator, operands.a, operands.b).toFixed(5);
        equalsSelected = true;
        smallDisplay.textContent += ' ' + operands.b + ' ';
        smallDisplay.textContent += ' = ';
        mainDisplay.textContent = result;
        operands.a = result;
    }
    operands.b = '';
});

operators.forEach(o => {
    o.addEventListener('click', () => {
        let newOperator = o.textContent;
        if (operator) {
            /* if a and b are both assigned values and an operator is already selected,
            then calculate the new value for a user operate() and initialize b. 
            */
            if (operands.a && operands.b) {
                operands.a = operate(operator, operands.a, operands.b); // operator initialized
                operands.b = '';
            }
            smallDisplay.textContent = operands.a;
            smallDisplay.textContent += newOperator;
            mainDisplay.textContent = operands.a;
            operator = newOperator;
        }
        else if (!operator) {
            operator = newOperator;
            if (!operands.a) {
                operands.a = '0';
                smallDisplay.textContent = operands.a;
            }
            /* if equals has been selected then b is an empty string and a has some 
            value (the result of previous operation). When a new operator is chosen 
            on the previous result, then change the small display to contain the 
            previous result with the new operator. 
            */
            if (operands.a && equalsSelected) {
                smallDisplay.textContent = operands.a + operator;
            }
            else if (operands.a && !operands.b && !equalsSelected) {
                smallDisplay.textContent += operator;
            }
        }
        equalsSelected = false;
    });
});

function updateDisplay(x) {
    smallDisplay.textContent += x;
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (operands.a && equalsSelected) {
            smallDisplay.textContent = number.textContent;
            mainDisplay.textContent = number.textContent;
            operands.a = number.textContent;
            operator = '';
            console.log(operands.a);
            equalsSelected = false;
        }
        /* A one-digit value has been selected for a but an operator has not
        yet been chosen. Add another number (as string) to the value of a.
        */
        else if (operands.a && !operator) {
            operands.a += number.textContent;
            mainDisplay.textContent += number.textContent;
            smallDisplay.textContent += number.textContent;
        }
        else if (!operands.a) {
            operands.a = number.textContent;
            mainDisplay.textContent = number.textContent;
            smallDisplay.textContent = number.textContent;
        }
        /* operator has been selected so a has a final value to use in calculations. 
        since a is always assigned a value before b, b should be an empty string. 
        */
        else if (!operands.b && operator) {
            operands.b = number.textContent;
            mainDisplay.textContent = number.textContent;
        }
        /* equals hasn't yet been selected so we are adding strings to the value of b.
        */
        else if (operands.b && operator && !equalsSelected) {
            if (operands.b == 0) {
                operands.b = number.textContent;
            }
            else { operands.b += number.textContent; }
            mainDisplay.textContent += number.textContent;
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
    if (b == '0') {
        alert('ERROR: You cannot divide by 0!');
    }
    else { return a/b; }
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            // reset operator
            operator = '';
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