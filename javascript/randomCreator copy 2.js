const DIMENSION = 9;
const COMPLETE = Math.pow(2, 10) - 2; //1 1111 1111 in binary

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function check_pow2(n) {
  return (Math.ceil(Math.log2(n)) == Math.floor(Math.log2(n)));
}

function get_num_filled(difficulty) {
  var filledCount = randomInt(3);
  if (difficulty == "Easy") {
    filledCount += 35;
  }
  else if (difficulty == "Medium") {
    filledCount += 23;
  }
  else if (difficulty == "Hard") {
    filledCount += 20
  }
  return filledCount;
}

function calc_squ(row, col) {
  return 3 * Math.floor(row / 3) + Math.floor(col / 3);
}

class RandomCreator {
  constructor () {
    this.problem = new Array(DIMENSION);
    this.row_mem = new Array(DIMENSION);
    this.col_mem = new Array(DIMENSION);
    this.squ_mem = new Array(DIMENSION);
    this.num_filled = 0;
    for (let i = 0; i < DIMENSION; i++) {
      this.problem[i] = new Array(DIMENSION);
    }
  }
  
  createRandom(difficulty) {
    let counter1 = 0;
    let counter2 = 0;
    //debugger;
    while (true && counter1 + counter2 < 10000) {
      try {
        this.new_board(num_filled);
        this.solve();
        console.log(counter1, counter2);
        counter1++;
        //debuger;
        if (this.solved) break;
      }
      catch (err){
        console.log(err);
        counter2++
        console.log(counter1, counter2);
      }
    }
    //debuger;

    var rtn = {
      problem: "",
      solution: "",
    }
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        rtn.problem += this.problem[i][j].toString();
        //debuger;
        rtn.solution += Math.log2(this.solution[i][j]).toString();
      }
    }
    return rtn;
  }

  new_board() {
    const fill_in = 20
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        this.solution[i][j] = {
          filled: false,
          val: COMPLETE,
      }
      this.problem[i].fill(0);
      this.row_mem[i] = COMPLETE;
      this.col_mem[i] = COMPLETE;
      this.squ_mem[i] = COMPLETE;
      }
    }
    //debuger;
    var counter = 0;
    var row = 0;
    var col = 0;
    while (counter < fill_in) {
      row = randomInt(9);
      col = randomInt(9);
        if (!this.solution[row][col].filled) {
          let input_num = randomInt(9) + 1;
          if (this.check_invariant(row, col, calc_squ(row, col), 1 << input_num)) {
            this.problem[row][col] = input_num;
            this.solution[row][col] = {
              filled: true,
              val: 1 << input_num,
            };
            this.row_mem[row] -= 1 << input_num;
            this.col_mem[col] -= 1 << input_num;
            this.squ_mem[calc_squ(row, col)] -= 1 << input_num;
            counter++;
          }
        }
      }
      console.log(this.problem);
      this.num_filled = fill_in;
  }

  solve() {
    this.solve_eliminate_setup()
    this.solve_eliminate()
    this.backtrack();
  }

  check_complete() {
    for (let i = 0; i < DIMENSION; i++) {
      if (this.row_mem[i] != 0 
          || this.col_mem[i] != 0 
          || this.squ_mem[i] != 0) {
        return;
      }
    }
    this.solved = true;
  }

  remove(row, col, num) {
    this.solution[row][col].val = 
      this.solution[row][col].val & ~num;
  }

  solve_eliminate_setup() {
    //eliminate options
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        //if this block is filled
        if (this.solution[i][j].filled) {
          let num = this.solution[i][j].val;
          
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
        if (!this.solution[i][j].filled) {
          if (check_pow2(this.solution[row][col].val)) {
            this.attempt_set_value(row, col);
          }
        }
      }
    }
  }

  contains(bin, num) {
    return check_pow2(bin & (1 << num));
  }

  attempt_set_value(row, col) {
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

  backtrack() {

    return;
  }

  check_invariant(row, col, squ, num) {
    //0 if num is already filled in
    if ((this.row_mem[row] &  num) != 0 
      && (this.col_mem[col] & num) != 0
      && (this.squ_mem[squ] & num) != 0) {
        return true;
      }
      return false;
  }
}
