import { browser } from '$app/environment';
import { writable } from 'svelte/store';
 // This is a writable store that stores the list of liked items in local storage as a JSON string.
const defaultValue = JSON.stringify([]);
const initialValue = browser ? window.localStorage.getItem('likeList') ?? defaultValue : defaultValue;
 
const likeList = writable(initialValue);
 
likeList.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('likeList', value);
  }
});

export default likeList;