<script>
	import { bestOfSelection, maxGames, gameOver, userWins } from "./stores.js"


	let user;
	let numberOfPlays = 0;
	$userWins = 0;
	let computerWins = 0;
	let isDisabled = true;
	$: message = "";
	let history = ""
	let loading = false;

	$: if ($maxGames != 0) {
		isDisabled = false;
	}
  
    function getRandomNum(min, max) {
    		return Math.floor(Math.random() * (max-min+1)) + min;
  		}

	function checkIfMax() {
		if ($userWins === $maxGames || computerWins === $maxGames) {
			isDisabled = true;
			if ($maxGames != 0) {
				gameOver.set(true);
			}
		}
	}

	function userPick(num) {
		loading = true;
		isDisabled = true;
		setTimeout(() => {
			if ($userWins < $maxGames && computerWins < $maxGames) {
				user = num;
				computerPickFunc(user);
				checkIfMax();
			}
  		}, 1300); 
		  setTimeout(() => {
    			loading = false;
				isDisabled = false;
  		  }, 1300);
	}

	$: computerPickFunc = (user) => {
		let computerPick = getRandomNum(1, 3)
		getWinner(computerPick, user);
	}

	function getWinner(computerPick, user) {
	let combined = computerPick.toString() + user.toString();

		switch (combined) {
			case "11":
			case "22":
			case "33":
				message = "Same selection made. Go again.";
				break;
			case "12":
				message = "Your pick: Paper. Computer pick: Rock. You win.";
				$userWins += 1;
				numberOfPlays += 1;
				break;
			case "13":
				message = "Your pick: Scissors. Computer pick: Rock. You lose.";
				computerWins += 1;
				numberOfPlays += 1;
				break;
			case "21":
				message = "Your pick: Rock. Computer pick: Paper. You lose.";
				computerWins += 1;
				numberOfPlays += 1;
				break;
			case "23":
				message = "Your pick: Scissors. Computer pick: Paper. You win.";
				$userWins += 1;
				numberOfPlays += 1;
				break;
			case "31":
				message = "Your pick: Rock. Computer pick: Scissors. You win.";
				$userWins += 1;
				numberOfPlays += 1;
				break;
			case "32":	
				message = "Your pick: Paper. Computer pick: Scissors. You lose.";
				computerWins += 1;
				numberOfPlays += 1;
				break;
			default:
				break;
			}
			history = history + "<br>" + message;
			return message;	
			
	}




  </script>
  
  <main>
	<button id="rock" class="gameSelections" on:click={() => userPick(1)} disabled={isDisabled}>Rock</button>
	<button id="paper" class="gameSelections" on:click={() => userPick(2)} disabled={isDisabled}>Paper</button>
	<button id="scissors" class="gameSelections" on:click={() => userPick(3)} disabled={isDisabled}>Scissors</button>
    {#if loading}
		<p class="message">Rock, Paper, Scissors...</p>
	{:else}
		<p class="message">{message}</p>
	{/if}
	<div class="roundinfo">
		{#if $bestOfSelection != 0}
			<p>You are playing best of {$bestOfSelection}</p>
		{/if}
		<p class="info">Computer wins: {computerWins}</p>
		<p class="info">Your wins: {$userWins}</p>
		<p class="info">Number of plays: {numberOfPlays}</p>
	</div>
	<div class="history">
		{#if $bestOfSelection != 0}
		<p class="historyP">History of this round:</p>
		<p>{@html history}</p>
	{/if}
	</div>
  </main>
  
  <style>
	main{
    text-align: center;
  	}

	.message {
		margin-top: 0px;
		font-size: 50px;
	}

	.historyP {
		margin-bottom: 20px;
	}

  button {
    margin-top: 30px;
	height: 70px;
    width: 30%;
    margin-bottom: 30px;
  }

  .roundinfo {
	float: left;
	text-align: left;
	width: 30%;
	border: 2px solid rgb(150, 150, 150);
    border-radius: 20px;
	padding: 10px;
  }

  .history {
	float: right;
	width: 66%;
	border: 2px solid rgb(150, 150, 150);
    border-radius: 20px;
  }

  .info{
	margin: 3px;
  }

  p {
    font-size: 20px;
  }
	
  </style>