class Keyboard {
  constructor(input) {
    this.input = input;

    this.w = SCREEN_WIDTH;
    this.h = SCREEN_HEIGHT;

    this.btnW = this.w / 11;
    this.btnH = this.btnW;
    this.xOffset = -this.btnW / 2;
    this.yOffset = this.btnH / 2;

    const letters = [
      "Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", 
      "A", "S", "D", "F", "G", "H", "J", "K", "L",
      "Y", "X", "C", "V", "B", "N", "M"
    ];

    const firstKeyLeft = this.w * 0.5 - this.btnW * 4.5;
    const secondKeyLeft = firstKeyLeft + this.btnW * 0.5;
    const thirdKeyLeft = firstKeyLeft + this.btnW;

    this.btns = [];

    //prima riga
    for (let i = 0; i < 10; i++) {
      this.btns[i] = new GuiButton(letters[i], firstKeyLeft + i * this.btnW + this.xOffset, this.h - this.btnH * 2.5 - this.yOffset, this.btnW, this.btnH, document.body, NORMAL_BUTTON_IMAGE_COORDS);
    }

    //seconda riga
    for (let i = 0; i < 9; i++) {
      this.btns[i + 10] = new GuiButton(letters[i + 10], secondKeyLeft + i * this.btnW + this.xOffset, this.h - this.btnH * 1.5 - this.yOffset, this.btnW, this.btnH, document.body, NORMAL_BUTTON_IMAGE_COORDS);
    }

    //terza riga
    for (let i = 0; i < 7; i++) {
      this.btns[i + 19] = new GuiButton(letters[i + 19], thirdKeyLeft + i * this.btnW + this.xOffset, this.h - this.btnH * 0.5 - this.yOffset, this.btnW, this.btnH, document.body, NORMAL_BUTTON_IMAGE_COORDS);
    }

    this.btns[26] = new GuiButton("\u232b", firstKeyLeft + 10 * this.btnW + this.xOffset, this.h - this.btnH * 2.5 - this.yOffset, this.btnW, this.btnH, document.body, NORMAL_BUTTON_IMAGE_COORDS);
    this.btns[27] = new GuiButton("\u23ce", secondKeyLeft + 9.25 * this.btnW + this.xOffset, this.h - this.btnH * 1 - this.yOffset, this.btnW * 1.5, this.btnH * 2, document.body, NORMAL_BUTTON_IMAGE_COORDS);
  
    for (let i = 0; i < this.btns.length; i++) {
      let fontSize = this.btnW * 0.5;

      if (i === 26) fontSize = this.btnW * 0.3;
      else if (i === 27) fontSize = this.btnW;

      this.btns[i].btn.style.fontSize = fontSize + "px";      
    }

    for (let i = 0; i < 26; i++) {
      this.btns[i].addEventListener("click", () => {
        this.input.textContent += letters[i];
      });
    }

    this.btns[26].addEventListener("click", () => {
      this.input.textContent = this.input.textContent.slice(0, -1);
    });
  }

  destroy() {
    GuiButton.destroy(...this.btns);
  }
}
