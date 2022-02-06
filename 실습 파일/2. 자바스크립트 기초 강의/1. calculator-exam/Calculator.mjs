// const readLine = require('readline-sync')
import { question } from 'readline-sync' 

function showPrompt(){
  console.clear();
  // const testStr = readLine.question('Enter test message : ')
  const firstNumber = question('Enter first number : ');
  // const operation = question('Enter operation : ');
  // const secondNumber = question('Enter second number : ');
 
  console.log(isNumber(firstNumber));
}

function isNumber(number){
  return ! isNaN(parseInt(number));
}

showPrompt();