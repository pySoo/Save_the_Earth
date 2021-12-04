"use strict";
import PopUp from "./popup.js";
import * as sound from "./sound.js";

import { GameBuilder, Reason } from "./game.js";
const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(15)
  .recyclingCount(5)
  .trashCount(2)
  .build();

game.setGameStopListener((reason, trash) => {
  let message;
  switch (reason) {
    case Reason.cancle:
      message = "REPLAY❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "❗YOU SAVE THE EARTH❗🌍";
      sound.playWin();
      break;
    case Reason.timeout:
      message = "TIME OUT! TRY AGAIN😢🚯";
      sound.playBug();
      break;
    case Reason.lose:
      message = "TRY AGAIN😢🚯";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message, trash);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
