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
const DiffEnum = Object.freeze({"Easy":1, "Medium":2, "Hard":3});


function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function check_pow2(n) {
  return (Math.ceil(Math.log2(n)) == Math.floor(Math.log2(n)));
}

function get_base10(n) {
  if (!check_pow2(n)) console.log("???? base not 10");
  return Math.log2(n);
}

class RandomCreator {
  constructor (difficulty) {
    this.problem = new Array(DIMENSION);
    this.solution = new Array(DIMENSION);

    this.difficulty = DiffEnum[difficulty];

    this.row_mem = new Array(DIMENSION).fill(COMPLETE);
    this.col_mem = new Array(DIMENSION).fill(COMPLETE);
    this.squ_mem = new Array(DIMENSION).fill(COMPLETE);

    if (this.difficulty != DiffEnum.Easy) {
      this.row_count = new Array(DIMENSION);
      this.col_count = new Array(DIMENSION);
      this.squ_count = new Array(DIMENSION);

      for (let i = 0; i < DIMENSION; i++) {
        this.row_count[i] = new Array(DIMENSION + 1).fill(0);
        this.col_count[i] = new Array(DIMENSION + 1).fill(0);
        this.squ_count[i] = new Array(DIMENSION + 1).fill(0);
      }
    }

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

  calc_squ(row, col) {
    return 3 * Math.floor(row / 3) + Math.floor(col / 3);
  }
  
  createRandom() {
    this.problem = SEED;
    //this.start_index = 17; //randomInt(50);
    //this.index = this.start_index;
    //this.numbers = "1220086320530284807273410713477724565788760441751850878026162183056600821501332258626332887817355532035220160155626660450437602181867750474431850473327201516551277137006600614464382884820462375476270754437474770727236633075030646867220078663821726726632122072112250542223020146824220333656373434320263876215085732081875060230700821245308387485286484315858571878470518080418580388200435302783353648446302454804634023530402846453366122611681553447378330415673735337034115762888580687418677618742310450778827756450162066676135445071024113484803468716404243115740334481674077712576518338831117440266654284241463271773864723651538470865732345114860746668680218587667662373755420186272556163021746620030461014054266882508781506270126043152714037875851068666328043475711771416653187484148226180625420157423400273645200404845311278542137307624673708766420025044787107760232722231434682570515722238206605387168380835285823766021851826137886773081844630012312818012156768672300363083171203210843335065606400854144825586726368844177182731412267002106214757561363558361862558752821145142040487216257320615082630384300786733508753341358777756601151156562152203305523473588088735776755587613802618642244652164648203808880012018762376118311582852767030325621332621515658273440663876084282588037208665226721286661231348078757021825417440211270747542421617630365742550560042570378643715248668560574813725034358206547752630066168155607664006077753372238215582685826108054870624431556503261504701484777856068353054868208136220343222041614074100608751526506857601866143834231630765427570557545230078480278668084023313024";
    this.randomFilled();

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

  get_num_fill() {
    var filledCount = randomInt(3);
    if (this.difficulty == DiffEnum.Easy) {
      filledCount += 45;
    }
    else if (this.difficulty == DiffEnum.Medium) {
      filledCount += 37;
    }
    else if (this.difficulty == DiffEnum.Hard) {
      filledCount += 30;
    }
    return filledCount;
  }

  non_random() {
    //let row = this.numbers[this.index++];
    //let col = this.numbers[this.index++];
    return [randomInt(9), randomInt(9)];
    return [row, col];
  }

  createProblem() {

    this.countkeeper = 0;
    this.level = DiffEnum.Easy; //use this to identify the level of problem
    this.num_filled = DIMENSION * DIMENSION;
    this.fill_target = this.get_num_fill();
    //can always be solved until 4 empty spots
    const initial_empty = 4;
    var row, col;
    for (let i = 0;i < initial_empty; i++) {
      do {
        [row, col] = this.non_random();
        //row = randomInt(9);
        //col = randomInt(9);
      } while (this.problem[row][col] == 0);
      this.problem[row][col] = 0;
    }
    while (!this.drop());
    debugger;
    return this.stringifyProblem();
  }


  /* Level of difficulty must match the required difficulty
   * Easy: one use algorithm 1
   * Medium: Must use at least algorithm 2 once
   * Hard: Must use backtracking to solve at least 1.
   */
  drop() {
    this.countkeeper++;
    if (this.num_filled == this.fill_target) {
      return (this.level == this.difficulty) ? true : false; //explanation above
    }
    this.num_filled--;
    var row, col;
    for (let reps = 0; reps < NUM_REPS; reps++) {
      this.num_solutions = 0;
      do {
        [row, col] = this.non_random();
        //row = randomInt(9);
        //col = randomInt(9);
      } while (this.problem[row][col] == 0);

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

  reset_eliminate_solver() {
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
    }
    this.row_mem.fill(COMPLETE);
    this.col_mem.fill(COMPLETE);
    this.squ_mem.fill(COMPLETE);
  }

  reset_unique_solver() {
    for (let i = 0; i < DIMENSION; i++) {
      this.row_count[i].fill(0);
      this.col_count[i].fill(0);
      this.squ_count[i].fill(0);
    }
  } 

  //for debugging
  check() {
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        if (!this.solution[i][j].filled && check_pow2(this.solution[i][j].val)) {
          debugger;
        }
      }
    }
  }

  try_solve() {

    this.level = DiffEnum.Easy;
    this.reset_eliminate_solver();
    this.solve_eliminate_setup();
    this.solve_eliminate();
    this.check(); //for debugging
    if (this.check_complete()) {
      return true;
    }
    if (this.difficulty == DiffEnum.Easy) return false;

    this.level = DiffEnum.Medium;
    do {
      this.unique_solver_change = false;
      this.reset_unique_solver();
      this.solve_unique_setup();
      this.solve_unique();
      this.solve_eliminate();
    } while(this.unique_solver_change)

    if (this.check_complete()) {
      return true;
    }
    if (this.difficulty == DiffEnum.Medium) return false;

    this.level = DiffEnum.Hard;
    this.backtrack();
    return (this.num_solutions == 1) ? true : false;
  }

  remove(row, col, bin_num, squ = this.calc_squ(row, col)) {
    this.solution[row][col].val = 
      this.solution[row][col].val & ~bin_num;
  }

  remove_mem(row, col, bin_num = this.solution[row][col].val, squ = this.calc_squ(row, col)) {
    this.row_mem[row] -= bin_num;
    this.col_mem[col] -= bin_num;
    this.squ_mem[squ] -= bin_num;
  }

  solve_eliminate_setup() {
    //eliminate options
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        //if this block is filled
        if (this.solution[i][j].filled) {
          let bin_num = this.solution[i][j].val;
          this.remove_mem(i, j, bin_num);
          
          for (let k = 0; k < DIMENSION; k++) {
            if (!this.solution[i][k].filled) {
              //delete from row
              this.remove(i, k, bin_num);
            }
            if (!this.solution[k][j].filled) {
              //delete from column
              this.remove(k, j, bin_num);
            }
            this.remove_from_square(i, j, bin_num);
          }
        }
      }
    }
  }

  remove_from_square(row, col, bin_num) {
    const row_start = Math.floor(row / 3) * 3;
    const col_start = Math.floor(col / 3) * 3;

    for (let i = row_start; i < row_start + DIMENSION / 3; i++) {
      for (let j = col_start; j < col_start + DIMENSION / 3; j++) {
        if　(!this.solution[i][j].filled) {
          this.remove(i, j, bin_num);
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

  set_value(row, col, bin_num = this.solution[row][col].val, squ = this.calc_squ(row, col)) {
    if(this.solution[row][col].filled || !check_pow2(this.solution[row][col].val)) return;
    if (!this.check_invariant(row, col, bin_num, squ)) {
      debugger;
      throw "???? something wrong";
    }
    this.remove_mem(row, col, bin_num, squ);
    this.solution[row][col].filled = true;
    for (let i = 0; i < DIMENSION; i++) {
      //remove from column
      if (i != row) {
        this.remove(i, col, bin_num);
        if (check_pow2(this.solution[i][col].val)) {
          this.set_value(i, col, this.solution[i][col].val)
        } 
      }
      //remove from row
      if (i != col) {
        this.remove(row, i, bin_num);
        if (check_pow2(this.solution[row][i].val)) {
          this.set_value(row, i, this.solution[row][i].val)
        } 
      }
    }
    const row_start = 3 * Math.floor(row / 3);
    const col_start = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (row_start + i != row && col_start + j != col) {
          this.remove(row_start + i, col_start + j, bin_num);
          if (check_pow2(this.solution[row_start + i][col_start + j].val)) {
            this.set_value(row_start + i, col_start + j, this.solution[row_start + i][col_start + j].val);
          } 
        }
      }
    }
  }

  solve_unique_setup() {
    for (let i = 0; i < DIMENSION; i++) {
      for (let j = 0; j < DIMENSION; j++) {
        const val = this.solution[i][j].val;
        const squ = this.calc_squ(i, j);
        if (this.solution[i][j].filled == true) {
          this.row_count[i][get_base10(val)] = DIMENSION;   //max number
          this.col_count[j][get_base10(val)] = DIMENSION;   //max number
          this.squ_count[squ][get_base10(val)] = DIMENSION; //max number
        }
        else {
          for (let num = 1; num <= DIMENSION; num++) {
            if (this.contains(this.solution[i][j].val, num)) {
              this.row_count[i][num]++;
              this.col_count[j][num]++;
              this.squ_count[squ][num]++;
            }

            //
            if (this.row_count[i][num] > 9) {
              debugger;
              console.log("sth wrong. rowcount over 9");
            }
            if (this.col_count[j][num] > 9) {
              debugger;
              console.log("sth wrong. colcount over 9");
            }
            if (this.squ_count[squ][num] > 9) {
              debugger;
              console.log("sth wrong. squcount over 9");
            } 
            //
          }
        }
      }
    }
  }

  solve_unique() {
    for (let i = 0; i < DIMENSION; i++) {
      for (let num = 1; num <= DIMENSION; num++) {
        if (this.row_count[i][num] == 0) {
          console.log("error, row_count is 0");
        }
        if (this.col_count[i][num] == 0) {
          console.log("error, col_count is 0");
        }
        if (this.squ_count[i][num] == 0) {
          console.log("error, squ_count is 0");
        }

        if (this.row_count[i][num] == 1) {
          this.find_and_fill_row(i, num);
          this.unique_solver_change = true;
        }
        if (this.col_count[i][num] == 1) {
          this.find_and_fill_col(i, num);
          this.unique_solver_change = true;
        }
        if (this.squ_count[i][num] == 1) {
          this.find_and_fill_squ(i, num);
          this.unique_solver_change = true;
        }
      }
    }
  }

  find_and_fill_row(row, num) {
    for (let col = 0; col < DIMENSION; col++) {
      if (this.contains(this.solution[row][col].val, num)) {
        if (this.solution[row][col].filled) debugger;
        this.unique_set_val(row, col, 1 << num);
      }
    }
  }

  find_and_fill_col(col, num) {
    for (let row = 0; row < DIMENSION; row++) {
      if (this.contains(this.solution[row][col].val, num)) {
        if (this.solution[row][col].filled) debugger;
        this.unique_set_val(row, col, 1 << num);
      }
    }
  }

  find_and_fill_squ(squ, num) {
    const row_start = 3 * Math.floor(squ / 3);
    const col_start = 3 * (squ % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.contains(this.solution[row_start + i][col_start + j].val, num)) {
          if (this.solution[row_start + i][col_start + j].filled) debugger;
          this.unique_set_val(row_start + i, col_start + j, 1 << num);
        }
      }
    }
  }

  unique_set_val(row, col, bin_num, squ = this.calc_squ(row, col)) {
    this.row_count[row][Math.log2(bin_num)] = 9;
    this.col_count[col][Math.log2(bin_num)] = 9;
    this.squ_count[squ][Math.log2(bin_num)] = 9;
    this.solution[row][col].val = bin_num;
    this.remove_mem(row, col, bin_num, squ);
    this.solution[row][col].filled = true;
    for (let i = 0; i < DIMENSION; i++) {
      //remove from column
      if (i != row) {
        this.remove(i, col, bin_num);
      }
      //remove from row
      if (i != col) {
        this.remove(row, i, bin_num);
      }
    }
    const row_start = 3 * Math.floor(row / 3);
    const col_start = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (row_start + i != row && col_start + j != col) {
          this.remove(row_start + i, col_start + j, bin_num);
        }
      }
    }
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

  check_invariant(row, col, bin_num = this.solution[row][col].val, squ = this.calc_squ(row, col)) {
    //0 if num is already filled in
    if  ((this.row_mem[row] & bin_num) != 0 
      && (this.col_mem[col] & bin_num) != 0
      && (this.squ_mem[squ] & bin_num) != 0) {
        return true;
      }
      if ((this.row_mem[row] & bin_num) == 0) console.log("error in row");
      if ((this.col_mem[col] & bin_num) == 0) console.log("error in col");
      if ((this.squ_mem[squ] & bin_num) == 0) console.log("error in squ");
      debugger;
      return false;
  }

  contains(bin, num) {
    return ((bin & (1 << num)) != 0) ? true : false;
  }

  /*
    solve() {
    this.curr_row = randomInt(9);
    this.curr_col = randomInt(9);
    let num = randomInt(9) + 1;
    this.set(this.calc_squ(this.curr_row, this.curr_col), num);
    this.fillBoard();
  }

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
  */

  /*
  dumb_check_inv() {
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
}
