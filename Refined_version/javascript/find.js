/**
 * 
 */

function find(number) {
	selected = document.getElementById("selected");
	if (selected.value != "find1") {
		delete_highlight_rowcol(parseInt(selected.value.substring(1),10));
	}
	unselect();
	find_helper(number);
	
}

function find_helper(number) {
	var elements = "";
	var counter = 0;
	shaded = document.getElementById("shaded");
	if (shaded.value != "0") {
		deleteshaded();
	}
	for (let i = 0; i < 81; i++) {
		var id = i.toString();
		tinput = document.getElementById("I" + id);
		if (tinput.value == number
				&& ("T" + id) != document.getElementById("selected").value) {
			td = document.getElementById("T" + id);
			td.style.background = "rgba(110, 124, 140, 0.3)";
			elements += " " + td.id;
			counter++;
		}
	}
	elements = counter.toString() + elements;
	shaded.value = elements;
	document.getElementById("shaded_num").value = number;
}