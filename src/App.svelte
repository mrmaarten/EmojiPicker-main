<script>
  import EmojiPicker from './components/EmojiPicker.svelte';
  import DisplayArea from './components/DisplayArea.svelte';

  let selectedEmojis = [];

  function handleSelect(event) {
    if (selectedEmojis.length < 10) {
      selectedEmojis = [...selectedEmojis, event.detail];
    }
  }

  function deleteEmoji() {
    console.log('deleteEmoji: ', selectedEmojis);
    selectedEmojis = selectedEmojis.slice(0, -1);
    console.log('after: ', selectedEmojis);
  }
</script>

<main>
  <DisplayArea {selectedEmojis} on:delete={deleteEmoji} />
  <EmojiPicker on:select={handleSelect} />
</main>