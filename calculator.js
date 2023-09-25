const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return "Division by zero is not allowed";
    }
    return a / b;
};


let firstNumber;
let secondNumber;
let mathOperator;

function operate(firstNumber, secondNumber, mathOperator) {
    switch (mathOperator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            return "Invalid operator";
    }
}
