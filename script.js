let currentInput = '';
let operator = '';
let operand1 = '';
let operand2 = '';

function appendToDisplay(value) {
    const display = document.getElementById('display');

    if (value === '.' && currentInput.includes('.')) {
        return;
    }

    currentInput += value;
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    operand1 = '';
    operand2 = '';
    document.getElementById('display').textContent = '0';
}

function calculateResult() {
    if (operator && operand1 !== '' && currentInput !== '') {
        operand2 = currentInput;
        try {
            const result = performCalculation(parseFloat(operand1), operator, parseFloat(operand2));
            document.getElementById('display').textContent = result;
            currentInput = result.toString();
            operand1 = currentInput;
            operator = '';
        } catch (error) {
            document.getElementById('display').textContent = 'Error';
        }
    }
}

function performCalculation(op1, op, op2) {
    switch (op) {
        case '+':
            return op1 + op2;
        case '-':
            return op1 - op2;
        case '*':
            return op1 * op2;
        case '/':
            if (op2 === 0) {
                throw new Error('Division by zero');
            }
            return op1 / op2;
        default:
            return op2;
    }
}

function handleOperator(op) {
    if (currentInput === '' && op !== '-') {
        return;
    }

    if (operator) {
        calculateResult();
    } else {
        operand1 = currentInput;
    }
    
    operator = op;
    currentInput = '';
    document.getElementById('display').textContent = operand1;
}

function handlePercent() {
    if (currentInput !== '') {
        const value = parseFloat(currentInput);
        const percentValue = value / 100;
        document.getElementById('display').textContent = percentValue;
        currentInput = percentValue.toString();
    }
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else if (value === '%') {
            handlePercent();
        } else if (['/', '*', '-', '+'].includes(value)) {
            handleOperator(value);
        } else {
            appendToDisplay(value);
        }
    });
});
