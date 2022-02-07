// import 방법1
// import { isNumber, isOperator } from "./Validator.mjs";

// import 방법2
import validator from "./Validator.mjs";

let inputDatas = [];

function appendData(inputData){
  inputDatas.push(inputData);
}

function getInputDatasMessage(){
  let message = '';
  inputDatas.map(value => message += value);
  return message;
}

function calculate(){
  let result = parseInt(inputDatas[0]);
  let currentNumber = 0;
  let currentOperation = '';
  let prevOperation = '';

  inputDatas.forEach(value => {
    if (validator.isNumber(parseInt(value))){
      currentNumber = parseInt(value);
    } else if (validator.isOperation(parseInt(value))){
      currentOperation = value;
    }

    switch(prevOperation){
      case '+':
        result += currentNumber;
        break;
      case '-':
        result -= currentNumber;
        break;
      case '*':
      result *= currentNumber;
        break;
      case '/':
        result /= currentNumber;
        break;
    }

    prevOperation = currentOperation;
    currentOperation = '';
  })
}

export default {
  appendData,
  getInputDatasMessage,
  calculate,
}