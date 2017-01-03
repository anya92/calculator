$(document).ready(function() {
    var firstNum = '',
        secondNum = '',
        result = 0,
        operator,
        operSign,
        answer = $("#answer"),
        calc = $("#calc");
    answer.text("0");
    /* Testing number length */
    var testLength = function(number) {
        if (number.length > 10) {
            answer.text("Err");
            number = '';
        }
    };
    /* Numbers and Operators buttons */
    $("#numbers > button").click(function() {
        if ($(this).attr('class') === 'col-xs-3 btn num') {

            firstNum += $(this).attr('value');
            answer.text(Number(firstNum, 10));
            testLength(firstNum);
        }
        if ($(this).attr('id') === 'decimal') {if (firstNum.indexOf('.') === -1) {firstNum += '.'; answer.append('.');}}
        if ($(this).attr('value') === '+' || $(this).attr('value') === '-' || $(this).attr('value') === '*' || $(this).attr('value') === '/') {
            if (result === 0) {calc.text('');}
            else {calc.text(result);}
            operator = $(this).attr('value');
            operSign = $(this).html();
            secondNum = firstNum;
            firstNum = '';
            answer.text(operSign);
        }
        if ($(this).attr('id') === 'pow') {
          if (result === 0) {calc.text('');}
          else {calc.text(result);}
            operator = 'pow';
            operSign = '^';
            secondNum = firstNum;
            firstNum = '';
            answer.text(operSign);
        }

    });
    /* BACKSPACE button */
    $("#backspace").click(function() {
        firstNum = firstNum.substr(0, firstNum.length - 1);
        if (firstNum.length === 0) {
            answer.text("0");
        } else {
            answer.text(firstNum);
        }
    });
    /* CLEAR and ALLCLEAR buttons */
    $("#clear, #allclear").click(function() {
        firstNum = "";
        answer.text(operator);
        if ($(this).attr('id') === "allclear") {
          result = 0;
            secondNum = "";
            answer.text("0");
            calc.text("");
        }
    });
    /* +/- button */
    $("#plusminus").click(function() {
        result = firstNum * -1;
        firstNum = result;
        if (result.toString().length > 10) {
            answer.text(result.toString().slice(0, 11));
        } else {
            answer.text(result);
        }
    });
    /* SQRT button */
    $("#sqrt").click(function() {
        if (firstNum < 0) {
            answer.text("Err");
        } else {
            result = Math.sqrt(firstNum);
            calc.text("√" + firstNum + " =");
            firstNum = result;
            if (result.toString().length > 10) {
                answer.text(result.toString().slice(0, 10));
            } else {
                answer.text(result);
            }
        }
    });

    /* PERCENT button */

    /* Decimal button
    $("#decimal").click(function() {
      if (firstNum.indexOf('.') === -1) {firstNum += '.';}
    });*/
    /* EQUAL button */
    $("#equals").click(function() {
        if (operator === "+") {
            result = (Number(secondNum) + Number(firstNum));
            calc.text(Number(secondNum) + " " + operSign + " " + Number(firstNum) + " =");
            firstNum = result;
        } else if (operator === '-') {
            result = (Number(secondNum) - Number(firstNum));
            calc.text(Number(secondNum) + " " + operSign + " " + Number(firstNum) + " =");
            firstNum = result;
        } else if (operator === '*') {
            result = (Number(secondNum) * Number(firstNum));
            calc.text(Number(secondNum) + " " + operSign + " " + Number(firstNum) + " =");
            firstNum = result;
        } else if (operator === '/') {
            result = (Number(secondNum) / Number(firstNum));
            calc.text(Number(secondNum) + " " + operSign + " " + Number(firstNum) + " =");
            firstNum = result;
        } else if (operator === 'pow') {
            result = Math.pow(Number(secondNum), Number(firstNum));
            calc.text(Number(secondNum) + " " + operSign + " " + Number(firstNum) + " =");
            firstNum = result;
        }
        if (result > 9999999999) {answer.text("Err"); firstNum = ''; calc.text('');} else {
        if (result.toString().length > 10) {
            answer.text(result.toString().slice(0, 10));
        } else {
            answer.text(result);
        }
}
    });

});
