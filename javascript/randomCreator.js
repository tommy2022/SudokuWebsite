const DIMENSION = 9;
const COMPLETE = Math.pow(2, 10) - 2; //1 1111 1111 in binary
const SEED = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 1, 5, 6, 4, 8, 9, 7],
  [5, 6, 4, 8, 9, 7, 2, 3, 1],
  [8, 9, 7, 2, 3, 1, 5, 6, 4],
  [3, 1, 2, 6, 4, 5, 9, 7, 8],
  [6, 4, 5, 9, 7, 8, 3, 1, 2],
  [9, 7, 8, 3, 1, 2, 6, 4, 5],
]
const NUM_REPS = 30;


function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function check_pow2(n) {
  return (Math.ceil(Math.log2(n)) == Math.floor(Math.log2(n)));
}

class RandomCreator {
  constructor () {
    this.problem = new Array(DIMENSION);
    this.solution = new Array(DIMENSION);

    this.row_mem = new Array(DIMENSION).fill(COMPLETE);
    this.col_mem = new Array(DIMENSION).fill(COMPLETE);
    this.squ_mem = new Array(DIMENSION).fill(COMPLETE);
    this.curr_row = 0;
    this.curr_col = 0;
    this.num_solutions = 0;

    this.sum_1_thru_dim = 0;
    this.sum_sq_1_thru_dim = 0;
    for (let i = 0; i < DIMENSION; i++) {
      this.problem[i] = new Array(DIMENSION).fill(0);
      this.solution[i] = new Array(DIMENSION).fill(null);
      this.sum_1_thru_dim += (i + 1); //sum int from 1 to 9
      this.sum_sq_1_thru_dim += (i + 1) * (i + 1); //sum squares of 1 to 9
    }
  }

  stringifyProblem() {
    let rtn = "";
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        rtn += this.problem[i][j].toString();
      }
    }
    return rtn;
  }
  
  createRandom() {
    this.problem = SEED;
    //this.randomFilled();

    return this.stringifyProblem();
  }

  randomFilled() {
    for (let rep = 0; rep < 5; rep++) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          this.swap_col(i, j);
          this.swap_row(i, j);
        }
      }
    }
  }

  swap(row1, col1, row2, col2) {
    let temp = this.problem[row1][col1];
    this.problem[row1][col1] = this.problem[row2][col2];
    this.problem[row2][col2] = temp;
  }
  
  swap_col(i, j) {
    let row = randomInt(2) + i * 3;
    let col = randomInt(3) + j * 3;
    this.swap(row, col, row + 1, col);
    this.find_duplicate_row(row, col);
    //console.log(this.dumb_check_inv());
  }

  swap_row(i, j) {
    let col = randomInt(2) + i * 3;
    let row = randomInt(3) + j * 3;
    this.swap(row, col, row, col + 1);
    this.find_duplicate_col(row, col);
    //console.log(this.dumb_check_inv());
  }

  /* denote SUM = sum of int from 1 to 9
   * denote SUM_SQ = sum of squares of int from 1 to 9
   * denote duplicate as d and missing as m
   * sum of num = SUM + d - m -> (d - m) = (sum of num - SUM) ①
   * sum of square = SUM_SQ + d^2 - m^2
   * sum of square = SUM_SQ + (d - m)(d + m)　②
   * Using 1 and 2, (d + m) = (sum of square) / (sum of num - SUM)
   * 2d = (d + m) + (d - m)
   * 
   * this will fail if there is no duplicate because we will be dividing by 0
   * so, check if sum == SUM
  */

  find_duplicate_row(row, col) {
    let change = true;
    while (change) {
      change = false;

      let sum = 0;
      let sum_sq = 0;
      for (let i = 0; i < DIMENSION; i++) {
        sum += this.problem[row][i];
        sum_sq += this.problem[row][i] * this.problem[row][i];
      }
      if (sum == this.sum_1_thru_dim) return; //no more duplicates
      let d_minus_m = sum - this.sum_1_thru_dim;
      let d_plus_m = (sum_sq - this.sum_sq_1_thru_dim) / d_minus_m;
      let dup = 0.5 * (d_minus_m + d_plus_m);
      
      //find the one to swap
      for (let i = 0; i < DIMENSION; i++){
        if (i != col && this.problem[row][i] == dup) {
          change = true;
          this.swap(row, i, row + 1, i);
          col = i;
          break;
        }
      }
    }
  }

  find_duplicate_col(row, col) {
    let change = true;
    while (change) {
      change = false;

      let sum = 0;
      let sum_sq = 0;
      for (let i = 0; i < DIMENSION; i++) {
        sum += this.problem[i][col];
        sum_sq += this.problem[i][col] * this.problem[i][col];
      }
      let d_minus_m = sum - this.sum_1_thru_dim;
      let d_plus_m = (sum_sq - this.sum_sq_1_thru_dim) / d_minus_m;
      let dup = 0.5 * (d_minus_m + d_plus_m);
      
      //find the one to swap
      for (let i = 0; i < DIMENSION; i++){
        if (i != row && this.problem[i][col] == dup) {
          change = true;
          this.swap(i, col, i, col + 1);
          row = i;
          break;
        }
      }
    }
  }

  get_num_fill(difficulty) {
    var filledCount = randomInt(3);
    if (difficulty == "Easy") {
      filledCount += 45;
    }
    else if (difficulty == "Medium") {
      filledCount += 37;
    }
    else if (difficulty == "Hard") {
      filledCount += 30;
    }
    return filledCount;
  }

  createProblem(difficulty) {
    this.num_filled = 81;
    this.fill_target = this.get_num_fill(difficulty);
    //can always be solved until 4 empty spots
    const initial_empty = 4;
    for (let i = 0;i < initial_empty; i++) {
      let row = randomInt(9);
      let col = randomInt(9);
      //let row = parseInt(this.thingi[this.currIndex++]);
      //let col = parseInt(this.thingi[this.currIndex++]);
      while (this.problem[row][col] == 0) {
        row = randomInt(9);
        col = randomInt(9);
        //row = parseInt(this.thingi[this.currIndex++]);
        //col = parseInt(this.thingi[this.currIndex++]);
      }
      this.problem[row][col] = 0;
    }
    this.min_num = 81;
    while (!this.drop());
    console.log(this.min_num);
    return this.stringifyProblem();
  }


  drop() {
    this.min_num = (this.num_filled < this.min_num) ? this.num_filled : this.min_num;
    if (this.num_filled == this.fill_target) return true;
    this.num_filled--;
    for (let reps = 0; reps < NUM_REPS; reps++) {
      this.num_solutions = 0;
      let row = randomInt(9);
      let col = randomInt(9);
      while (this.problem[row][col] == 0) { 
        row = randomInt(9);
        col = randomInt(9);
      }
      let val = this.problem[row][col];
      this.problem[row][col] = 0;
      if (this.try_solve()) {
        if (this.drop()) return true;
      }
      this.problem[row][col] = val;
    }
    this.num_filled++;
    return false;
  }

  try_solve() {
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        if (this.problem[i][j] != 0) {
          this.solution[i][j] = {
            filled: true,
            val: 1 << this.problem[i][j],
          }
        }
        else {
          this.solution[i][j] = {
            filled: false,
            val: COMPLETE,
          } 
        }
      }
      this.row_mem[i] = COMPLETE;
      this.col_mem[i] = COMPLETE;
      this.squ_mem[i] = COMPLETE;
    }
    //debugger;
    this.solve_eliminate_setup();
    this.solve_eliminate();
    return this.check_complete();
  }

  remove(row, col, num) {
    this.solution[row][col].val = 
      this.solution[row][col].val & ~num;
  }

  remove_mem(row, col, num = this.solution[row][col].val, squ = this.calc_squ(row, col)) {
    this.row_mem[row] -= num;
    this.col_mem[col] -= num;
    this.squ_mem[squ] -= num;
  }

  solve_eliminate_setup() {
    //eliminate options
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        //if this block is filled
        if (this.solution[i][j].filled) {
          let num = this.solution[i][j].val;
          this.remove_mem(i, j, num);
          
          for (let k = 0; k < DIMENSION; k++) {
            if (!this.solution[i][k].filled) {
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

  remove_from_square(row, col, num) {
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

  solve_eliminate() {
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        this.set_value(i, j, this.solution[i][j].val);
      }
    }
  }

  set_value(row, col, num = this.solution[row][col].val, squ = this.calc_squ(row, col)) {
    if(this.solution[row][col].filled || !check_pow2(this.solution[row][col].val)) return;
    if (!this.check_invariant(row, col, num, squ)) {
      debugger;
      throw "???? something wrong";
    }
    this.remove_mem(row, col);
    this.solution[row][col].filled = true;
    for (let i = 0; i < DIMENSION; i++) {
      //remove from column
      if (i != row) {
        this.remove(i, col, num);
        if (check_pow2(this.solution[i][col].val)) {
          this.set_value(i, col, this.solution[i][col].val)
        } 
      }
      //remove from row
      if (i != col) {
        this.remove(row, i, num);
        if (check_pow2(this.solution[row][i].val)) {
          this.set_value(i, col, this.solution[i][col].val)
        } 
      }
    }
    const row_start = 3 * Math.floor(row / 3);
    const col_start = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (row_start + i != row && col_start + j != col) {
          this.remove(row_start + i, col_start + j, num);
          if (check_pow2(this.solution[row_start + i][col_start + j].val)) {
            this.set_value(i, col, this.solution[row_start + i][col_start + j].val);
          } 
        }
      }
    }
  }

  solve() {
    this.curr_row = randomInt(9);
    this.curr_col = randomInt(9);
    let num = randomInt(9) + 1;
    this.set(this.calc_squ(this.curr_row, this.curr_col), num);
    this.fillBoard();
  }

  check_complete() {
    for (let i = 0; i < DIMENSION; i++) {
      if (this.row_mem[i] != 0 
          || this.col_mem[i] != 0 
          || this.squ_mem[i] != 0) {
        return false;
      }
    }
    return true;
  }

  /*
  fillBoard() {
    if (this.num_filled == DIMENSION * DIMENSION) {
      return true
    }
    this.curr_col = (this.curr_col + 1) % 9;
    this.curr_row += (this.curr_col == 0) ? 1 : 0;
    if (this.problem[this.curr_row][this.curr_col] == 0) {
      const squ = this.calc_squ(this.curr_row, this.curr_col);
      for (let num = 1; num <= 9; num++) {
        if (!this.check_invariant(squ, num)) continue;
        this.set(squ, num);
        if (this.fillBoard()) return true;
        this.unset(squ, num);
      }
    }
    this.curr_col = (this.curr_col == 0) ? 8 : this.curr_col - 1;
    this.curr_row -= (this.curr_col == 8) ? 1 : 0;
    if (this.curr_row == -1) debugger;
    console.log("row: ", this.curr_row);
    console.log("col: ", this.curr_col);
    this.problem[this.curr_row][this.curr_col] = 0;
    return false;
  }
  */

  calc_squ(row, col) {
    return 3 * Math.floor(row / 3) + Math.floor(col / 3);
  }

  set(squ, num) {
    this.problem[this.curr_row][this.curr_col] = num;
    this.row_mem[this.curr_row] -= 1 << num;
    this.col_mem[this.curr_col] -= 1 << num;
    this.squ_mem[squ] -= 1 << num;
    this.num_filled++;
  }

  unset(squ, num) {
    this.row_mem[this.curr_row] += 1 << num;
    this.col_mem[this.curr_col] += 1 << num;
    this.squ_mem[squ] += 1 << num;
    this.num_filled--;
  }

  /*dumb_check_inv() {
    var sum = 0;
    for (let i = 0; i < DIMENSION; i++) {
      sum = 0;
      for (let j = 0; j < DIMENSION; j++) {
        sum += (1 << this.problem[i][j]);
      }
      if (sum != COMPLETE) return false;
    }
    for (let i = 0; i < DIMENSION; i++) {
      sum = 0;
      for (let j = 0; j < DIMENSION; j++) {
        sum += (1 << this.problem[j][i]);
      }
      if (sum != COMPLETE) return false;
    }
    for (let i = 0; i < DIMENSION; i++) {
      sum = 0;
      for (let row = 3 * (Math.floor(i / 3)); row < 3 * (Math.floor(i / 3)) + 3; row++) {
        for (let col = 3 * (i % 3); col < 3 * (i % 3) + 3; col++) {
          sum += (1 << this.problem[row][col]);
        }
      }
      if (sum != COMPLETE) return false;
    }
    return true;
  }
  */

  check_invariant(row, col, num = this.solution[row][col].val, squ = this.calc_squ(row, col)) {
    //0 if num is already filled in
    if  ((this.row_mem[row] & num) != 0 
      && (this.col_mem[col] & num) != 0
      && (this.squ_mem[squ] & num) != 0) {
        return true;
      }
      if ((this.row_mem[row] & num) == 0) console.log("error in row");
      if ((this.col_mem[col] & num) == 0) console.log("error in col");
      if ((this.squ_mem[squ] & num) == 0) console.log("error in squ");
      debugger;
      return false;
  }


  /*

  check_unique(row, col) {
    if (this.solution[row][col].filled) {
      return;
    }
    if (this.solution[row][col].val == 0) {
      throw 'Puzzle not solvable1';
    }
    if (check_pow2(this.solution[row][col].val)
      && !this.attempt_set_value(row, col)) {
      throw 'Puzzle not solvable2';
    }
  }

  contains(bin, num) {
    return check_pow2(bin & (1 << num));
  }

  }
  */
}
