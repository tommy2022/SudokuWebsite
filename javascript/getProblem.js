url = location.href;
var parameters = url.split("?")[1].split("&");
difficulty = parameters[0].split("=")[1];
document.title = "Sudoku " + difficulty;
document.getElementById("diff").innerHTML = "Difficulty: " + difficulty;

var startTime = performance.now()
creator = new RandomCreator(difficulty);
var gen_solution = creator.createRandom();
var endTime = performance.now()
console.log(`Puzzle generated in ${endTime - startTime} milliseconds`)
document.getElementById("solution").value = gen_solution;
var gen_problem = creator.createProblem(); //returns object with problem and solution
document.getElementById("problem").value = gen_problem;
set_table();
