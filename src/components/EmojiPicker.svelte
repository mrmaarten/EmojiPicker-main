<script>
    import { createEventDispatcher } from 'svelte';
    import emojiData from 'emoji-datasource';
    import emojiUnicode from 'emoji-unicode';
    import { focusedEmojiIndex } from '../stores.js';

    $: console.log(categorizedEmojis);

    let categorizedEmojis = emojiData.reduce((categories, emoji) => {
        if (!categories[emoji.category]) {
        categories[emoji.category] = [];
        }
        categories[emoji.category].push(emoji);
        return categories;
    }, {});

    const dispatch = createEventDispatcher();
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣'];
  
    function handleEmojiClick(emoji) {
      dispatch('select', emoji);
      focusedEmojiIndex.set(null);
    }


  </script>
  
  <div class="emoji-picker">
    {#each Object.entries(categorizedEmojis) as [category, emojis]}
      <h2>{category}</h2>
      <div class="emoji-grid">
        {#each emojis as emoji}
        <button on:click={() => handleEmojiClick(String.fromCodePoint(parseInt(emoji.unified, 16)))}>{String.fromCodePoint(parseInt(emoji.unified, 16))}</button>
        {/each}
      </div>
    {/each}
  </div>