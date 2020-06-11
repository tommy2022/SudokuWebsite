/**
 * 
 */

function onclickTd(td) {
	selected = document.getElementById("selected");
	document.getElementById(selected.value).style.background = "";
	deleteblue();
	td.style.background = "rgba(255, 218, 0, 0.6)";
	selected.value = td.id;
}

function deleteblue() {
	blue = document.getElementById("blue");
	const id = blue.value.split(" ");
	for (let i = 1; i <= id[0]; i++) {
		document.getElementById(id[i]).style.background = "";
	}
	blue.value = "0";
}

