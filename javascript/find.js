/**
 * 
 */

function find(number) {
	selected = document.getElementById("selected");
	document.getElementById(selected.value).style.background = "";
	selected.value = "find1"
	find_helper(number);
}

function find_helper(number) {
	var elements = "";
	var counter = 0;
	blue = document.getElementById("blue");
	if (blue.value != "0") {
		deleteblue();
	}
	for (let i = 0; i < 81; i++) {
		var id = i.toString();
		tinput = document.getElementById("I" + id);
		if (tinput.value == number
				&& ("T" + id) != document.getElementById("selected").value) {
			td = document.getElementById("T" + id);
			td.style.background = "rgba(10, 140, 255, 0.2)";
			elements += " " + td.id;
			counter++;
		}
	}
	elements = counter.toString() + elements;
	blue.value = elements;
}