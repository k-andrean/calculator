function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return +num1 + +num2; 
        case '-':
            return +num1 - +num2; 
        case '*':
            return (+num1 * +num2).toFixed(2);
        case '÷':
            if (+num2 === 0) {
                return "Division by zero error";
            }
            return (+num1 / +num2).toFixed(2);
        default:
            return "Invalid operator";
    }
}


// calculator button and display element
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const mathDisplay = document.querySelector('.math-display');
const resultDisplay = document.querySelector(`.result-display`);
const inputButton = document.querySelector(`.input`);


  // Function to process the input string and extract numbers and operators
  function processInputString(inputString) {
    const numberArray = [];
    const operatorArray = [];
    let currentNumber = '';
    const validOperators = ['+', '-', '*', '÷'];
  
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
  
      if (validOperators.includes(char)) {
        // If the character is a valid operator, push the current number to the number array
        if (currentNumber !== '') {
          numberArray.push(currentNumber);
          currentNumber = '';
        }
  
        // Push the operator to the operator array
        operatorArray.push(char);
      } else {
        // If the character is not a valid operator, add it to the current number
        currentNumber += char;
      }
    }
  
    // Push the remaining number if there is any
    if (currentNumber !== '') {
      numberArray.push(currentNumber);
    }
  
    return { numbers: numberArray, operators: operatorArray };
  }




function filterNumberOperatorObject(){
    
    const inputString = mathDisplay.textContent; 
    const { numbers, operators } = processInputString(inputString);

    const numberArrayLength = numbers.length;
    const operatorArrayLength = operators.length;

    return [numbers, operators, numberArrayLength, operatorArrayLength];

}


// function for processing two number and a operator in math sequence until getting final result
function getMathResult(){

    let firstResult, secondResult, finalResult;

    const[filteredNumberValues, filteredOperatorValues, numLength, operatorLength] = filterNumberOperatorObject();


    switch (true) {
        case numLength === 2 && (operatorLength === 1 || operatorLength === 2):
          finalResult = operate(filteredNumberValues[0], filteredNumberValues[1], filteredOperatorValues[0]);
          break;
      
        case numLength === 3 && (operatorLength === 2 || operatorLength === 3):
          firstResult = operate(filteredNumberValues[0], filteredNumberValues[1], filteredOperatorValues[0]);
          finalResult = operate(firstResult, filteredNumberValues[2], filteredOperatorValues[1]).toFixed(2);
          break;
      
        case numLength === 4 && operatorLength === 3:
          firstResult = operate(filteredNumberValues[0], filteredNumberValues[1], filteredOperatorValues[0]);
          secondResult = operate(firstResult, filteredNumberValues[2], filteredOperatorValues[1]);
          finalResult = operate(secondResult, filteredNumberValues[3], filteredOperatorValues[2]).toFixed(2);
          break;
      
        default:
          console.log("Invalid operation");
    }
      
    resultDisplay.textContent += `${finalResult}`;

}


function updateCalcDisplay(value) {
    switch (value) {
      case 'add':
        value = '+';
        break;
      case 'subtract':
        value = '-';
        break;
      case 'multiply':
        value = '*';
        break;
      case 'divide':
        value = '÷';
        break;
      case 'decimal':
        value = '.';
        break;
      default:
        value = value;
    }
  
    mathDisplay.textContent += `${value}`;
  }
  


  
//   // Add event listeners to number buttons and operator buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const numberValue = e.target.getAttribute('value');
      updateCalcDisplay(numberValue);
    });
  });
  
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const operatorValue = e.target.getAttribute('value');
      updateCalcDisplay(operatorValue);
    });
  });

  
  

clearButton.addEventListener('click', () => {
    clickedButton = {
      firstNumber: "",
      secondNumber: "",
      thirdNumber: "",
      fourthNumber: "",
      firstOperator: "",
      secondOperator: "",
      thirdOperator: "",
    };


    mathDisplay.textContent = "";
    resultDisplay.textContent = "";
  
  });
 
equalButton.addEventListener('click', getMathResult);
  
  
  