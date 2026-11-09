import { fetchData } from './api.js';

let currentMode = null;
let currentChallenge = null;

export function setMode(mode) {
    currentMode = mode;
    currentChallenge = null;
}

export function getMode() {
    return currentMode;
}

export function getCurrentChallenge() {
    return currentChallenge;
}

export async function generateChallenge(url, stringNumber, mode) {
    const notesData = await fetchData(url);

    const fretNumber = Math.floor(Math.random() * 12) + 1;
    const stringData = notesData[stringNumber];
    const targetNoteObj = stringData.notes.find(n => n.fret === fretNumber);

    currentChallenge = {
        string: String(stringNumber),
        fret: fretNumber,
        noteName: targetNoteObj.note,
        challenge: mode
    };

    return currentChallenge;
}

export function validateAnswer(clickedString, clickedFret, clickedNote) {
    if (currentChallenge.challenge === "find") {
        return clickedString === currentChallenge.string && clickedFret === currentChallenge.fret;
    } else if (currentChallenge.challenge === "guess") {
        return clickedNote === currentChallenge.noteName;
    }
    return false;
}