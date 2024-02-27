<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let selectedEmojis = [];

    function deleteLastEmoji() {
        dispatch('delete');
    }
</script>

<div class="display-area">
    <div class="emoji-container">
      {#each selectedEmojis as emoji, i (i)}
        <span>{emoji}</span>
      {/each}
    </div>
    <button on:click={deleteLastEmoji}>⬅️</button>
  </div>

  <style>
    .display-area {
      display: flex;
      align-items: center;
    }
  
    .emoji-container {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
    }

    .emoji-container span {
      font-size: 2em; /* Adjust this value to make the emojis bigger or smaller */
    } 
  </style>