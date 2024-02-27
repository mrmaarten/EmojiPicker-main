<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣'];
  
    function selectEmoji(emoji) {
      dispatch('select', emoji);
    }
  </script>
  
  <div class="emoji-grid">
    {#each emojis as emoji (emoji)}
      <button on:click={() => selectEmoji(emoji)}>{emoji}</button>
    {/each}
  </div>