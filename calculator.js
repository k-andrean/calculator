function operate(num1, num2, operator) {
    switch (operator) {
        case 'add':
            return +num1 + +num2; 
        case 'subtract':
            return +num1 - +num2; 
        case 'multiply':
            return +num1 * +num2;
        case 'divide':
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


// initiating object for storing number and operator value clicked to perform math operation
let clickedButton = {
    firstNumber: "",
    secondNumber: "",
    thirdNumber: "",
    fourthNumber: "",
    firstOperator: "",
    secondOperator: "",
    thirdOperator: "",
  };

  
// function to handle different case according to value button clicked and storing necessary value inside clicked object
function handleNumberButtonClick(e) {
  const numberValue = e.target.getAttribute('value');


  switch (true) {
    case clickedButton.firstNumber === "":
        clickedButton.firstNumber = numberValue;
        updateCalcDisplay(numberValue);
        break;
    
    case clickedButton.firstOperator === "" && clickedButton.secondNumber === "":
        // if next number and operator to process math has not been set, number button clicked will be appended to current number value
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


}

function handleOperatorButtonClick(e) {
  const operatorValue = e.target.getAttribute('value');


    switch (true) {
        case clickedButton.firstOperator === "":
            clickedButton.firstOperator = operatorValue;
            updateCalcDisplay(operatorValue);
            break;

        case clickedButton.firstOperator !== "" && clickedButton.secondNumber === "":
            // if next number has not been set, current operator value will change to current operator button clicked
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
          console.log("Invalid input");
    }
      
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
  
  
  