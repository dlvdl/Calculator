class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    apendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) {
            return
        }
        this.currentOperand = this.currentOperand.toString() + 
                                    number.toString();
    }

    chooseOperationFunction(operation) {
        if(this.currentOperand === '') {
            return
        }
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand += `${this.currentOperand} ${this.operation}`;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+' : 
             computation = prev + current;
             break
            case '-' : 
             computation = prev - current;
             break
            case '*' : 
             computation = prev * current;
             break
            case '÷' : 
             computation = prev / current;
             break
            default: 
             return
        }
        this.currentOperand = computation;  
        this.operation = undefined; 
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.innerText = 
            this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('.data_number');
const operationButtons = document.querySelectorAll('.data_operation');
const equalButton = document.querySelector('.data_equals');
const deletDataeButton = document.querySelector('.data_delete');
const clearDataButton = document.querySelector('.data_all_clear');
const previousOperandTextElement = document.querySelector(
    '.previous_operand');
const currentOperandTextElement = document.querySelector(
    '.current_operand');

const calculator = new Calculator(
    previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
    button.addEventListener('click', ()=>{
       calculator.apendNumber(button.innerText) 
       calculator.updateDisplay()
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperationFunction(button.innerText);
        calculator.updateDisplay();
    })
})

clearDataButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

deletDataeButton .addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

