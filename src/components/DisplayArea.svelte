<script>
    import { createEventDispatcher } from 'svelte';
    import { selectedEmojis } from '../stores.js';

    const dispatch = createEventDispatcher();

    let focusedEmojiIndex = null;

    function handleEmojiClick(index) {
        focusedEmojiIndex = index;
    }

    function handleKeyDown(event) {
        if (event.key === 'Backspace' && focusedEmojiIndex !== null) {
            deleteEmojiAt(focusedEmojiIndex);
            event.preventDefault();
        }
    }

    function deleteLastEmoji() {
        if (focusedEmojiIndex !== null) {
            deleteEmojiAt(focusedEmojiIndex);
        } else if ($selectedEmojis.length > 0) {
            deleteEmojiAt($selectedEmojis.length - 1);
        }
    }

    function deleteEmojiAt(index) {
        selectedEmojis.update(emojis => [
            ...emojis.slice(0, index),
            ...emojis.slice(index + 1)
        ]);
        focusedEmojiIndex = null;
    }

</script>

<style>
    .emoji-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100px;
        font-size: 2em;
    }

    .emoji-container span {
        cursor: pointer;
    }

    .emoji-container span.focused {
        outline: 1px solid blue;
    }
</style>

<div class="emoji-container" contenteditable="true" on:keydown={handleKeyDown}>
    {#each $selectedEmojis as emoji, i (i)}
        <span
            class:focused={i === focusedEmojiIndex}
            on:click={() => handleEmojiClick(i)}
        >
            {emoji}
        </span>
        
<!-- 
        <button
        class:focused={i === focusedEmojiIndex}
        on:click={() => handleEmojiClick(i)}
        on:keydown={(event) => event.key === 'Enter' && handleEmojiClick(i)}
    >
        {emoji}
    </button> -->
    {/each}
</div>
<button on:click={deleteLastEmoji}>DEL</button>