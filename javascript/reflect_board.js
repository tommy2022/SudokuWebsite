/**
 * 
 */

 function set_table() {
	 var className = "";
	 var problem = document.getElementById("problem").value;
	 var filledCount = 0;
	
	 for (let i = 0; i < 81; i++) {
		 if (i % 3 == 0) {
			 var col = "y";
		 }
		 else {
			 var col = "n";
		 }
		 if (Math.floor(i / 9) % 3 == 0) {
			 var row = "top";
		 }
		 else {
			 var row = "middle";
		 }
		 var id = i.toString();
		 tcell = document.getElementById("T" + id);
		 className = row + "_" + col;
	
		 tcell.setAttribute("class", className);
		 tcell.setAttribute("onclick", "onclickTd(this)");
		 tcell.innerHTML = '<input id="I' + id + '" type="button" value=""'
		 + ' onkeydown="return isNumber(this, event)">';
	
		 tinput = document.getElementById("I" + id);
		 var num = parseInt(problem.charAt(i));
	
		 if (num == 0) {
			 tinput.setAttribute("maxlength", "1");
			 tinput.setAttribute("class", "nonfilled_inputBox");
		 }
	
		 else {
			 tcell.setAttribute("class", tcell.getAttribute("class") + " prefilledCell");
			 tinput.setAttribute("class", "prefilled_inputBox");
			 tinput.setAttribute("value", num.toString());
			 tinput.setAttribute("readonly", "");
			 filledCount++;
		 }
	 }
	 numfilled = filledCount.toString();
	 document.getElementById("num_filled").value = numfilled;
 }