"use strict";
import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancle: "cancle",
  timeout: "timeout",
});

export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  recyclingCount(num) {
    this.recyclingCount = num;
    return this;
  }

  trashCount(num) {
    this.trashCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.recyclingCount, this.trashCount);
  }
}
class Game {
  constructor(gameDuration, recyclingCount, trashCount) {
    this.gameDuration = gameDuration;
    this.recyclingCount = recyclingCount;
    this.trashCount = trashCount;

    this.gameInfo = document.querySelector(".info");
    this.gameBtn = document.querySelector(".game__button");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");

    this.gameField = new Field(recyclingCount, trashCount);
    this.gameField.setClickListener(this.onItemClick);

    this.score = 0;
    this.timer = undefined;
    this.started = false;

    this.gameBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      if (this.started) {
        this.stop(Reason.cancle);
      } else {
        this.start();
      }
    });
  }

  onItemClick = (item, trash) => {
    console.log("item", item);
    if (!this.started) {
      return;
    }
    if (item == ItemType.recycling) {
      this.score++;
      this.updateScoreBoard();
      if (this.score == this.recyclingCount) {
        this.stop(Reason.win);
      }
    } else if (item == ItemType.trash) {
      this.stop(Reason.lose, trash);
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  initGame() {
    this.score = 0;
    this.gameInfo.style.display = "none";
    this.gameScore.innerText = this.recyclingCount;
    this.gameField.init();
  }

  stop(reason, trash) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason, trash);
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(
          this.recyclingCount == this.score ? Reason.win : Reason.timeout
        );
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.recyclingCount - this.score;
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }
}
