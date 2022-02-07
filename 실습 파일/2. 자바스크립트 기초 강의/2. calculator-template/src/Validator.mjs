// export 방법 1
// export function isNumber(number) {
//   return !isNaN(parseInt(number));
// }

// export function isOperator(opertaion) {
//   let opertaions = '+-*/=';
//   return opertaions.indexOf(opertaion) !== -1;
// }


// export 방법2
function isNumber(number) {
  return !isNaN(parseInt(number));
}

function isOperation(opertaion) {
  let opertaions = '+-*/=';
  return opertaions.indexOf(opertaion) !== -1;
}

export default {
  isNumber, isOperation
}