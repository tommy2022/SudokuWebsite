const dimension = 9;

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function reset_board(board) {
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      board.problem[i][j] = 0;
      board.solution[i][j] = 0;
    }
    board.row_mem[i] = 0;
    board.col_mem[i] = 0;
    board.squ_mem[i] = 0;
  }
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

function createRandom(difficulty) {
	var num_filled = get_num_filled(difficulty);

  // Create one dimensional array
  const board = {
    problem: new Array(dimension),
    solution: new Array(dimension),
    row_mem: new Array(dimension),
    col_mem: new Array(dimension),
    squ_mem: new Array(dimension),
    solved: false,
  };

  for (let i = 0; i < dimension; i++) {
    board.problem[i] = new Array(dimension);
    board.solution[i] = new Array(dimension);
  }
  
	while (true) {
    reset_board(board);
    debugger;
    solve()
    debugger;
    if (board.solved) break;
	}

  var rtn = {
    problem: "",
    solution: "",
  }
	for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      rtn.problem += board.problem[i][j].toString();
      rtn.solution += board.solution[i][j].toString();
    }
  }
	return rtn;
}

