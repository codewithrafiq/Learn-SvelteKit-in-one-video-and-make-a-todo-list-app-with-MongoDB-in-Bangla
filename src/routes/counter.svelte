<script>
  let count = 0;
  const addCount = () => {
    count++;
  };
  const decrementCoutn = () => {
    count--;
  };
</script>

<div id="container">
  <button on:click={addCount}>+</button>
  <h1>{count}</h1>
  <button on:click={decrementCoutn}>-</button>
</div>

<style>
  #container {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
  }
</style>
