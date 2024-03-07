<script>
    import { createEventDispatcher } from 'svelte';
    import 'emoji-picker-element';
    // import Picker from 'emoji-picker-element/picker';
    import { focusedEmojiIndex } from '../stores.js';
    import { onMount, tick } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleEmojiClick(event) {
      dispatch('select', event.detail.unicode);
      focusedEmojiIndex.set(null);
    }

    onMount(async () => {
        await tick(); // Wait for the DOM to be updated
        const picker = document.querySelector('emoji-picker');
        picker.addEventListener('emoji-click', handleEmojiClick);
    });
</script>
<div class="emoji-wrapper">
    
<emoji-picker></emoji-picker>
</div>
<style>
.emoji-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

emoji-picker {
  --num-columns: 12;
  --emoji-size: 4rem;
  --background: white;
  width: 100%; 
  height: 80vh;
}
emoji-picker::part(search-wrapper) {
  display: none; /* Hide the search bar */
}
</style>