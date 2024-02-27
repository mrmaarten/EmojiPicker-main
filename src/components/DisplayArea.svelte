<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let selectedEmojis = [];

    let emojiString;
    $: emojiString = selectedEmojis.join('');

    function deleteLastEmoji() {
        dispatch('delete');
    }
</script>

<div class="display-area">
    <!-- <div class="emoji-container"> -->
      <!-- {#each selectedEmojis as emoji, i (i)}
        <span>{emoji}</span>
      {/each} -->
    <!-- </div> -->
    <!-- <button on:click={deleteLastEmoji}>⬅️</button> -->

    <textarea  bind:value={emojiString}></textarea>
    <button on:click={deleteLastEmoji}>DEL</button>
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
    textarea {
        width: 100%;
        height: 100px;
        font-size: 2em;
    }
  </style>