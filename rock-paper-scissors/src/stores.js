import { writable } from "svelte/store";

// Create writable stores
export const bestOfSelection = writable(0);
export const maxGames = writable(0);
export const gameOver = writable(false);
export const userWins = writable(0);
