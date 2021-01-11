const DIMENSION = 9;
const COMPLETE = Math.pow(2, 10) - 2; //1 1111 1111 in binary

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function get_num_filled(difficulty) {
  var filledCount = randomInt(5);
  if (difficulty == "Easy") {
    filledCount += 35;
  }
  else if (difficulty == "Medium") {
    filledCount += 28;
  }
  else if (difficulty == "Hard") {
    filledCount += 20;
  }
  return filledCount;
}

function check_pow2(n) {
  return (Math.ceil(Math.log2(n)) == Math.floor(Math.log2(n)));
}

function calc_squ(row, col) {
  return 3 * Math.floor(row / 3) + Math.floor(col / 3);
}

function createRandom(difficulty) {
  const num_filled = get_num_filled(difficulty);
  const board = {
    problem: new Array(DIMENSION),
    solution: new Array(DIMENSION),
    row_mem: new Array(DIMENSION),
    col_mem: new Array(DIMENSION),
    squ_mem: new Array(DIMENSION),
  }
  for (let i = 0; i < DIMENSION; i++) {
    board.solution[i] = new Array(DIMENSION);
    board.problem[i] = new Array(DIMENSION);
  }
  
  do {
    new_board(board, num_filled);
  } while(solve(board));

  var rtn = {
    problem: "",
    solution: "",
  }
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      rtn.problem += board.problem[i][j].toString();
      //debuger;
      rtn.solution += Math.log2(board.solution[i][j]).toString();
    }
  }
  return rtn;
}

function new_board(board, num_filled) {
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      board.solution[i][j] = {
        filled: false,
        val: COMPLETE,
    }
    board.problem[i].fill(0);
    board.row_mem[i] = 0;
    board.col_mem[i] = 0;
    board.squ_mem[i] = 0;
  }
  var counter = 0;
  var row = 0;
  var col = 0;
  while (counter < num_filled) {
    row = randomInt(9);
    col = randomInt(9);

    if (board.solution[row][col] == 0) {
      let input_num = randomInt(9) + 1;
      //let input_num = map[row][col];
      if (check_invariant(row, col, calc_squ(row, col), 1 << input_num)) {
        board.problem[row][col] = input_num;
        board.solution[row][col] = input_num;
        board.row_mem[row] += 1 << input_num;
        board.col_mem[col] += 1 << input_num;
        board.squ_mem[calc_squ(row, col)] += 1 << input_num;
      }
    }
  }
  }
}

function solve(board) {
  return;
}

function solve_eliminate_setup(board) {
  //eliminate options
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      //if this block is filled
      if (board.solution[i][j].filled) {
        let num = board.solution[i][j].val;
        
        for (let k = 0; k < DIMENSION; k++) {
          if (!board.solution[i][k].filled) {
            //delete from row
            this.remove(i, k, num);
          }
          if (!this.solution[k][j].filled) {
            //delete from column
            this.remove(k, j, num);
          }
          this.remove_from_square(i, j, num);
        }
      }
    }
  }
}

function remove_from_square(row, col, num) {
  const row_start = Math.floor(row / 3) * 3;
  const col_start = Math.floor(col / 3) * 3;

  for (let i = row_start; i < row_start + DIMENSION / 3; i++) {
    for (let j = col_start; j < col_start + DIMENSION / 3; j++) {
      if　(!this.solution[i][j].filled) {
        this.remove(i, j, num);
      }
    }
  }
}

function solve_eliminate() {
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      if (!this.solution[i][j].filled) {
        this.check_unique(i, j);
      }
    }
  }
}


function check_unique(row, col) {
  if (this.solution[row][col].filled) {
    return;
  }
  if (this.solution[row][col].val == 0) {
    //debuger;
    throw 'Puzzle not solvable1';
  }
  if (check_pow2(this.solution[row][col].val)
    && !this.attempt_set_value(row, col)) {
    throw 'Puzzle not solvable2';
  }
}

function attempt_set_value(row, col) {
  const num = this.solution[row][col].val;
  const squ = calc_squ(row, col);
  if (!this.check_invariant(row, col, squ, num)) {
    return false;
  }
  else {
    this.row_mem[row] -= num;
    this.col_mem[col] -= num;
    this.squ_mem[squ] -= num;
    this.solution[row][col].filled = true;
    for (let i = 0; i < DIMENSION; i++) {
      if (i != row) {
        this.remove(i, col, num)
        this.check_unique(i, col);
      }
      if (i != col) {
        this.remove(row, i, num);
        this.check_unique(row, i);
      }
    }
    
    for (let squ_row = 3 * Math.floor(row / 3);
    squ_row < 3 * Math.floor(row / 3) + 3; squ_row++) {
      for (let squ_col = 3 * Math.floor(col / 3); 
      squ_col < 3 * Math.floor(col / 3) + 3; squ_col++) {
          if (squ_row != row && squ_col != col) {
            this.remove(squ_row, squ_col, num);
            this.check_unique(squ_row, squ_col);
          }
      }
    }
    return true;
  }
}

function contains(bin, num) {
  return check_pow2(bin & (1 << num));
}

function check_invariant(row, col, squ, num) {
  //0 if num is already filled in
  if ((board.row_mem[row] & num) != 0 
    && (board.col_mem[col] & num) != 0
    && (board.squ_mem[squ] & num) != 0) {
      return true;
    }
    return false;
}
