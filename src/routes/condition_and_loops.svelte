<script>
  let show = true;
  let items = ["item - 1", "item - 2", "item - 3", "item - 4", "item - 5"];
</script>

<div>
  {#if show}
    <h1>Show is Open</h1>
    <div>
      {#each items as item}
        <h1>{item}</h1>
      {/each}
    </div>
  {:else}
    <h1>Show is Closed</h1>
  {/if}
</div>
