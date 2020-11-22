(function() {
    var numInputs = document.getElementsByClassName("calc-input");
    var calcOperations = document.getElementsByClassName("calc-operator");
    var calcClear = document.getElementsByClassName('calc-cancel');
    var calcEqual = document.getElementById("calc-equal");
    var calcDisplay = document.getElementsByClassName("calc-display")[0];
    var inputNum = 0, number1 = 0, number2 = 0, previousOperator, isFirstOperatorFlag = true, isEqualFlag = false, previousInput, previousInpNumber2, isoperatorEncountered = false, isMathOperation = false;
    var mathOperator = ['sin','cos','tan','sqrt'];
    
    //BEGIN :: Reset Calculator Values
    function resetCalc(){
        inputNum = undefined;
        number1 = 0;
        number2 = 0;
        isFirstOperatorFlag = true;
        isEqualFlag = false;
        calcDisplay.value = 0;
        previousInpNumber2 = undefined;
        previousInput = undefined;
        previousOperator = undefined;
        isoperatorEncountered = false;
        isMathOperation = false;
    }
    //END :: Reset Calculator Values

    //BEGIN :: Reset Operator button highlight
    function resetOperatorButtonHighlight(){
        for(let i = 0; i < calcOperations.length; i++){
            calcOperations[i].classList.remove("calc-button-highlight");
        }
    }
    //END :: Reset Operator button highlight

    //BEGIN :: Assign Value operation
    function assignValue(){
        if(isEqualFlag == false){
            isEqualFlag = true;         
        }
        performComputation();
        //previousOperator = "=";       
        inputNum = undefined;
        isEqualFlag = false;
        number2 = 0;
    }
    //END :: Assign Value operation

    //BEGIN :: Get Input Number
    function getInputNumber(input){
        if(inputNum == undefined){
            inputNum = input;
        }else{
            inputNum = (inputNum * 10) + (input * 1);
        }
        calcDisplay.value = inputNum;     
    }
    //END :: Get Input Number

    //BEGIN :: Perform Operation
    function performOperation(operator){
        var mathOperator = ['sin','cos','tan','sqrt'];
        if(mathOperator.indexOf(operator) > -1){
            isMathOperation = true;
            previousOperator = operator;
        }
        if(previousInput !== "operator" ){
            if((isFirstOperatorFlag === true && isMathOperation ===false) || isEqualFlag === true || mathOperator.indexOf(previousOperator) > -1){
                if(isMathOperation){
                    performComputation();
                    previousOperator = operator;
                }else{
                    if(typeof number1 === 'string' || number1 instanceof String || isNaN(calcDisplay.value)){
                        number1 = 0;
                    }else{
                        number1 = (calcDisplay.value * 1);
                    }
                }
                previousOperator = operator;
                inputNum = undefined;
                isFirstOperatorFlag = false;
                isEqualFlag = false;
            }else{
                if(previousInput !== "equal"){
                    performComputation();
                    previousOperator = operator;
                }
            }
        }
    }
    //END :: Perform Operation

    //BEGIN :: Perform Computation Operation
    function performComputation(){
        dispValue = calcDisplay.value * 1;
        if(isNaN(dispValue)){
            number1 = (calcDisplay.value);
            previousOperator = undefined;
        }else if(isEqualFlag === true && previousInput === "equal"){
            if(previousInpNumber2 === undefined || mathOperator.indexOf(previousOperator) > -1){
                number2 = (calcDisplay.value * 1);
            }else if(previousOperator === undefined){
                number1 = (calcDisplay.value);
                previousOperator = undefined;
            }else{
                number2 = previousInpNumber2;
            }
        }else if((isFirstOperatorFlag === true && isMathOperation ===false) && isFirstOperatorFlag === true){
            number1 = (calcDisplay.value);
            previousOperator = undefined;
        }else{
            number2 = (calcDisplay.value * 1);
        }        
        switch(previousOperator){
            case "+":
                number1 = calculator.add(number1, number2);
                break;
            case "-":
                number1 = calculator.subtract(number1, number2);
                break;
            case "*":
                number1 = calculator.multiply(number1, number2);
                break;
            case "/":
                number1 = calculator.divide(number1, number2);
                break;
            case "sin":
                number1 = calculator.sin(number2);
                break;
            case "cos":
                number1 = calculator.cos(number2);
                break; 
            case "tan":
                number1 = calculator.tan(number2);
                break;  
            case "sqrt":
                number1 = calculator.sqrt(number2);
                break;                       
            default :
                number1 = number1;
        }
        if(isMathOperation){
            previousInpNumber2 = number1;
            isMathOperation = false;
        }else{
            previousInpNumber2 = number2; 
        }       
        calcDisplay.value = number1;
        if (typeof number1 === 'string' || number1 instanceof String){
            number1 = 0;
        }
        inputNum = undefined;
        number2 = 0;
    }
    //END :: Perform Computation Operation

    //BEGIN :: Binding input listener for number clicks
    for(let i = 0; i < numInputs.length; i++){
        numInputs[i].addEventListener("click", function(){
            resetOperatorButtonHighlight();
            getInputNumber(numInputs[i].innerText);
            previousInput = "number";
        });
    }
    //END :: Binding input listener for number clicks

    //BEGIN :: Binding operation listener for operator clicks
    for(let i = 0; i < calcOperations.length; i++){
        calcOperations[i].addEventListener("click", function(){
            resetOperatorButtonHighlight();
            this.classList.add("calc-button-highlight");
            performOperation(calcOperations[i].innerText);
            previousInput = "operator";
        });
    }
    //END :: Binding operation listener for operator clicks

    //BEGIN :: Binding cancel listener
    calcClear[0].addEventListener("click", function(){
        resetOperatorButtonHighlight();
        resetCalc();
        previousInput = "clear";
    });
    //END :: Binding cancel listener

    //BEGIN :: Binding equal operation listener
    calcEqual.addEventListener("click", function(){
        resetOperatorButtonHighlight();
        assignValue();
        previousInput = "equal";
    });
    //END :: Binding equal operation listener

    //BEGIN :: Binding keypress operation
    document.addEventListener("keypress",function(e){
        var operators = ['+','-','*','/','=','c','C'];
        var operatorInput = String.fromCharCode(e.keyCode);
        if(isoperatorEncountered){
            calcDisplay.value = '';
        }
        if((e.keyCode >= 48 && e.keyCode <= 57) || (operators.indexOf(operatorInput) > -1)){
            if(operators.indexOf(operatorInput) > -1){
                isoperatorEncountered = true;
                if(operatorInput === "="){
                    assignValue();
                    previousInput = "equal";
                }else if(operatorInput === "c" || operatorInput === "C"){
                    resetCalc();
                    previousInput = "clear";
                }else{

                    performOperation(operatorInput);
                    previousInput = "operator";
                }
                document.onkeypress = function (e) 
                {
                 return false;
                } 
            }else{
                getInputNumber(e.key)
                isoperatorEncountered = false;
                previousInput = "number";
                document.onkeypress = function (e) 
                {
                return true;
                }
            }
        }else{
            document.onkeypress = function (e) 
            {
             return false;
            }
        }
    });
    //END :: Binding keypress operation
    //BEGIN :: Binding keypress operation
    calcDisplay.addEventListener("click",function(e){
        calcDisplay.value = "";
    });
    //END :: Binding keypress operation

})();