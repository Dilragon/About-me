document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    let currentValue = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentValue;
    }

    function inputDigit(digit) {
        if (waitingForSecondOperand) {
            currentValue = digit;
            waitingForSecondOperand = false;
        } else {
            currentValue = currentValue === '0' ? digit : currentValue + digit;
        }
    }

    function inputDecimal() {
        if (waitingForSecondOperand) {
            currentValue = '0.';
            waitingForSecondOperand = false;
            return;
        }

        if (!currentValue.includes('.')) {
            currentValue += '.';
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentValue);

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            currentValue = String(result);
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '×':
                return firstOperand * secondOperand;
            case '÷':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    function resetCalculator() {
        currentValue = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = button.textContent;

            if (/[0-9]/.test(buttonText)) {
                inputDigit(buttonText);
            } else if (buttonText === '.') {
                inputDecimal();
            } else if (['+', '-', '×', '÷'].includes(buttonText)) {
                handleOperator(buttonText);
            } else if (buttonText === '=') {
                if (operator && !waitingForSecondOperand) {
                    const secondOperand = parseFloat(currentValue);
                    currentValue = String(calculate(firstOperand, secondOperand, operator));
                    firstOperand = null;
                    operator = null;
                    waitingForSecondOperand = false;
                }
            } else if (buttonText === 'C') {
                resetCalculator();
            } else if (buttonText === '±') {
                currentValue = String(-parseFloat(currentValue));
            } else if (buttonText === '%') {
                currentValue = String(parseFloat(currentValue) / 100);
            }

            updateDisplay();
        });
    });
});