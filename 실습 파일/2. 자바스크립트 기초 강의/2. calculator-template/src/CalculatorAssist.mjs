import {question} from 'readline-sync';
import Calculator from './Calculator.mjs';
import Validator from './Validator.mjs';

function showPrompt(){
  while(true){
    let inputData = question('Enter number or operation : ');
    
    if (inputData !== '='){
      Calculator.appendData(inputData);
      console.log(Calculator.getInputDatasMessage());
    } else {
      console.log(Calculator.getInputDatasMessage() + '=' + Calculator.calculate());
      break;
    }
  }
}

showPrompt();