<script>
  import { createEventDispatcher } from 'svelte';
  import Picker from 'emoji-picker-element/picker';
  import { focusedEmojiIndex } from '../stores.js';
  import { onMount, onDestroy, tick } from 'svelte';

  const dispatch = createEventDispatcher();
  let pickerContainer;

  function handleEmojiClick(event) {
    dispatch('select', event.detail.unicode);
    focusedEmojiIndex.set(null);
  }

  onMount(async () => {
    await tick(); // Wait for the DOM to be updated
    const picker = new Picker();
    const shadow = picker.shadowRoot;
    const style = document.createElement('style');
    style.textContent = '.search-row { display: none; }';
    shadow.appendChild(style);
    picker.style.setProperty('--num-columns', '12');
    picker.style.setProperty('--emoji-size', `${window.innerHeight * 0.9 / 12}px`);
    picker.style.setProperty('--background', 'white');
    pickerContainer.appendChild(picker);
    picker.addEventListener('emoji-click', handleEmojiClick);

    // pickerContainer.style.height = '90vh';

    window.addEventListener('resize', () => {
      picker.style.setProperty('--emoji-size', `${window.innerHeight * 0.9 / 12}px`);
    });
  });

  onDestroy(() => {
    const picker = pickerContainer.querySelector('emoji-picker');
    if (picker) {
      picker.removeEventListener('emoji-click', handleEmojiClick);
      picker.remove();
    }
    window.removeEventListener('resize');
  });
</script>

<div class="emoji-wrapper" bind:this={pickerContainer}></div>

<style>
  .emoji-wrapper {
    /* width: 100%; */
    /* height: 90vh; */
    display: flex;
    justify-content: center;
    /* align-items: center;  */
  }
  
  /* emoji-picker {
    width: 100%;
    height: 100%;
  } */
  </style>