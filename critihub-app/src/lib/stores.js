import { writable } from 'svelte/store';

export const user = writable({});

export const isLoggedIn = writable(false);
export const isAdmin = writable(false);
export const movies = writable([]);
export const series = writable([]);
export const juegos = writable([]);
export const idP = writable([]);
export const idu = writable([]);
