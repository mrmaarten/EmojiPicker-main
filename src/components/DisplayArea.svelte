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

    let hiddenInput;

    // export let focusedEmojiIndex = null;

    function handleEmojiClick(index) {
        console.log('$focusedEmojiIndex: ', $focusedEmojiIndex);
        console.log('index: ', index);
        // if (index !== null) {
            focusedEmojiIndex.set(index);
        // }
        
        // After handling the click, focus the hidden input field
        hiddenInput.focus();
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
<div class="emoji-container" contenteditable="false" on:keydown={handleKeyDown}>
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
      /* position: fixed; */
      /* top: 1rem; */
      width: 90vw; 
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto; 
      margin-top: 0.2rem;
      margin-bottom: 1rem;
      background: rgba(92, 92, 92, 0.8); /* Use rgba for semi-transparent background */
        /* backdrop-filter: blur(10px);  */
        /* -webkit-backdrop-filter: blur(10px); Apply blur effect with -webkit- prefix */

      border-radius: 16px; /* Add rounded corners */
      border: 4px solid rgb(255, 221, 0);
      padding-left: 10px;
      padding-right: 10px;
      z-index: 2;
    }
  

    .emoji-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10vw;
      font-size: 7.5vw;
      /* width: 80%; */
    }
  
    .emoji-container span {
      cursor: pointer;
      touch-action: manipulation; /* remove the delay on touch devices */
    }
  
    .emoji-container span.focused {
      outline: 1px dashed red;
      /* box-shadow: 1px -1px 1px 1px yellow, 0px 0px 0px 0px yellow; */

      touch-action: manipulation; /* remove the delay on touch devices */
    }
  
    .delete-button {
        padding: 0;
        align-items: center;
        /* width: 8vw; */
        font-size: 6vw;
        color: rgb(255, 221, 0);
        background: none;
        touch-action: manipulation; /* remove the delay on touch devices */

    }
  </style>