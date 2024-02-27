<script>
    import { createEventDispatcher } from 'svelte';
    import { selectedEmojis, focusedEmojiIndex } from '../stores.js';

    const dispatch = createEventDispatcher();

    // export let focusedEmojiIndex = null;

    function handleEmojiClick(index) {
        $focusedEmojiIndex.update(index);
    }

    function handleKeyDown(event) {
        if (event.key === 'Backspace' && $focusedEmojiIndex !== null) {
            deleteEmojiAt($focusedEmojiIndex);
            event.preventDefault();
        }
    }

    function deleteLastEmoji() {
        if ($focusedEmojiIndex !== null) {
            deleteEmojiAt($focusedEmojiIndex);
        } else if ($selectedEmojis.length > 0) {
            deleteEmojiAt($selectedEmojis.length - 1);
        }
    }

    function deleteEmojiAt(index) {
        selectedEmojis.update(emojis => [
            ...emojis.slice(0, index),
            ...emojis.slice(index + 1)
        ]);
        $focusedEmojiIndex.update(null);
    }

</script>

<!-- 
        <button
        class:focused={i === focusedEmojiIndex}
        on:click={() => handleEmojiClick(i)}
        on:keydown={(event) => event.key === 'Enter' && handleEmojiClick(i)}
    >
        {emoji}
    </button> -->
<div class="wrapper">
<div class="emoji-container" contenteditable="true" on:keydown={handleKeyDown}>
    {#each $selectedEmojis as emoji, i (i)}
        <span
            class:focused={i === $focusedEmojiIndex}
            on:click={() => handleEmojiClick(i)}
        >
            {emoji}
        </span>

    {/each}
    <!-- <button on:click={deleteLastEmoji}>DEL</button> -->
</div>
<button class="delete-button" on:click={deleteLastEmoji}>⌫</button>
</div>

<style>
    .wrapper {
      position: fixed;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%; /* Adjust as needed */
      margin: 0 auto; /* Center the wrapper */
      background: rgb(92, 92, 92);
      border-radius: 12px; /* Add rounded corners */
    }
  
    .emoji-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-height: 100px;
      font-size: 8vw;
      width: 80%;
    }
  
    .emoji-container span {
      cursor: pointer;
    }
  
    .emoji-container span.focused {
      outline: 1px solid blue;
    }
  
    .delete-button {
        padding: 0;
        align-items: center;
        /* width: 8vw; */
        font-size: 6vw;
        background: none;
    }
  </style>