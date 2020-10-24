const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from the input field
function getUserNumberInput() {
    return parseInt(userInput.value);
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, enteredNumber) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${enteredNumber}`;
    outputResult(currentResult, calcDescription); // From Vendor file
}

function writeToLog(operation, prevResult, newNumber, newResult) {
    const logEntry = {
        operation: operation,
        prevResult: prevResult,
        number: newNumber,
        result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

// Function that handles all calculations based on provided type
function calculateResult(calculationType) {
    const enteredNumber = getUserNumberInput();

    if (
        calculationType !== 'ADD' &&
        calculationType !== 'SUBTRACT' && 
        calculationType !== 'MULTIPLY' && 
        calculationType !== 'DIVIDE' ||
        !enteredNumber // falsy, 0 value
    ) {
        return;
    }
    
    const initialResult = currentResult;
    let mathOperator;

    if (calculationType === 'ADD') {
        currentResult += enteredNumber;
        mathOperator = '+';
    } else if (calculationType === 'SUBTRACT') {
        currentResult -= enteredNumber;
        mathOperator = '-';
    } else if (calculationType === 'MULTIPLY') {
        currentResult *= enteredNumber;
        mathOperator = '*';
    } else if(calculationType === 'DIVIDE') {
        currentResult /= enteredNumber;
        mathOperator = '/';
    }

    createAndWriteOutput(mathOperator, initialResult, enteredNumber);
    writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
    calculateResult('ADD');
}

function subtract() {
    calculateResult('SUBTRACT');
}

function multiply() {
    calculateResult('MULTIPLY');
}

function divide() {
    calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);