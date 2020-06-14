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
	highlight_rowcol(parseInt(td.id.substring(1),10));
	td.style.background = "rgba(255, 218, 0, 0.6)";
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
	  var row_sec = Math.floor(id / 27) * 3;
	  var col_sec = Math.floor((id % 9) / 3) * 3;
	  for (let i = row_sec; i < row_sec + dimension / 3; i++) {
		  for (let j = col_sec; j < col_sec + dimension / 3; j++) {
			  index = (i * 9 + j).toString();
			 cell = document.getElementById("T" + index);
			 cell.style.background = "rgba(0, 128, 255, 0.07)";
		  }
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
	  var row_sec = Math.floor(id / 27) * 3;
	  var col_sec = Math.floor((id % 9) / 3) * 3;
	  for (let i = row_sec; i < row_sec + dimension / 3; i++) {
		  for (let j = col_sec; j < col_sec + dimension / 3; j++) {
			  index = (i * 9 + j).toString();
			 cell = document.getElementById("T" + index);
			 cell.style.background = "";
		  }
	  }
}

function deleteblue() {
	blue = document.getElementById("blue");
	const id = blue.value.split(" ");
	for (let i = 1; i <= id[0]; i++) {
		document.getElementById(id[i]).style.background = "";
	}
	blue.value = "0";
}

function unselect() {
	selected = document.getElementById("selected");
	document.getElementById(selected.value).style.background = "";
	selected.value = "find1";
}
