<!-- 
TODO 
- fix bug: when selecting a emoji in the selected field, the emoji can be deleted with the keyboard but not with the del <button 
- show the last deleted emojis under neath the selected emojis, with a filter for repeating emojis
- make a selection of emojis
- reverse the order of the categories
- test the app on mobile / iPad with HDMI cable
-->

<script>
    // import { writable } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    import { selectedEmojis, focusedEmojiIndex } from '../stores.js';
   

    const dispatch = createEventDispatcher();

    // export let focusedEmojiIndex = null;

    function handleEmojiClick(index) {
        console.log('$focusedEmojiIndex: ', $focusedEmojiIndex);
        console.log('index: ', index);
        // if (index !== null) {
            focusedEmojiIndex.set(index);
        // }
    }

    function handleKeyDown(event) {
        if (event.key === 'Backspace' && $focusedEmojiIndex !== null) {
            deleteEmojiAt($focusedEmojiIndex-1);
            event.preventDefault();
        }
    }

    function deleteLastEmoji() {
        console.log('$focusedEmojiIndex: ', $focusedEmojiIndex);
        if ($focusedEmojiIndex !== null) {
            deleteEmojiAt($focusedEmojiIndex);
        } else if ($selectedEmojis.length > 0) {
            deleteEmojiAt($selectedEmojis.length - 1);
        }
    }

    function deleteEmojiAt(index) {
        console.log('index: ', index);
        selectedEmojis.update(emojis => [
            ...emojis.slice(0, index),
            ...emojis.slice(index + 1)
        ]);
        focusedEmojiIndex.set(null);
        console.log('selectedEmojis: ', $selectedEmojis);
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
      width: 80%; 
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto; /* Center the wrapper */
      background: rgb(92, 92, 92);
      border-radius: 16px; /* Add rounded corners */
      padding-left: 10px;
      padding-right: 10px;

    }
  
    .emoji-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
      font-size: 7vw;
      /* width: 80%; */
    }
  
    .emoji-container span {
      cursor: pointer;
      touch-action: manipulation; /* remove the delay on touch devices */
    }
  
    .emoji-container span.focused {
      outline: 1px solid blue;
      touch-action: manipulation; /* remove the delay on touch devices */
    }
  
    .delete-button {
        padding: 0;
        align-items: center;
        /* width: 8vw; */
        font-size: 6vw;
        background: none;
        touch-action: manipulation; /* remove the delay on touch devices */

    }
  </style>