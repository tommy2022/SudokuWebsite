/**
 * 
 */

function isNumber(inputBox, evt) {
	if (inputBox.getAttribute("class") == "prefilled_inputBox") {
		return false;
	}
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 8 || charCode == 46) {
    	if (inputBox.getAttribute("class") != "nonfilled_inputBox") {
    		increment_filled_count(-1);
    		inputBox.setAttribute("class", "nonfilled_inputBox");
    		reflect_delete(inputBox.value);
    		inputBox.value = "";
    		checkSubmit();
    	}
    	return true;
    }
    if (charCode >= 97 && charCode <= 105) {
    	charCode -= 48;
    } 
    if (charCode < 49 || charCode > 57) {
        return false;
    }
    if (inputBox.getAttribute("class") == "filled_inputBox") {
    	reflect_delete(inputBox.value);
    }
    if (inputBox.getAttribute("class") != "filled_inputBox") {
    	increment_filled_count(1);
	    inputBox.setAttribute("class", "filled_inputBox");
	    checkSubmit();
    }
    find_helper((charCode - 48).toString());
    inputBox.setAttribute("value", (charCode - 48).toString());
    check_complete((charCode - 48).toString());
    return true;
}

function setValue(num) {
	id = document.getElementById("selected").value.substring(1);
	inputBox = document.getElementById("I" + id);
	if (inputBox.getAttribute("class") == "prefilled_inputBox") {
		return;
	}
	if (inputBox.getAttribute("class") != "filled_inputBox") {
    	increment_filled_count(1);
	    inputBox.setAttribute("class", "filled_inputBox");
	    checkSubmit();
    }
	else {
		reflect_delete(inputBox.value);
	}
	inputBox.value = num;
	check_complete(num);
	inputBox.setAttribute("class", "filled_inputBox");
	find_helper(num)
}

function check_complete(check_num) {
	var count = 0;
	for (let i = 0; i < 81; i++){
		if (document.getElementById("I" + i.toString()).value == check_num) {
			count++
		}
	}
	if (count == 9) {
		document.getElementById("find" + check_num).setAttribute("class", "num_complete");
	}
		
}

function reflect_delete(num){
	document.getElementById("find" + num).setAttribute("class", "num_incomplete");
}