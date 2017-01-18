$(document).ready(function() {
    var total,
        input = [''],
        dot = false,
        result,
        answer = $("#answer");
        answer.text("");

    var testLength = function(number) {
        if (input.length > 10) {
            answer.text("Err");
            input=[''];
        }
    };
    
    $("#numbers > button").not("#equals").click(function() {
    	/*NUMBERS*/
        if ($(this).attr('class') === 'col-xs-3 btn num') {
        	if (input.length === 1 && input == eval(total)) {
        		input= [];
        		dot = false;
        		total = input.join('');
    			answer.text(total);
        		input.push($(this).html());
        	    answer.append($(this).html());
        	} else {
        		input.push($(this).html());
				total = input.join('');
    			answer.text(total);	
        	}
        	testLength();
        }
        /*OPERATORS*/
        if ($(this).attr('class') === 'col-xs-3 btn operator' || 
        	$(this).attr('class') === 'col-xs-4 btn operator') {
        	 
        	if (input[input.length - 1] === "+" ||
        			input[input.length - 1] === "-" ||
        			input[input.length - 1] === "*" ||
        			input[input.length - 1] === "/") {
        		input.pop();
        		total = input.join('');
    			answer.text(total);
        		input.push($(this).attr('value'));
        		answer.append($(this).attr('value'));	
        	} else {
        		input.push($(this).attr('value'));
        		answer.append($(this).attr('value'));
        	}
        	dot = false;
        	console.log(input);
        			
        }
        /*DECIMAL POINT*/
        if ($(this).attr('id') === "decimal") {
        	if (input[input.length - 1] !== "." && dot === false && input[input.length - 1] !== result) {
        		if (input[input.length - 1] === "" ||
        			input[input.length - 1] === "+" ||
        			input[input.length - 1] === "-" ||
        			input[input.length - 1] === "*" ||
        			input[input.length - 1] === "/") {
        			input.push("0");
        			total = input.join('');
    				answer.text(total);
        		}
        		input.push($(this).attr('value'));
        		total = input.join('');
    			answer.text(total);
    			dot = true;
        	} 
        	
        }

    });
 	/* EQUAL button */
    $("#equals").click(function() {
    	if (input[input.length - 1] === "+" ||
        	input[input.length - 1] === "-" ||
        	input[input.length - 1] === "*" ||
        	input[input.length - 1] === "/") {
    		input.pop();
    	}
    	total = input.join('');
    	input = [];
    	result = eval(total);
    	if (result > 999999999) {
    			input.push(result);
    			answer.text(result.toExponential(2));
    	} else if (result.toString().length > 10){
    		input.push(result.toFixed(5));
    		answer.text(result.toString().slice(0,5));
    	} 
    	else {
    	answer.text(result);
    	input.push(result);
    	} 

    });

    /* CLEAR and ALLCLEAR buttons */
    $("#clear").click(function() {
    	if (input[input.length - 1] === '.') {
    		dot = false;	
    	}
    	input.pop();
    	total = input.join('');
    	answer.text(total);

    });
     $("#allclear").click(function() {
    	input = [''];
    	total = input.join('');
    	answer.text(total);
    	dot = false;
    });

     /*Errors handler*/
    
    
    
});