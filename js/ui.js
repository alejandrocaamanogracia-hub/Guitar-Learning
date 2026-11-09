const allCircles = document.querySelectorAll(".note-circle");
const allCirclesArray = Array.from(allCircles);

const notesButtonsArray = Array.from(document.querySelectorAll(".note-selection button"));
const stringButtonsArray = Array.from(document.querySelectorAll(".string-selection button"));

const noteName = document.querySelector("#note-name");

export function updateMessage(message) {
    noteName.textContent = message;
}

export function resetFretboard() {
    allCircles.forEach(circle => {
        circle.classList.remove("note-active");
        circle.classList.add("disabled");
    });
}

export function activateString(stringNum) {
    resetFretboard();
    const circlesInString = allCirclesArray.filter(circle => circle.dataset.string == stringNum);
    circlesInString.forEach(circle => {
        circle.classList.remove("disabled");
    });
}

export function showTargetCircle(stringNum, fretNum) {
    resetFretboard();
    const targetCircle = allCirclesArray.find(circle => circle.dataset.string == stringNum && circle.dataset.fret == fretNum );
    if (targetCircle) {
        targetCircle.classList.add("note-active");
        targetCircle.classList.remove("disabled");
    }
}

export function activateStringButtons() {
    stringButtonsArray.forEach(btn => {
        btn.disabled = false;
    });
}

export function deactivateStringButtons() {
    stringButtonsArray.forEach(btn => {
        btn.disabled = true;
    });
}

export function activateNotesButtons() {
    notesButtonsArray.forEach(btn => {
        btn.disabled = false;
    });
}

export function deactivateNotesButtons() {
    notesButtonsArray.forEach(btn => {
        btn.disabled = true;
    });
}

export function activateButton(btn){
    btn.classList.add("btn-active");
}

export function deactivateButtons(btns){
    btns.forEach(btn => {
        btn.classList.remove("btn-active");
    });
}
