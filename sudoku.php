<?php
  session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Sudoku</title>
	<link rel="stylesheet" href="../css/title.css">
	 	<link rel="stylesheet" href ="css/OptionPageStyle.css" />
	<script>
	let logged_in = false;
		<?php if (!empty($_SESSION['username'])): ?>
			logged_in = true;
		<?php endif; ?>
	</script>
	<script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
</head>
<body>
	<div id="header">
			<span id="title">懐かしのゲームサイト</span>
			<a href = "../index.php" aria-label = "Home" class='home'><i class="fas fa-home"></i></a>
			<form id="login_form" action="../php/login.php" method="get">
					<input type="hidden" name="webpage" value="spaceinvader">
					<input id="login_link" type="submit" value="Login/Create account"
					style="border:none;background-color:transparent;color:blue;text-decoration:underline;">
			</form>
			<hr />
	</div>
  <header>
    <h1>Welcome to Web Sudoku</h1>
    <h2> What option would you like to play?</h2>
  </header>
	  <table width="30%">
	    <tr><td>
	      <details>
	        <summary> Easy </summary>
	          <ul>
	            <li> <input type="button" value="Random" onclick="myFunction('Easy', 'Random')"/></li>
	            <li> <input type="button" value="Problem 1" onclick="myFunction('Easy', '1')"/></li>
	            <li> <input type="button" value="Problem 2" onclick="myFunction('Easy', '2')"/></li>
	          </ul>
	      </details>
	    </td></tr>
	    <tr><td>
	      <details>
	        <summary> Medium </summary>
	        <ul>
	           	<li> <input type="button" value="Random" onclick="myFunction('Medium', 'Random')"/></li>
	            <li> <input type="button" value="Problem 1" onclick="myFunction('Medium', '1')"/></li>
	            <li> <input type="button" value="Problem 2" onclick="myFunction('Medium', '2')"/></li>
	        </ul>
	      </details>
	    </td></tr>
	    <tr><td>
	      <details>
	        <summary> Hard </summary>
	        <ul>
	            <li> <input type="button" value="Problem 1" onclick="myFunction('Hard', '1')"/></li>
	            <li> <input type="button" value="Problem 2" onclick="myFunction('Hard', '2')"/></li>
	      </details>
	    </td></tr>
	  </table>
  <script>
  function myFunction(diff, type) {
        window.location.href = "puzzle.php?difficulty=" + diff +"&type=" + type;
	}
  </script>

</body>
</html>
