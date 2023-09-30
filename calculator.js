// calculator button and display element
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const mathDisplay = document.querySelector('.math-display');
const resultDisplay = document.querySelector(`.result-display`);
const inputButton = document.querySelector(`.input`);


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


  // Function to process the input string and extract numbers and operators into array
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
  
        operatorArray.push(char);
      } else {
        // If the character is not a valid operator, add it to the current number
        currentNumber += char;
      }
``  }
    // push remaining number into the array if there is any 
    if (currentNumber !== '') {
      numberArray.push(currentNumber);
    }
  
    
    return { numbers: numberArray, operators: operatorArray };
}


function getUserInput() {
    const userInput = prompt('Enter a mathematical expression, use ÷ symbol for divide operation:');
    
    if (userInput === null || userInput.trim() === '') {
      alert('No input provided. Please enter a valid expression.');
      return;
    }
  
    // Remove spaces from the user's input
    const sanitizedInput = userInput.replace(/\s+/g, '');
  
    const validOperators = ['+', '-', '*', '÷'];

    const validNumericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  
    const isInputValid = sanitizedInput.split('').every(char => validOperators.includes(char) || validNumericCharacters.includes(char));
  
    if (!isInputValid) {
      alert('Invalid number or operator in the expression.');
      return;
    }
  
  
    return sanitizedInput;

}



function filterNumberOperatorObject(string){
    
    const { numbers, operators } = processInputString(string);

    const numberArrayLength = numbers.length;
    const operatorArrayLength = operators.length;

    return [numbers, operators, numberArrayLength, operatorArrayLength];

}


// function for processing two number and a operator in math sequence until getting final result
function getMathResult(filteredNumberValues, filteredOperatorValues, numLength, operatorLength){

    let firstResult, secondResult, finalResult;


    switch (true) {
        case numLength === 2 && (operatorLength === 1 || operatorLength === 2):
          finalResult = operate(filteredNumberValues[0], filteredNumberValues[1], filteredOperatorValues[0]);
          break;
      
        case numLength === 3 && (operatorLength === 2 || operatorLength === 3):
          firstResult = operate(filteredNumberValues[0], filteredNumberValues[1], filteredOperatorValues[0]);
          finalResult = operate(firstResult, filteredNumberValues[2], filteredOperatorValues[1]);
          break;
      
        case numLength === 4 && operatorLength === 3:
          firstResult = operate(filteredNumberValues[0], filteredNumberValues[1], filteredOperatorValues[0]);
          secondResult = operate(firstResult, filteredNumberValues[2], filteredOperatorValues[1]);
          finalResult = operate(secondResult, filteredNumberValues[3], filteredOperatorValues[2]);
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
 
equalButton.addEventListener('click', () => {
    
    const inputString = mathDisplay.textContent;
    const[filteredNumberValues, filteredOperatorValues, numLength, operatorLength] = filterNumberOperatorObject(inputString); 
    
    getMathResult(filteredNumberValues, filteredOperatorValues, numLength, operatorLength);
});
  
// implement getting user input and returning result of math operation 
inputButton.addEventListener('click', () => {
    
    const userInputString = getUserInput();
    const[filteredNumberValues, filteredOperatorValues, numLength, operatorLength] = filterNumberOperatorObject(userInputString); 
    
    getMathResult(filteredNumberValues, filteredOperatorValues, numLength, operatorLength);
});