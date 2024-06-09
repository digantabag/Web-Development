// script.js
let currentInput = '';
let operator = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function setOperator(op) {
    if (currentInput === '' && previousInput !== '') {
        operator = op;
    } else {
        if (operator && currentInput) {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function calculatePercentage() {
    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);
    if (isNaN(firstNumber) || isNaN(secondNumber) || secondNumber === 0) return;

    const percentage = (firstNumber / secondNumber) * 100;
    currentInput = percentage.toFixed(2) + '%';
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    const operationDisplay = document.getElementById('operation-display');
    
    display.value = currentInput || previousInput;
    
    // Update operation display
    if (operator) {
        operationDisplay.innerText = operator;
        operationDisplay.style.visibility = 'visible';
    } else {
        operationDisplay.style.visibility = 'hidden';
    }
}

// document.addEventListener('keydown', function(event) {
//     const key = event.key;
//     const button = document.querySelector(`button[data-key="${key}"]`);
//     if (button) {
//         button.click();
//     }
// }
// );