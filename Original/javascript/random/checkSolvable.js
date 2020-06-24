class checkSolvable {
  constructor(problem) {
    var temp = new Array(dimension);
    // Loop to create 2D array using 1D array
    for (var i = 0; i < dimension; i++) {
    	temp[i] = [];
    }
    this.solver = temp;
    this.solvable = false;
    this.reflect_problem(problem);
    this.solve();
  }

  reflect_problem(problem) {
    for (let i = 0; i < problem.length; i++) {
      if (problem[i] != 0) {
        this.solver[Math.floor(i / 9)][i % 9] = problem[i];
      }
      else {
        this.solver[Math.floor(i / 9)][i % 9] = new LinkedList();
        //a little more efficient to do it backwards
        for (let j = dimension; j > 0; j--) {
          this.solver[Math.floor(i / 9)][i % 9].add(j);
        }
      }
    }
  }

  solve() {
    while (this.solvable == false) {
      var any_changes = false;
      any_changes = this.solve_method1();
      any_changes = this.solve_method2();
      this.update_solvable();
      //no changes made, but still unsolved
      if (any_changes == false && this.solvable == false) {
        throw "Unsolvable: no more changes";
      }
    }
  }

  solve_method1() {
    //eliminate options
    var rtn = false;
    var temp = false;
    do {
      if (temp == true) {rtn == true;}
      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
          if ((typeof this.solver[i][j]) == "number"){
            var num = this.solver[i][j];
            //remove from row and col
            for (let k = 0; k < dimension; k++) {
              //from row
              if ((typeof this.solver[i][k]) == "object") {
                this.solver[i][k].remove(num);
              }
              //now from column
              if ((typeof this.solver[k][j]) == "object") {
                this.solver[k][j].remove(num);
              }

            }
            //remove from square
            this.remove_from_square(i, j, num);
          }
        }
      }
    } while(temp = this.check_unique());
    return rtn;
  }

  remove_from_square(row, col, num) {
    var row_start = Math.floor(row / 3) * 3;
    var col_start = Math.floor(col / 3) * 3;

    for (let i = row_start; i < row_start + dimension / 3; i++) {
      for (let j = col_start; j < col_start + dimension / 3; j++) {
        if((typeof this.solver[i][j]) == "object") {
          this.solver[i][j].remove(num);
        }
      }
    }
  }

  check_unique() {
    var rtn = false;
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        if ((typeof this.solver[i][j]) == "object") {
          if (this.solver[i][j].get_size() == 0) {
            throw "unsolvable"
          }
          if (this.solver[i][j].get_size() == 1) {
            this.solver[i][j] = this.solver[i][j].get_first();
            rtn = true;
          }
        }
      }
    }
    return rtn;
  }

  solve_method2() {
    //for each 9 sections
    var skip = false;
    var num_row;
    var num_col;
    var rtn = false;
    for (let row_sec = 0; row_sec < dimension / 3; row_sec++) {
      for (let col_sec = 0; col_sec < dimension / 3; col_sec++) {
        //for each number
        for (let num = 1; num <= dimension; num++) {
          var found = false;
          skip = false;
          //for each of the 9 squares inside each section
          for (let i = row_sec * 3; i < row_sec * 3 + 3; i++) {
            if (skip == true) {break;}
  					for (let j = col_sec * 3; j < col_sec * 3 + 3; j++) {
              if ((typeof this.solver[i][j]) == "number") {
                //The number already exist in section
                if (this.solver[i][j] == num) {
                  found = false;
                  skip = true;
                  break;
                }
              }
              //if solver[i][j] is not defined number &
              //if num found
              else if (this.solver[i][j].find(num)) {
                //first time num appeared
                if (found == false) {
                  found = true;
                  num_row = i;
                  num_col = j;
                }
                //second time num appeared
                //skip
                else if (found == true) {
                  //change it back to false
                  found = false;
                  skip = true;
                  break;
                }
              }
            }
          }
          if (found == true) {
             this.solver[num_row][num_col] = num;
             rtn = true;
          }
        }
      }
    }
    return rtn;
  }

  update_solvable() {
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        if ((typeof this.solver[i][j]) == "object"){
          return;
        }
      }
    }
    this.solvable = true;
  }

  get_solvable() {
    return this.solvable;
  }
  
  get_solution() {
	    var sol = "";
	    for (let i = 0; i < dimension; i++) {
	      for (let j = 0; j < dimension; j++){
	        sol += this.solver[i][j].toString();
	      }
	    }
	    return sol;
	  }
  //end of class
}
