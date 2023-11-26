<script>
	import UserHandling from "./UserHandling.svelte"	
    import Bestof from "./Bestof.svelte";
	import Gameover from "./Gameover.svelte";
</script>


<main>
	<h1>Rock-Paper-Scissors Game</h1>
	<p>A simple game where you will play rock-paper-scissors with a computer. Make a selection below to begin.</p>
	<Bestof />
	<UserHandling />
	<Gameover />
</main>

<style>
	main{
	max-width: 800px;
  	margin: 0 auto; 
	}
	h1 {
		text-align: center;
		font-size: 50px;
	}
	p {
		text-align: center;
		font-size: 20px;
	}
	
</style>
