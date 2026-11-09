import { setMode, generateChallenge, validateAnswer, getCurrentChallenge, getMode } from './logic.js';
import * as UI from './ui.js';

const URL_NOTES = "./notes.json";

const modesButtons = document.querySelector(".mode-selection");
const modesButtonsArray = Array.from(document.querySelectorAll(".mode-selection button"));

const stringButtons = document.querySelector(".string-selection");
const stringsButtonsArray = Array.from(document.querySelectorAll(".string-selection button"));

const notesButtons = document.querySelector(".note-selection");
const fretBoard = document.querySelector(".fret-board");

modesButtons.addEventListener("click", (e) => {
    const modeButton = e.target.closest("button");

    UI.deactivateButtons(modesButtonsArray);
    UI.activateButton(modeButton);

    UI.resetFretboard();
    const modeText = modeButton.textContent.trim();

    if (modeText.includes("FIND")) {
        setMode("find");
        UI.activateStringButtons();
        UI.deactivateNotesButtons();
        UI.updateMessage("CHOOSE A STRING");
    } else {
        setMode("guess");
        UI.activateNotesButtons();
        UI.activateStringButtons();
        UI.updateMessage("CHOOSE A STRING");
    }
});

stringButtons.addEventListener("click", async (e) => {
    const button = e.target.closest("button");

    UI.deactivateButtons(stringsButtonsArray);
    UI.activateButton(button);

    const stringNum = button.dataset.string;
    const mode = getMode();

    const challenge = await generateChallenge(URL_NOTES, stringNum, mode);
    
    if (challenge.challenge === "find") {
        UI.activateString(stringNum);
        UI.updateMessage(`FIND THE NOTE: ${challenge.noteName}`);
    } else {
        UI.showTargetCircle(challenge.string, challenge.fret);
        UI.updateMessage(`GUESS THE NOTE`);
    }
});

fretBoard.addEventListener('click', async (e) => {
    const noteCircle = e.target.closest(".note-circle");

    const clickedString = noteCircle.dataset.string;
    const clickedFret = Number(noteCircle.dataset.fret);

    if (validateAnswer(clickedString, clickedFret, null)) {
        const nextChallenge = await generateChallenge(URL_NOTES, clickedString, "find");
        UI.updateMessage(`FIND THE NOTE: ${nextChallenge.noteName}`);
    }
});

notesButtons.addEventListener("click", async (e) => {
    const noteButton = e.target.closest("button");

    const clickedNote = noteButton.textContent.trim();
    const current = getCurrentChallenge();

    if (current && validateAnswer(null, null, clickedNote)) {
        const nextChallenge = await generateChallenge(URL_NOTES, current.string, "guess");
        UI.showTargetCircle(nextChallenge.string, nextChallenge.fret);
        UI.updateMessage(`GUESS THE NOTE`);
    }
});