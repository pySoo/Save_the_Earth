"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up__replay");
    this.popUpInfo = document.querySelector(".pop-up__info");
    this.popUpRefresh = document.querySelector(".pop-up__refresh");
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(title, trash) {
    console.log(trash);
    this.popUpText.innerText = title;
    this.popUp.classList.remove("pop-up--hide");
    this.popUpInfo.innerText = "";
    if (title === "TRY AGAIN😢🚯") {
      this.popUpInfo.innerText = `${trash}은(는) 일반쓰레기입니다.`;
    }
  }

  hide() {
    this.popUp.classList.add("pop-up--hide");
  }
}
