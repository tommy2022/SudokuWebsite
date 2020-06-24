const dimension = 9;

function createRandom(difficulty) {
	var num_filled = get_num_filled(difficulty);
	
	// Create one dimensional array
	var randomProblem = new Array(dimension * dimension);
	var solvable = false;
	var solution = "";
	do {
	try {
	  for (let i = 0; i < randomProblem.length; i++){
	    randomProblem[i] = 0;
	  }
	  randomAssignment(randomProblem, num_filled);
	
	  var checker = new checkSolvable(randomProblem);
	  solvable = checker.get_solvable();
	  solution = checker.get_solution();
	}
	catch (err) {}
	} while (solvable == false);
	
	var problem = "";
	for (let i = 0; i < dimension * dimension; i++) {
	  problem += randomProblem[i].toString();
	}
	var rtn = problem + "\n" + solution;
	return rtn;
}

function get_num_filled(difficulty) {
	var filledCount = randomInt(3);
	if (difficulty == "Easy") {
		filledCount += 35;
	}
	else if (difficulty == "Medium") {
		filledCount += 23;
	}
	return filledCount;
}