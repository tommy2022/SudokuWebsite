/**
 * 
 */

function onclickTd(td) {
	selected = document.getElementById("selected");
	if (selected.value != "find1") {
		delete_highlight_rowcol(parseInt(selected.value.substring(1),10));
	}
	document.getElementById(selected.value).style.background = "";
	selected.value = td.id;
	inputId = "I" + td.id.substring(1);
	input = document.getElementById(inputId);
	if (input.value != "") {
		find_helper(input.value);
	}
	else if (document.getElementById("shaded_num").value != ""){
		find_helper(document.getElementById("shaded_num").value);
	}
	highlight_rowcol(parseInt(td.id.substring(1),10));
	td.style.background = "rgba(255, 218, 0, 0.6)";
	eliminate = document.getElementById("option_eliminate");
	if (eliminate.value == "true") {
		for (let i = 1; i <= 9; i++){
			document.getElementById("Button" + i.toString()).disabled = false;
		}
		if (input.getAttribute("class") != "prefilled_inputBox"){
			eliminate_options(parseInt(td.id.substring(1)));
		}
	}
}

function highlight_rowcol(id){
	var col = id % 9;
	var row = Math.floor(id / 9);

	var cellnum = 0;
	//vertical highlight
	for (let i = 0; i < 9; i++) {
		 cellnum = col + (i * 9);
		 cell = document.getElementById("T" + cellnum.toString());
		 cell.style.background = "rgba(0, 128, 255, 0.15)";
		 
		 cellnum = row * 9 + i;
		 cell = document.getElementById("T" + cellnum.toString());
		 cell.style.background = "rgba(0, 128, 255, 0.15)";
	}
}

function delete_highlight_rowcol(id) {
	var col = id % 9;
	var row = Math.floor(id / 9);
	
	for (let i = 0; i < 9; i++) {
		 cellnum = col + (i * 9);
		 cell = document.getElementById("T" + cellnum.toString());
		 cell.style.background = "";
			 
		 cellnum = row * 9 + i;
		 cell = document.getElementById("T" + cellnum.toString());
		 cell.style.background = "";
	}
}

function eliminate_options(id){
		
	var row = Math.floor(id / 9);
	var column = id % 9;
	var list = new LinkedList();
	var index;
	
	for (let i = 0; i < dimension; i++) {
		//row
		index = row * 9 + i;
		val = document.getElementById("I" + index.toString()).value
		if (val != "") {
			list.add(val);
		}
		
		//column
		index = column + i * 9;
		val = document.getElementById("I" + index.toString()).value
		if (val != "") {
			list.add(val);
		}
	}
	
	var row_sec = Math.floor(id / 27) * 3;
	var col_sec = Math.floor((id % 9) / 3) * 3;
	for(let i = row_sec; i < row_sec + dimension / 3; i++){
		for (let j = col_sec; j < col_sec + dimension / 3; j++) {
			index = j + i * 9;
			val = document.getElementById("I" + index.toString()).value
			if (val != "") {
				list.add(val);
			}
		}
	}
	var repeats = list.get_size();
	for (let elem = 0; elem < repeats; elem++) {
		var number = list.get_first();
		btn = document.getElementById("Button" + number);
		btn.disabled = true;
	}
	
}

function deleteshaded() {
	shaded = document.getElementById("shaded");
	const id = shaded.value.split(" ");
	for (let i = 1; i <= id[0]; i++) {
		if (document.getElementById(id[i]).style.background != "rgba(0, 128, 255, 0.15)") {
			document.getElementById(id[i]).style.background = "";
		}
	}
	shaded.value = "0";
	document.getElementById("shaded_num").value = "";
}

function unselect() {
	selected = document.getElementById("selected");
	document.getElementById(selected.value).style.background = "";
	selected.value = "find1";
	
	for (let i = 1; i <= 9; i++){
		document.getElementById("Button" + i.toString()).disabled = false;
	}
}
