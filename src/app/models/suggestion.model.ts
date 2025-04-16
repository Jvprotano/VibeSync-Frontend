import { Song } from "./song.model";

export interface Suggestion {
    countSuggestions: number;
    song: Song;
}