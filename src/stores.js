import { writable } from 'svelte/store';

export const selectedEmojis = writable([]);
export const focusedEmojiIndex = writable(null);