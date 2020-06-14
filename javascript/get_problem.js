/**
 * 
 */ 
	url = location.href;
    var parameters = url.split("?")[1].split("&");
    difficulty = parameters[0].split("=")[1];
    question_type = parameters[1].split("=")[1]
    document.title = "Puzzle_" + difficulty + "_" + question_type;
    document.getElementById("diff").innerHTML = "Difficulty: " + difficulty;
    document.getElementById("ptype").innerHTML = "Problem: " + question_type;

    if (question_type == "Random") {
    	var text = createRandom(difficulty);
    	var returned = text.split("\n");
    	document.getElementById("problem").value = returned[0];
  	    document.getElementById("solution").value = returned[1];
  	    set_table();
    }
    
    else {
        type = parseInt(question_type);
        var text = "";
	    httpObj = new XMLHttpRequest();
	    httpObj.open('GET',"./problems/"+difficulty+".txt"+"?"+(new Date()).getTime(),true);
	    httpObj.send(null);
	    httpObj.onreadystatechange = function(){
	       if ( (httpObj.readyState == 4) && (httpObj.status == 200) ){
	    	   text = httpObj.responseText; 
	    	   var pieces = text.split("\n");
	    	   document.getElementById("problem").value = pieces[(type - 1) * 2];
	    	   document.getElementById("solution").value = pieces[(type - 1) * 2 + 1];
	    	   set_table();
	       }
	    };
	    httpObj.onerror = function(){
	  	  alert("error");
	    };
    }
