<script>
  import EmojiPicker from './components/EmojiPicker.svelte';
  import DisplayArea from './components/DisplayArea.svelte';
  import { selectedEmojis } from './stores.js';

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