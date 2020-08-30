<?php
  session_start();
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Puzzle_TOBEFILLED %></title>
  <link rel="stylesheet" href ="css/PuzzleStyle.css" />
  <script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
  <link rel="shortcut icon" href="">
  <link rel="stylesheet" href="../css/title.css">
  <script>
  let logged_in = false;
    <?php if (!empty($_SESSION['username'])): ?>
      logged_in = true;
    <?php endif; ?>
  </script>
</head>
<body>
  <div>
	  <input type="hidden" id="problem" value="">
	  <input type="hidden" id="solution" value="">
	  <input type="hidden" id="option_check" value=false>
	  <input type="hidden" id="option_eliminate" value=false>
	  <input type="hidden" id="selected" value="find1">
	  <input type="hidden" id="shaded" value="">
	  <input type="hidden" id="num_filled" value="0">
	  <input type="hidden" id="shaded_num" value="">
  </div>
  <div class="messageBox" id="message" style="display: none;">
  	<table>
  		<tr>
  		  <td>Show mistakes when checked</td>
  		  <td><input id="check_on" type="button" value="on" class="option_off" onclick="changeOption(this)"></td>
  		  <td><input id="check_off" type="button" value="off" class="option_on" onclick="changeOption(this)"></td>
  		 </tr>
  		<tr>
  		  <td>Eliminate number options</td>
  		  <td><input id="eliminate_on" type="button" value="on" class="option_off" onclick="changeOption(this)"></td>
  		  <td><input id="eliminate_off" type="button" value="off" class="option_on" onclick="changeOption(this)"></td>
  		</tr>
  		<tr>
  		  <td></td>
  		  <td colspan="2">
  		    <input type="button" value="okay" onclick="exit_box()" class="okay_button">
  		  </td></tr>
  	</table>
	</div>
  <header id="header">
      <span id="title">懐かしのゲームサイト</span>
        <a href = "../index.php" aria-label = "Home" class='home'><i class="fas fa-home"></i></a>
        <form id="login_form" action="../php/login.php" method="get">
            <input type="hidden" name="webpage" value="sudoku">
            <input id="login_link" type="submit" value="Login/Create account"
            style="border:none;background-color:transparent;color:blue;text-decoration:underline;">
        </form>
        <hr />
  </header>
  <table class='page'>
    <tr>
      <td rowspan="2" width="50%">
        <table border="2" class='sudoku'>
          <tr>
	          <td id="T0"></td>
			  <td id="T1"></td>
			  <td id="T2"></td>
			  <td id="T3"></td>
			  <td id="T4"></td>
			  <td id="T5"></td>
			  <td id="T6"></td>
			  <td id="T7"></td>
			  <td id="T8"></td>
		  </tr>
		  <tr>
			  <td id="T9"></td>
	 	      <td id="T10"></td>
			  <td id="T11"></td>
			  <td id="T12"></td>
			  <td id="T13"></td>
			  <td id="T14"></td>
			  <td id="T15"></td>
			  <td id="T16"></td>
			  <td id="T17"></td>
		  </tr>
		  <tr>
			  <td id="T18"></td>
			  <td id="T19"></td>
			  <td id="T20"></td>
			  <td id="T21"></td>
			  <td id="T22"></td>
			  <td id="T23"></td>
			  <td id="T24"></td>
			  <td id="T25"></td>
			  <td id="T26"></td>
		  </tr>
		  <tr>
			  <td id="T27"></td>
			  <td id="T28"></td>
			  <td id="T29"></td>
		      <td id="T30"></td>
			  <td id="T31"></td>
			  <td id="T32"></td>
			  <td id="T33"></td>
			  <td id="T34"></td>
			  <td id="T35"></td>
		  </tr>
		  <tr>
			  <td id="T36"></td>
			  <td id="T37"></td>
			  <td id="T38"></td>
			  <td id="T39"></td>
			  <td id="T40"></td>
			  <td id="T41"></td>
			  <td id="T42"></td>
			  <td id="T43"></td>
			  <td id="T44"></td>
		  </tr>
		  <tr>
			  <td id="T45"></td>
			  <td id="T46"></td>
			  <td id="T47"></td>
			  <td id="T48"></td>
			  <td id="T49"></td>
			  <td id="T50"></td>
			  <td id="T51"></td>
			  <td id="T52"></td>
			  <td id="T53"></td>
		  </tr>
		  <tr>
			  <td id="T54"></td>
			  <td id="T55"></td>
			  <td id="T56"></td>
			  <td id="T57"></td>
			  <td id="T58"></td>
			  <td id="T59"></td>
		      <td id="T60"></td>
			  <td id="T61"></td>
			  <td id="T62"></td>
		  </tr>
		  <tr>
			  <td id="T63"></td>
			  <td id="T64"></td>
			  <td id="T65"></td>
			  <td id="T66"></td>
			  <td id="T67"></td>
			  <td id="T68"></td>
			  <td id="T69"></td>
		      <td id="T70"></td>
			  <td id="T71"></td>
		  </tr>
		  <tr>
			  <td id="T72"></td>
			  <td id="T73"></td>
			  <td id="T74"></td>
			  <td id="T75"></td>
			  <td id="T76"></td>
			  <td id="T77"></td>
			  <td id="T78"></td>
			  <td id="T79"></td>
			  <td id="T80"></td>
          </tr>
        </table>
      </td>
      <td class="stats" cellpadding="0" cellspacing="0">
        <p id="diff"></p>
        <p id="ptype"></p>
        <p id="clock">
          <span id="message">Time Elapsed </span> <span id="minutes"></span>:<span id="seconds"></span>
          <button id="pauseButton" class="pauseButton" onclick="pause(this)" value="stop"><i class="fa fa-pause-circle-o"></i></button>
          </p>
      </td>
      <td width="30%"></td>
    </tr>
    <tr>
      <td height="60%">
	 	<table class="inputBox" cellpadding="0" cellspacing="0">
	 	<tr> <td><input id="Button1" class="inputButton" type="button" value="1" onclick="setValue(this.value)"></td>
	 		<td><input id="Button2" class="inputButton" type="button" value="2" onclick="setValue(this.value)"></td>
	 		<td><input id="Button3" class=inputButton type="button" value="3" onclick="setValue(this.value)"></td>
	 	</tr>
	 	<tr> <td><input id="Button4" class="inputButton" type="button" value="4" onclick="setValue(this.value)"></td>
	 		<td><input id="Button5" class="inputButton" type="button" value="5" onclick="setValue(this.value)"></td>
	 		<td><input id="Button6" class="inputButton" type="button" value="6" onclick="setValue(this.value)"></td>
	 	</tr>
	 	<tr> <td><input id="Button7" class="inputButton" type="button" value="7" onclick="setValue(this.value)"></td>
	 		<td><input id="Button8" class="inputButton" type="button" value="8" onclick="setValue(this.value)"></td>
	 		<td><input id="Button9" class="inputButton" type="button" value="9" onclick="setValue(this.value)"></td>
	 	</tr>
	 	</table>
	   </td>
	   <td> <table class="specialHelp">
		   <tr>
			<td><input class="helpButton" type="button" value="Erase" onclick="erase()"></td>
	 		<td><input class="helpButton" type="button" value="Option" onclick="option()"></td>
		   </tr>
		   <tr>
			<td><input class="helpButton" type="button" value="Check" onclick="check()"></td>
	 		<td><input class="helpButton" type="button" value="Reset" onclick="reset()"></td>
		   </tr>
		   <tr>
		   	<td colspan="2">
		   		<input id="submitButton" class="helpButton" type="button" value="Submit" disabled onclick="submit()"></td>
		   </tr>
	   </table></td>
	 </tr>

    <tr height="9%">
      <td class="statusCell">
      	<input id="find1" class="num_incomplete" type="button" value="1" onclick="find(this.value)">
      	<input id="find2" class="num_incomplete" type="button" value="2" onclick="find(this.value)">
      	<input id="find3" class="num_incomplete" type="button" value="3" onclick="find(this.value)">
      	<input id="find4" class="num_incomplete" type="button" value="4" onclick="find(this.value)">
      	<input id="find5" class="num_incomplete" type="button" value="5" onclick="find(this.value)">
      	<input id="find6" class="num_incomplete" type="button" value="6" onclick="find(this.value)">
      	<input id="find7" class="num_incomplete" type="button" value="7" onclick="find(this.value)">
      	<input id="find8" class="num_incomplete" type="button" value="8" onclick="find(this.value)">
      	<input id="find9" class="num_incomplete" type="button" value="9" onclick="find(this.value)">

      </td>
      <td id="checkResult" colspan="2"></td>
    </tr>
  </table>
  <input type="hidden" id="clock" value="false">
  <script type="text/javascript" src="./javascript/random/randomCreator.js"></script>
  <script type="text/javascript" src="./javascript/linkedlist.js"></script>
  <script type="text/javascript" src="./javascript/random/checkSolvable.js"></script>
  <script type="text/javascript" src="./javascript/random/makeRandom.js"></script>
  <script type="text/javascript" src="./javascript/reflectBoard.js"></script>
  <script type="text/javascript" src="./javascript/getProblem.js"></script>
  <script>
  	//count clock
	  var sec = 0;
	  function pad ( val ) { return val > 9 ? val : "0" + val; }
	  var timer = setInterval( function(){
	      document.getElementById("seconds").innerHTML=pad(++sec%60);
	      document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
	  }, 1000);

	  function stopCount() {
		  clearInterval(timer);
	  }

	  function pause(button) {
		  if (button.value == "stop") {
			  button.value = "start";
			  clearInterval(timer);
			  button.innerHTML = '<i class="fa fa-play-circle-o" aria-hidden="true"></i>';
		  }
		  else if (button.value == "start") {
			  button.value = "stop";
			  button.innerHTML = '<i class="fa fa-pause-circle-o" aria-hidden="true"></i>';
			  timer = setInterval( function(){
			      document.getElementById("seconds").innerHTML=pad(++sec%60);
			      document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
			  }, 1000);
		  }
	  }

 </script>

<script type="text/javascript" src="./javascript/inputNumber.js"></script>

<script type="text/javascript" src="./javascript/cellColor.js"></script>
<script type="text/javascript" src="./javascript/find.js"></script>
<script type="text/javascript" src="./javascript/utilityButtons.js"></script>

</body>
</html>
