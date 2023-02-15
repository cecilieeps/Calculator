let operator;
let equalsSelected;
let result;
let operands = {
    a : '',
    b : '',
}

const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const smallDisplay = document.querySelector('.small-display');
const mainDisplay = document.querySelector('.main-display');
const equals = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');

clearButton.addEventListener('click', () => {
    mainDisplay.textContent = '';
    smallDisplay.textContent = '';
    operands.a = '';
    operands.b = '';
});

equals.addEventListener('click', () => {
    if (operands.a && operands.b && operator) {
        smallDisplay.textContent += operands.b;
        smallDisplay.textContent += '=';
        result = operate(operator, operands.a, operands.b);
        mainDisplay.textContent = result;
    }
    equalsSelected = true;
    operands.a = result;
    operands.b = '';
});

operators.forEach(o => {
    o.addEventListener('click', () => {
        let newOperator = o.textContent;
        if (operator) {
            // if a and b are both assigned values and an operator is already selected,
            // then calculate the new value for a user operate() and initialize b. 
            if (operands.a && operands.b) {
                operands.a = operate(operator, operands.a, operands.b); // operator initialized
                operands.b = '';
                smallDisplay.textContent = operands.a;
                mainDisplay.textContent = operands.a;
                smallDisplay.textContent += newOperator;
                operator = newOperator;
            }
            // a result has been returned using equals, and the user wants to use the result
            // in the next calculation. 
            else if (operands.a && !operands.b && equalsSelected) {
                smallDisplay.textContent = operands.a;
                mainDisplay.textContent = operands.a;
                smallDisplay.textContent += newOperator;
                operator = newOperator;
            }
        }
        else if (!operator) {
            operator = newOperator;
            if (operands.a && equalsSelected) {
                smallDisplay.textContent = operands.a + operator;
            }
            else if (operands.a && !operands.b) {
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
        // a is an empty string meaning a hasn't been selected yet
        if (!operands.a) {
            operands.a = number.textContent;
            mainDisplay.textContent = number.textContent;
            smallDisplay.textContent = number.textContent;
        }
        // A one-digit value has been selected for a but an operator has not
        // yet been chosen. Add another number (as string) to the value of a.
        else if (operands.a && !operator) {
            operands.a += number.textContent;
            mainDisplay.textContent += number.textContent;
            smallDisplay.textContent += number.textContent;
        }
        // operator has been selected so a has a final value to use in calculations. 
        // since a is always assigned a value before b, b should be an empty string. 
        else if (!operands.b && operator) {
            operands.b = number.textContent;
            mainDisplay.textContent = number.textContent;
        }
        else if (operands.b && operator && !equalsSelected) {
            operands.b += number.textContent;
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
    return a/b;
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