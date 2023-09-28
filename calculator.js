const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => {
    if (+b === 0) {
        return "Division by zero is not allowed";
    }
    return +a / +b;
};


function operate(num1, num2, operator) {
    switch (operator) {
        case 'add':
            return add(num1, num2);
        case 'substract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2);
        default:
            return "Invalid operator";
    }
}


function updateCalcDisplay(){

}

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const calcDisplay = document.getElementById('#displayDiv');

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
        break;
    
    case clickedButton.firstOperator === "" && clickedButton.secondNumber === "":
        clickedButton.firstNumber = numberValue;
        break;
    
    case clickedButton.secondOperator === "" && clickedButton.thirdNumber === "":
        clickedButton.secondNumber = numberValue;
        break;
    
    case clickedButton.thirdOperator === "":
        clickedButton.thirdNumber = numberValue;
        break;
    
    default:
        clickedButton.fourthNumber = numberValue;
        break;
    }



    console.log(clickedButton);
}

function handleOperatorButtonClick(e) {
  const operatorValue = e.target.getAttribute('value');


    switch (true) {
        case clickedButton.firstOperator === "":
            clickedButton.firstOperator = operatorValue;
            break;

        case clickedButton.firstOperator !== "" && clickedButton.secondNumber === "":
            clickedButton.firstOperator = operatorValue;
            break;

        case clickedButton.thirdNumber === "" && clickedButton.thirdOperator === "":
            clickedButton.secondOperator = operatorValue;
            break;
    
        default:
            clickedButton.thirdOperator = operatorValue;
            break;
    }
  // Update your UI or perform any other necessary operations
  console.log(clickedButton);
}

let firstResult, secondResult, finalResult;

function getMathResult(){

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

    const filteredNumberValues = numberValues.filter((value) => value !== "");
    const filteredOperatorValues = operatorValues.filter((value) => value !== "");

    const numLength = filteredNumberValues.length;
    const operatorLength = filteredOperatorValues.length;

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
  
  });
 
  equalButton.addEventListener('click', getMathResult);
  
  
  