var calculator = (function (){
    //BEGIN :: Number overflow check 
    var addOverflowCheck = function(number1, number2, result){
        return number1.toFixed(10) !== (result - number2).toFixed(10) || number2.toFixed(10) !== (result - number1).toFixed(10);
    }
    var subOverflowCheck = function(number1, number2, result){
        return number1.toFixed(10) !== (result + number2).toFixed(10) || number2.toFixed(10) !== (number1 - result).toFixed(10);
    }
    var mulOverflowCheck = function(number1, number2, result){
        return number1.toFixed(10) !== (result / number2).toFixed(10) || number2.toFixed(10) !== (result / number1).toFixed(10);
    }
    var divOverflowCheck = function(number1, number2, result){
        return number1.toFixed(10) !== (result * number2).toFixed(10) || number2.toFixed(10) !== (number1 / result).toFixed(10); 
    }
    //END :: Number overflow check
    //BEGIN :: Numeric operation 
    //BEGIN :: Add operation   
    var add = function(number1, number2){
        var result;
        result = number1 + number2;
        if(addOverflowCheck(number1, number2, result)){
            return CALC_CONSTANTS.RANGE_EXCEEDED;
        }else{
            return result;
        }
    }
    //END :: Add operation 
    //BEGIN ::  Subtraction operation 
    var subtract = function(number1, number2){
        var result;
        result = number1 - number2;
        if(subOverflowCheck(number1, number2, result)){
            return CALC_CONSTANTS.RANGE_EXCEEDED;
        }else{
            return result;
        }
    }
    //END ::  Subtraction operation 
    //BEGIN ::  Multiplication operation 
    var multiply = function(number1, number2){
        var result;
        result = number1 * number2;
        if(number2 === 0 || number1 === 0){
            return result;
        }else{
            if(mulOverflowCheck(number1, number2, result)){
                return CALC_CONSTANTS.RANGE_EXCEEDED;
            }else{
                return result;
            }
        }
    }
    //END ::  Multiplication operation
    //BEGIN ::  Divide operation
    var divide = function(number1, number2){
        var result;
        if(number2 === 0){
            return CALC_CONSTANTS.DIVIDE_BY_ZERO;
        }else{
            result = number1 / number2;
            if(divOverflowCheck(number1, number2, result)){
                return CALC_CONSTANTS.RANGE_EXCEEDED;
            }else{
                return result;
            }
        }
    }
    //END ::  Divide operation
    //END :: Numeric operation

    //BEGIN :: Math operations
    //BEGIN :: sin operation
    var sin = function(number1){
        var result;
        result = Math.sin(number1);
        return result;
    }
    //END :: sin operation
    //BEGIN :: cos operation
    var cos = function(number1){
        var result;
        result = Math.cos(number1);
        return result;
    }
    //END :: cos operation
    //BEGIN :: tan operation
    var tan = function(number1){
        var result;
        result = Math.tan(number1);
        return result;
    }
    //END :: tan operation
    //BEGIN :: sqrt operation
    var sqrt = function(number1){
        var result;
        result = Math.sqrt(number1);
        return result;
    }
    //END :: sqrt operation    
    //END :: Math operations

    //BEGIN :: Exposing only the arithmetic operation
    return {
        add : add,
        subtract : subtract,
        multiply : multiply,
        divide : divide,
        sin : sin,
        cos : cos,
        tan : tan,
        sqrt : sqrt
    };
    //END :: Exposing only the arithmetic operation

})();