var calculator = {
    //BEGIN :: Number overflow check 
    addOverflowCheck : function(number1, number2, result){
        return number1.toFixed(10) !== (result - number2).toFixed(10) || number2.toFixed(10) !== (result - number1).toFixed(10);
    },
    subOverflowCheck : function(number1, number2, result){
        return number1.toFixed(10) !== (result + number2).toFixed(10) || number2.toFixed(10) !== (number1 - result).toFixed(10);
    },
    mulOverflowCheck : function(number1, number2, result){
        return number1.toFixed(10) !== (result / number2).toFixed(10) || number2.toFixed(10) !== (result / number1).toFixed(10);
    },
    divOverflowCheck : function(number1, number2, result){
        return number1.toFixed(10) !== (result * number2).toFixed(10) || number2.toFixed(10) !== (number1 / result).toFixed(10); 
    },
    //END :: Number overflow check
    //BEGIN :: Numeric operation 
    //BEGIN :: Add operation   
    add : function(number1, number2){
        result = number1 + number2;
        if(this.addOverflowCheck(number1, number2, result)){
            return CALC_CONSTANTS.RANGE_EXCEEDED;
        }else{
            return result;
        }
    },
    //END :: Add operation 
    //BEGIN ::  Subtraction operation 
    subtract : function(number1, number2){
        result = number1 - number2;
        if(this.subOverflowCheck(number1, number2, result)){
            return CALC_CONSTANTS.RANGE_EXCEEDED;
        }else{
            return result;
        }
    },
    //END ::  Subtraction operation 
    //BEGIN ::  Multiplication operation 
    multiply : function(number1, number2){
        result = number1 * number2;
        if(this.mulOverflowCheck(number1, number2, result)){
            return CALC_CONSTANTS.RANGE_EXCEEDED;
        }else{
            return result;
        }
    },
    //END ::  Multiplication operation
    //BEGIN ::  Divide operation
    divide : function(number1, number2){
        if(number2 == 0){
            return CALC_CONSTANTS.DIVIDE_BY_ZERO;
        }else{
            result = number1 / number2;
            if(this.divOverflowCheck(number1, number2, result)){
                return CALC_CONSTANTS.RANGE_EXCEEDED;
            }else{
                return result;
            }
        }
    },
    //END ::  Divide operation
    //END :: Numeric operation

    //BEGIN :: Math operation
    //BEGIN :: sin operation
    sin : function(number1){
        var result;
        result = Math.sin(number1);
        return result;
    },
    //END :: sin operation
    //BEGIN :: cos operation
    cos : function(number1){
        var result;
        result = Math.cos(number1);
        return result;
    },
    //END :: cos operation
    //BEGIN :: tan operation
    tan : function(number1){
        var result;
        result = Math.tan(number1);
        return result;
    },
    //END :: tan operation
    //BEGIN :: sqrt operation
    sqrt : function(number1){
        var result;
        result = Math.sqrt(number1);
        return result;
    }
    //END :: sqrt operation    
    //END :: Math operation
}