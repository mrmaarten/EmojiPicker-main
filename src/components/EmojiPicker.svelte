<script>
    import { createEventDispatcher } from 'svelte';
    import emojiData from 'emoji-datasource';
    import { focusedEmojiIndex } from '../stores.js';
    import { onMount, tick } from 'svelte';
    
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

    onMount(async () => {
        await tick(); // Wait for the DOM to be updated
        const elements = document.querySelectorAll('.emoji-picker button');

        elements.forEach(element => {
            element.addEventListener('dblclick', event => {
                event.preventDefault();
            });
        });
    });
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

  <style>
     .emoji-picker {
      /* display: grid;  */
      justify-content: center;
      align-items: center;
      /* min-height: 100px;  */
      /* font-size: 3vw; */
      width: 100%;
    }
    .emoji-grid {
      /* display: flex;  */
      /* justify-content: center; */
      /* align-items: center; */
      /* min-height: 100px;  */
      font-size: 3vw;
      /* width: 10%; */
    }
  </style>