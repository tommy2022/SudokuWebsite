export function check_invariant(board, index, number) {
  const row = (Math.floor(index / dimension) * dimension);
  const col = index % dimension;
  return check_row(problem, index, number) && check_col(problem, index, number)
    && check_square(problem, index, number);
}

export function check_complete(board) {
  //TODO
  return null;
}

export function check_row(problem, index, number) {
  const row = (Math.floor(index / 9) * 9);
  for (let i = row; i < row + dimension; i++) {
    if(problem[i] == number) {
      return false;
    }
  }
  return true;
}

export function check_col(problem, index, number){
  const col = index % 9;
  for (let i = 0; i < dimension; i++) {
    if(problem[col + (i * 9)] == number ){
      return false;
    }
  }
  return true;
}

export function check_square(problem, index, number) {
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