const defaultResult = 0;
let currentResult = defaultResult;

function add(num1, num2) {
    const result = num1 + num2;
    alert(`Result is ${result}`);
}

add(20, 19);

currentResult = (currentResult + 10) * 2 - 4;

let calculationDescription = `(${defaultResult} + 10) * 2 - 4`;

outputResult(currentResult, calculationDescription);