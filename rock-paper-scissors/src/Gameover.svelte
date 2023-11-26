<script>
    import { gameOver, maxGames, userWins, bestOfSelection } from "./stores";

    let winner = false;

    $: if ($maxGames === $userWins && $maxGames > 0) {
        console.log("Winner");
        winner = true;
    }

    function startOver() {
        location.reload();
    }

    
</script>

<main>
    {#if $gameOver}
      <div class="overlay">
        <div class="lightbox">
          <p>Game over.</p>
          {#if winner}
            <p id="winner">You won!</p>
          {:else}
            <p id="loser">You lost.</p>
          {/if}
          <button on:click={() => startOver()}>Play again?</button>
        </div>
      </div>
    {/if}
  </main>

<style>
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); 
  z-index: 1000; 
}

.lightbox {
  background: #fff; 
  padding: 20px;
  width: 40%; 
  height: 40%; 
  overflow: auto; 
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

#winner {
  color: green;
}

#loser {
  color: red;
}

button {
    margin-bottom: 30px;
}

p {
    font-size: 60px;
}
</style>