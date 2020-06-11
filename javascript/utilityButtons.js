/**
 * 
 */
function increment_filled_count(num) {
	filled_count = document.getElementById("num_filled");
	var current_count = parseInt(filled_count.value);
	current_count += num;
	filled_count.value = current_count.toString();

}

function checkSubmit() {
	submitButton = document.getElementById("submitButton");

	if (document.getElementById("num_filled").value == "81") {
		submitButton.disabled = false;
	}
	else {
		submitButton.disabled = true;
	}
}

function reset() {
		if(confirm("This resets the entire board. Are you sure you continue?")) {
		for (let i = 0; i < 81; i++) {
			var id = i.toString();
			inputBox = document.getElementById("I" + id);
			if (inputBox.getAttribute("class") == "filled_inputBox") {
				inputBox.value = "";
			}
		}
	}
}

function erase() {
	id = document.getElementById("selected").value.substring(1);
	inputBox = document.getElementById("I" + id);
	inputBox.value = "";
}

function check() {
	var counter = 0;
	for (let i = 0; i < 81; i++) {
		var id = i.toString();
		num = document.getElementById("I" + id).value;
		solution = document.getElementById("solution").value;
		if(num != 0 && num != solution[i]) {
			counter++;
		}
	}
	statement = document.getElementById("checkResult");
	if (counter == 0) {
		statement.innerHTML = "Everything Good! You have no mistakes.";
		statement.setAttribute("class", "result_correct");
	}

	else if (counter == 1) {
		statement.innerHTML = "Oops! You have 1 mistake.";
		statement.setAttribute("class", "result_mistake");
	}
	else {
		var counterString = counter.toString();
		statement.innerHTML = "Oops! You have " + counterString + " mistakes.";
		statement.setAttribute("class", "result_mistake");
	}
}


function option() {
	alert();
}

function submit() {
	statement = document.getElementById("checkResult");
	for (let i = 0; i < 81; i++){
		var id = i.toString();
		num = document.getElementById("I" + id).value;
		if (num != solution[i]){
			statement.setAttribute("class", "result_mistake");
			statement.innerHTML = "Sorry... You have at least one mistake.";
			return;
		}
	}
	statement.setAttribute("class", "result_submit_correct");
	statement.innerHTML = "All Correct! Thanks for playing!";
}