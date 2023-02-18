const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const smallDisplay = document.querySelector('.small-display');
const mainDisplay = document.querySelector('.main-display');
const equals = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const decimal = document.querySelector('.decimal');

let operator;
let equalsSelected;
let result;
let operands = {
    a : '',
    b : '',
}

/* WHAT IF TREAT A AND B AS VALUES. IF A IS NOT EMPTY (NULL) THEN WE TAKE THE CURRENT VALUE, MULTIPLY IT BY 10 AND ADD THE NUMBER PRESSED.
E.G. 2 -> PRESS ON 3 -> 2 * 10 + 3 -> 23.
PRESS ON 4 -> 23 * 10 + 4.
*/

decimal.addEventListener('click', () => {
    // a is equal to a previous result
    if (operands.a && equalsSelected) {
        operands.a = '0.';
        smallDisplay.textContent = '';
        mainDisplay.textContent = operands.a;
    }
    else if (!operands.a) {
        operands.a += '0.';
        smallDisplay.textContent += '0.';
        mainDisplay.textContent += '0.';
    }
    else if (operands.a && !operator) {
        smallDisplay.textContent += '.';
        mainDisplay.textContent += '.';
        operands.a += '.';
    }
    else if (!operands.b) {
        operands.b += '0.';
        mainDisplay.textContent = operands.b;
    }
    else if (operands.b) {
        operands.b += '.';
        mainDisplay.textContent = operands.b;
    }
});

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
    mainDisplay.textContent = '0';
    smallDisplay.textContent = '';
    operands.a = '';
    operands.b = '';
});

equals.addEventListener('click', () => {
    if (operands.b == '0' && operator === '÷') {
        result = operate(operator, operands.a, operands.b);
        operator = '÷'; // update since operate() sets variable to empty string
    }
    // equals button should only do an action if all global variables
    // have values
    else if (operands.a && operands.b && operator) {
        result = operate(operator, operands.a, operands.b);
        if (result.toString().indexOf('.') > -1) {
            result = result.toFixed(4);
        }
        equalsSelected = true;
        smallDisplay.textContent += ' ' + operands.b + ' ' + '=';
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
            smallDisplay.textContent += number.textContent;
            mainDisplay.textContent += number.textContent;
            operands.a += number.textContent;
            operator = '';
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
            operands.b += number.textContent;
            mainDisplay.textContent = operands.b;
        }
        /* equals hasn't yet been selected so we are adding strings to the value of b.
        */
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