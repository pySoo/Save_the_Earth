const recyclingSound = new Audio("./sound/recycling_pull.mp3");
const trashSound = new Audio("./sound/trash_pull.mp3");
const bgSound = new Audio("./sound/bg.mp3");
const alertSound = new Audio("./sound/alert.wav");
const winSound = new Audio("./sound/game_win.mp3");

export function playCarrot() {
  playSound(recyclingSound);
}

export function playBug() {
  playSound(trashSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playWin() {
  playSound(winSound);
}

export function playBackground() {
  playSound(bgSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
