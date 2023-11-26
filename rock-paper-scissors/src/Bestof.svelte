<script>
    import { bestOfSelection, maxGames} from "./stores";
    
    let isDisabled = false;
  
    function bestOf(num) {
      $bestOfSelection = num;
      $maxGames = $bestOfSelection / 2 + .5;

      return bestOfSelection;
    }
  
    function disableButtons() {
      isDisabled = true;
    }

  </script>
  
  <main>
    <div>
        <p>How many games? Best of:</p>
        <button id="bestof3" class="buttonBestOf" on:click={() => { bestOf(3); disableButtons(); }} disabled={isDisabled}>3</button>
        <button id="bestof5" class="buttonBestOf" on:click={() => { bestOf(5); disableButtons(); }} disabled={isDisabled}>5</button>
        <button id="bestof7" class="buttonBestOf" on:click={() => { bestOf(7); disableButtons(); }} disabled={isDisabled}>7</button>
    </div>
  </main>

<style>
  main{
    text-align: center;
  }

  div {
    border: 2px solid rgb(150, 150, 150);
    border-radius: 20px;
  }

  button {
    height: 70px;
    width: 60px;
    margin-bottom: 30px;
  }

  p {
    font-size: 20px;
  }

</style>