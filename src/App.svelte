<script>
  import EmojiPicker from './components/EmojiPicker.svelte';
  import DisplayArea from './components/DisplayArea.svelte';
  import { selectedEmojis } from './stores.js';
  import { onMount, onDestroy } from 'svelte';

  let startY;

  // Prevent pull to refresh on touch devices
  function handleTouchStart(event) {
    startY = event.touches[0].clientY;
  }

  function handleTouchMove(event) {
    const y = event.touches[0].clientY;
    const direction = y - startY;

    // Only prevent the default action if the top of the document is already scrolled to the top and user is scrolling up
    if (window.scrollY === 0 && direction > 0) {
      event.preventDefault();
    }
  }

  // Add the event listeners when the component mounts
  onMount(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
  });

  // Remove the event listeners when the component unmounts
  onDestroy(() => {
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchmove', handleTouchMove);
  });
  
  function handleSelect(event) {
    // handles selecting a emoji from the grid of emojis
    if ($selectedEmojis.length < 10) {
      //add the emoji from the grid to the selected array
      selectedEmojis.update(emojis => [...emojis, event.detail]);
    }
  }

  function deleteEmoji() {
    selectedEmojis.update(emojis => emojis.slice(0, -1));
  }

</script>

<main>
  <DisplayArea on:delete={deleteEmoji} />
  <EmojiPicker on:select={handleSelect} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>