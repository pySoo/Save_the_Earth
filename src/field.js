"use strict";
import * as sound from "./sound.js";

const RECYCLING_SIZE = 200;
export const ItemType = Object.freeze({
  recycling: "recycling",
  trash: "trash",
});
export class Field {
  constructor(recyclingCount, trashCount) {
    this.recyclingCount = recyclingCount;
    this.trashCount = trashCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    const recyclingPath = [
      ["img/box.png", "박스"],
      ["img/glass_cup.png", "유리컵"],
      ["img/plastic_bottle.png", "플라스틱 병"],
      ["img/milk.png", "우유곽"],
      ["img/brushbox.png", "쓰레받기"],
      ["img/newspaper.png", "신문"],
    ];
    const trashPath = [
      ["img/egg.png", "계란 껍질"],
      ["img/lighter.png", "라이터"],
      ["img/pen.png", "펜"],
      ["img/ramen.png", "라면 용기"],
      ["img/teeth.png", "틀니"],
      ["img/toothbrush.png", "칫솔"],
      ["img/toothpaste.png", "치약"],
    ];
    this._addRandomItem(ItemType.recycling, recyclingPath, 3);
    this._addRandomItem(ItemType.trash, trashPath, 4);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addRandomItem(type, path, num) {
    const pathList = path.sort(() => 0.5 - Math.random()).splice(0, num);

    for (let i = 0; i < pathList.length; i++) {
      this._addItem(type, 2, pathList[i]);
    }
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - RECYCLING_SIZE;
    const y2 = this.fieldRect.height - RECYCLING_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath[0]);
      item.setAttribute("title", imgPath[1]);
      item.setAttribute("width", "100px");
      item.style.position = "absolute";
      if (i % 2) {
        item.style.webkitTransform = "rotate(4deg)";
      } else {
        item.style.webkitTransform = "rotate(-4deg)";
      }
      const x = this.randomNumber(x1, x2);
      const y = this.randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  onClick = (event) => {
    const target = event.target;
    console.log(target);
    if (target.matches(".recycling")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.recycling);
    } else if (target.matches(".trash")) {
      this.onItemClick && this.onItemClick(ItemType.trash, target.title);
    }
  };

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}
