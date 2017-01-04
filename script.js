$(document).ready(function() {
    var firstNum = '',
        secondNum = '',//to remove
        result = 0,
        operator,
        operSign,
        dzialanie = "",
        answer = $("#answer"),
        calc = $("#calc");
    answer.text("0");
    var obliczanie = $("#dzialanie");
    obliczanie.text("");

    /* Testing number length */
    var testLength = function(number) {
        if (number.length > 10) {
            answer.text("Err");
            number = '';
            obliczanie.text('Err');
        }
    };

    /* Numbers and Operators buttons */
    $("#numbers > button").click(function() {
        obliczanie.append($(this).attr('value'));
        if ($(this).attr('class') === 'col-xs-3 btn num') {
            firstNum += $(this).attr('value');
            answer.text(firstNum);
            testLength(firstNum);
        }
        /* Decimal button */
        if ($(this).attr('id') === 'decimal') {
            if (firstNum.indexOf('.') === -1) {
                firstNum += '.';
                answer.append('.');
            }
        }
        if ($(this).attr('id') === 'bracketLeft') {
            firstNum += '(';
          //  answer.append('(');
        }
        if ($(this).attr('id') === 'bracketRight') {
            firstNum += ')';
            //answer.append(')');
        }
        if ($(this).attr('class') === 'col-xs-3 btn operator') {
            if (result === 0) {
                calc.text('');
            } else {
                calc.text("= " + result);
            }
            operator = $(this).attr('value');
            operSign = $(this).html();
            secondNum = firstNum;
            dzialanie += (firstNum + operator);
            if (firstNum === '') {dzialanie = dzialanie.replace(dzialanie[dzialanie.length - 2],'');} //fixing double operators
            firstNum = '';
            answer.text(operator);
          //  obliczanie.append(operSign);
        }
        if ($(this).attr('id') === 'pow') {
            if (firstNum === 0) {
                calc.text('');
            } else {
                calc.text(firstNum);
            }
            operator = 'pow';
            operSign = '^';
            secondNum = firstNum;
            firstNum = '';
            answer.text(operSign);
            console.log(secondNum);
        }

    });
    /* BACKSPACE button */
    $("#backspace").click(function() {
        firstNum = firstNum.substr(0, firstNum.length - 1);
        //obliczanie.remove(); !!!!!!!!!!!!
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
            dzialanie = "";
            obliczanie.text("");
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
            calc.text("(√" + firstNum + ")");
            obliczanie.text("");
            firstNum = result;
            if (result.toString().length > 10) {
                answer.text(result.toString().slice(0, 10));
            } else {
                answer.text(result);
            }
        }
    });

    /* PERCENT button */

    /* EQUAL button */
    $("#equals").click(function() {
        dzialanie += firstNum;
        /*jshint evil:true */
        result = eval(dzialanie);
        obliczanie.text("");
        if (result > 9999999999) {
            answer.text("Err");
            result = 0;
            dzialanie = '';
            firstNum = '';
            calc.text('');
        } else {
            if (result.toString().length > 10) {
                answer.text(result.toString().slice(0, 10));
                calc.text(dzialanie + " =");
            } else {
                answer.text(result);
                firstNum = result;
                calc.text(dzialanie + " =");
                dzialanie = '';
                console.log(dzialanie);
            }
        }
    });
});
