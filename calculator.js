const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const smallDisplay = document.querySelector('.small-display');
const mainDisplay = document.querySelector('.main-display');
const equals = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const decimal = document.querySelector('.decimal');
const changeSign = document.querySelector('.sign');
const logDisplay = document.querySelector('.log');


let result;
let operator;
let a = null;
let b = null;
let logSize = 0;

changeSign.addEventListener('click', () => {
    if (result) {
        a = result;
        result = null;
    }
    if (a && a !== '0' && !operator) {
        a = multiply(a, -1);
    }
    else if (b && b !== '0') {
        b = multiply(b, -1);
    }
    mainDisplay.textContent = a;
    smallDisplay.textContent = a + operator;
    if (b) {
        mainDisplay.textContent = b;
        if (Number(b) < 0) {
            smallDisplay.textContent = a + operator + `(${b})`;
        }
        else { smallDisplay.textContent = a + operator + b; }
    }

})

decimal.addEventListener('click', () => {
    if (result) {
        result = null;
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
    disableDecimalBtn();
});

function disableDecimalBtn() {
    decimal.disabled = true;
}

function enableDecimalBtn() {
    decimal.disabled = false;
}

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
    if (logSize === 4) {
        logDisplay.textContent = '';
    }
    let logEntry = a + operator + b + '=' + '\r\n';
    if (b == 0 && operator === '÷') {
        result = operate(operator, a, b);
    }
    else if (a && b && operator) {
        logSize += 1;
        result = operate(operator, a, b);
        let decimalIndex = result.toString().indexOf('.');
        if (decimalIndex !== -1) {
            result = result.toFixed(3);
        }
        logEntry += result;
        smallDisplay.textContent += '=';
        mainDisplay.textContent = result;
        logDisplay.textContent += logEntry + '\r\n';
        logDisplay.setAttribute('style', 'white-space: pre;');
        logDisplay.textContent += '\r\n'
        a = null;
        b = null;
        operator = null;
    }
    enableDecimalBtn();
});

operators.forEach(o => {
    o.addEventListener('click', () => {
        enableDecimalBtn();
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
        if (!a) {
            a = numAsString;
        }
        else if (a === '0' && numAsString == 0) {
            a += '';
        }
        else if (a === '0' && numAsString != 0) {
            a = numAsString;
        }
        else if (a && !operator) {
            a += numAsString;
        }
        else if (a && operator === '÷' && !b && numAsString == 0) {
            alert('You cannot divide by 0!');
        }

        if (a && operator && !b) {
            b = numAsString;
        }
        else if (b === '0' && numAsString == 0) {
            b += '';
        }
        else if (b === '0' && numAsString != 0) {
            b = numAsString;
        }
        else if (a && operator && b) {
            b += numAsString;
        }
        mainDisplay.textContent = a;
        smallDisplay.textContent = a;
        if (operator && !b) {
            smallDisplay.textContent = a + operator;
        }
        else if (b) {
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
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            break;
    }
}