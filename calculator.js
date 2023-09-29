const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return "Division by zero is not allowed";
    }
    return a / b;
};

// function for performing math operation based on case condition
function operate(num1, num2, operator) {
    switch (operator) {
        case 'add':
            return add(num1, num2);
        case 'subtract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2);
        default:
            return "Invalid operator";
    }
}


const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const mathDisplay = document.querySelector('.math-display');
const resultDisplay = document.querySelector(`.result-display`);

let clickedButton = {
    firstNumber: "",
    secondNumber: "",
    thirdNumber: "",
    fourthNumber: "",
    firstOperator: "",
    secondOperator: "",
    thirdOperator: "",
  };

  

function handleNumberButtonClick(e) {
  const numberValue = e.target.getAttribute('value');


  switch (true) {
    case clickedButton.firstNumber === "":
        clickedButton.firstNumber = numberValue;
        updateCalcDisplay(numberValue);
        break;
    
    case clickedButton.firstOperator === "" && clickedButton.secondNumber === "":
        clickedButton.firstNumber += numberValue;
        updateCalcDisplay(numberValue);
        break;

    case clickedButton.firstOperator !== "" && clickedButton.secondNumber === "":
        clickedButton.secondNumber = numberValue;
        updateCalcDisplay(numberValue);
        break;

    case clickedButton.secondOperator === "" && clickedButton.thirdNumber === "":
        clickedButton.secondNumber += numberValue;
        updateCalcDisplay(numberValue);
        break;
    
    case clickedButton.secondOperator !== "" && clickedButton.thirdNumber === "":
        clickedButton.thirdNumber = numberValue;
        updateCalcDisplay(numberValue);
        break;

    case clickedButton.thirdOperator === "":
        clickedButton.thirdNumber += numberValue;
        updateCalcDisplay(numberValue);
        break;
    
    case clickedButton.thirdOperator !== "" && clickedButton.fourthNumber === "":
        clickedButton.fourthNumber = numberValue;
        updateCalcDisplay(numberValue);
        break;
    
    default:
        clickedButton.fourthNumber += numberValue;
        updateCalcDisplay(numberValue);
        break;
    }



    console.log(clickedButton);
}

function handleOperatorButtonClick(e) {
  const operatorValue = e.target.getAttribute('value');


    switch (true) {
        case clickedButton.firstOperator === "":
            clickedButton.firstOperator = operatorValue;
            updateCalcDisplay(operatorValue);
            break;

        case clickedButton.firstOperator !== "" && clickedButton.secondNumber === "":
            clickedButton.firstOperator = operatorValue;
            updateCalcDisplay(operatorValue);
            break;

        case clickedButton.thirdNumber === "" && clickedButton.thirdOperator === "":
            clickedButton.secondOperator = operatorValue;
            updateCalcDisplay(operatorValue);
            break;
    
        default:
            clickedButton.thirdOperator = operatorValue;
            updateCalcDisplay(operatorValue);
            break;
    }
  // Update your UI or perform any other necessary operations
  console.log(clickedButton);
}

function filterNumberOperatorObject(){

    const numberValues = [
        clickedButton.firstNumber,
        clickedButton.secondNumber,
        clickedButton.thirdNumber,
        clickedButton.fourthNumber,
      ];
      
    const operatorValues = [
        clickedButton.firstOperator,
        clickedButton.secondOperator,
        clickedButton.thirdOperator,
      ];

    const filterNumberValue = numberValues.filter((value) => value !== "").map(parseFloat);
    const filterOperatorValue = operatorValues.filter((value) => value !== "");

    const numberArrayLength = filterNumberValue.length;
    const operatorArrayLength = filterOperatorValue.length;

    return [filterNumberValue, filterOperatorValue, numberArrayLength, operatorArrayLength];

}


function getMathResult(){

    let firstResult, secondResult, finalResult;

    const[filteredNumberValues, filteredOperatorValues, numLength, operatorLength] = filterNumberOperatorObject();


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
          console.log("Invalid input");
    }
      
    console.log(finalResult);
    updateResultDisplay(finalResult);

}


// function for updating display based on user input
function updateCalcDisplay(value){
    
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
        default:
          value = value;
      }

    mathDisplay.textContent += `${value}`;
    
}

function updateResultDisplay(result){
    resultDisplay.textContent = "";
    resultDisplay.textContent += `${result}`;
}



  
  // Add event listeners to number buttons and operator buttons
  numberButtons.forEach((button) => {
    button.addEventListener('click', handleNumberButtonClick);
  });
  
  operatorButtons.forEach((button) => {
    button.addEventListener('click', handleOperatorButtonClick);
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
  
  
  