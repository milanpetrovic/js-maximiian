const defaultResult = 0;
let currentResult = defaultResult;

function add() {
    const enteredNumber = parseInt(userInput.value); // employ DRY principle
    const calcDescription = `${currentResult} + ${enteredNumber}`;
    currentResult = currentResult + enteredNumber;
    outputResult(currentResult, calcDescription);
}

addBtn.addEventListener('click', add);