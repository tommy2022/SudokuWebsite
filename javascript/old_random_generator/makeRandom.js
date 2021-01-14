function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomAssignment(problem, num_filled) {
  var times = 0;
  var counter = 0;
  while (counter < num_filled) {
    times++;
    var index = randomInt(81);
    if (problem[index] == 0) {
      input_num = randomInt(9) + 1;
      if (check_invariant(problem, index, input_num)) {
        problem[index] = input_num
        counter++;
      }
    }
  }
}

function check_invariant(problem, index, number) {
  return check_row(problem, index, number) && check_col(problem, index, number)
    && check_square(problem, index, number);
}

function check_row(problem, index, number) {
  const row = (Math.floor(index / 9) * 9);
  for (let i = row; i < row + dimension; i++) {
    if(problem[i] == number) {
      return false;
    }
  }
  return true;
}

function check_col(problem, index, number){
  const col = index % 9;
  for (let i = 0; i < dimension; i++) {
    if(problem[col + (i * 9)] == number ){
      return false;
    }
  }
  return true;
}

function check_square(problem, index, number) {
  const row_sec = Math.floor(index / 27) * 3;
  const col_sec = Math.floor((index % 9) / 3) * 3;
  for (let i = row_sec; i < row_sec + dimension / 3; i++) {
    for (let j = col_sec; j < col_sec + dimension / 3; j++) {
      if (problem[(i * 9) + j] == number) {
        return false;
      }
    }
  }
  return true;
}
