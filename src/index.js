class Calculator {
    constructor(previousNumberTextElement , currentNumberTextElement){
        this.previousNumberTextElement = previousNumberTextElement;
        this.currentNumberTextElement = currentNumberTextElement;
        this.clear()

        
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    deleteNumber(){
            this.currentOperand = this.currentOperand.toString().slice(0 , -1)
    }

    appendNumber(number){

        if(number === "," && this.currentOperand.includes(",")) return
         this.currentOperand = this.currentOperand.toString() + number.toString() 
         
    }

    chooseOperations(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""

    }

    compute(){
        let computation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current))return

        switch(this.operation){
            case '+':
                computation = prev + current
            break;
            case '-':
                computation = prev - current
            break;
            case "x":
                computation = prev * current
            break;
            case "÷" :
                computation = prev / current
            break;    
            default:
                return
                
        }

        this.currentOperand = computation
        this.computation = undefined
        this.previousOperand = ""
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString('en' , { maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentNumberTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){

        this.previousNumberTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        
    } else {
        this.previousNumberTextElement.innerText = "";
    }
    
}
}


//Elements




const previousNumberTextElement = document.querySelector('[data-previous-operand]');

const currentNumberTextElement = document.querySelector('[data-current-operand]');

const btnClear = document.querySelector('[data-all-clear]');

const btnDelete = document.querySelector('[data-del]');

const btnEqual = document.querySelector('[data-equal]');

const number = document.querySelectorAll('[data-number]');

const operators = document.querySelectorAll('[data-operators]');

const calculator = new Calculator(previousNumberTextElement,currentNumberTextElement);

//Events
number.forEach(button => {

    button.addEventListener('click' , ( ) => {
       calculator.appendNumber(button.innerText)
       calculator.updateDisplay() 


        
    })
})

operators.forEach(button => {

    button.addEventListener('click' , ( ) => {
       calculator.chooseOperations(button.innerText)
       calculator.updateDisplay() 


        
    })
})



    btnEqual.addEventListener('click' , ( ) => {
       calculator.compute()
       calculator.updateDisplay() 

        
    })
   
   
   
    btnClear.addEventListener('click' , ( ) => {
       calculator.clear()
       calculator.updateDisplay() 

        
    })
  
  
    btnDelete.addEventListener('click' , ( ) => {
       calculator.deleteNumber()
       calculator.updateDisplay() 

        
    })

    

