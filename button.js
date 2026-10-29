const BUTTON_IMAGE_WIDTH = 175;
const BUTTON_IMAGE_HEIGHT = 175;

const buttonImg = new Image();
buttonImg.src = "freefantasygui\\Button.png";

const NORMAL_BUTTON_IMAGE_COORDS = [
	{x: 455, y: 402},
   	{x: 651, y: 402},
   	{x: 844, y: 402},
   	{x: 1044, y: 402}
];

const BACK_BUTTON_IMAGE_COORDS = [
	{x:0, y: 2228},
   	{x: 193, y: 2228},
   	{x: 386, y: 2228},
   	{x: 589, y: 2228}
];

const FORWARD_BUTTON_IMAGE_COORDS = [
	{x:0, y: 2021},
   	{x: 193, y: 2021},
   	{x: 386, y: 2021},
   	{x: 589, y: 2021}
];

const PLAY_BUTTON_IMAGE_COORDS = [
    {x: 0,   y: 623},
    {x: 193, y: 623},
    {x: 386, y: 623},
    {x: 589, y: 623}
];

const PAUSE_BUTTON_IMAGE_COORDS = [
    {x: 0,   y: 1825},
    {x: 193, y: 1825},
    {x: 386, y: 1825},
    {x: 589, y: 1825}
];

const REWIND_BUTTON_IMAGE_COORDS = [
	{x: 1105, y: 3220},
	{x: 1299, y: 3220},
	{x: 1491, y: 3220},
	{x: 1694, y: 3220}
];

const SETTING_BUTTON_IMAGE_COORDS = [
	{x: 0,   y: 4822},
    {x: 193, y: 4822},
    {x: 386, y: 4822},
    {x: 589, y: 4822}
];

class GuiButton {
	constructor(text, x, y, w, h, wrapper, imgCoords = NORMAL_BUTTON_IMAGE_COORDS, enableEvents = true) {
		this.imgCoords = imgCoords

		this.imgW = BUTTON_IMAGE_WIDTH;
		this.imgH = BUTTON_IMAGE_HEIGHT;

		this.text = text;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.wrapper = wrapper;

		this.btn = document.createElement("button");
		this.btn.style.position = "absolute";
		this.btn.style.left = (this.x - this.w/2) + "px";
		this.btn.style.top = (this.y - this.h/2) + "px";
		this.btn.style.width = this.w + "px";
		this.btn.style.height = this.h + "px";

		this.btn.style.border = "none";
		this.btn.style.outline = "none";
		this.btn.style.padding = "0";
		this.btn.style.appearance = "none";
		this.btn.style.backgroundColor = "transparent";

		this.btn.textContent = this.text;
		this.btn.style.color = "#44aa33";
		this.btn.style.fontFamily = "Helvetica";
		this.btn.style.fontSize = SCORE_FONT_SIZE * (2 / 3) + "px";
		this.btn.style.fontWeight = "bold";
		this.btn.style.whiteSpace = "pre-line";

		this.scaleW = this.w / this.imgW;
		this.scaleH = this.h / this.imgH;

		this.btn.style.backgroundImage = "url('" + buttonImg.src + "')";
		this.btn.style.backgroundPosition = "-" + this.imgCoords[0].x * this.scaleW + "px -" + this.imgCoords[0].y * this.scaleH + "px";
		this.btn.style.backgroundRepeat = "no-repeat";

		this.btn.style.backgroundSize = buttonImg.naturalWidth * this.scaleW + "px " + buttonImg.naturalHeight * this.scaleH + "px";

		this.inactive = false;
		
		if (this.wrapper) this.wrapper.appendChild(this.btn);

		if (!enableEvents) return;

		this.btn.addEventListener("mouseenter", () => {
			if (this.inactive) return;

			this.btn.style.backgroundPosition = "-" + this.imgCoords[1].x * this.scaleW +  "px -" + this.imgCoords[1].y * this.scaleH + "px";
			this.btn.style.color = "#ffff55";
		});

		this.btn.addEventListener("mouseleave", () => {
			if (this.inactive) return;

			this.btn.style.backgroundPosition = "-" + this.imgCoords[0].x * this.scaleW +  "px -" + this.imgCoords[0].y * this.scaleH + "px";
			this.btn.style.color = "#44aa33";
		});

		this.btn.addEventListener("mousedown", () => {
			if (this.inactive) return;

			this.btn.style.backgroundPosition = "-" + this.imgCoords[2].x * this.scaleW +  "px -" + this.imgCoords[2].y * this.scaleH + "px";
			this.btn.style.color = "#005500";
		});

		this.btn.addEventListener("mouseup", () => {
			if (this.inactive) return;

			this.btn.style.backgroundPosition = "-" + this.imgCoords[1].x * this.scaleW +  "px -" + this.imgCoords[1].y * this.scaleH + "px";
			this.btn.style.color = "#ffff55";
		});
	}

	static destroy(...btns) {
		for (const btn of btns) btn.btn.remove();
	}

	addEventListener(event, fn) {
		this.btn.addEventListener(event, fn);
	}

	deactivate() {
		this.inactive = true;
		this.btn.style.backgroundPosition = "-" + this.imgCoords[3].x * this.scaleW +  "px -" + this.imgCoords[3].y * this.scaleH + "px";
		this.btn.style.color = "#888888";
	}
}

class TwoSidesGuiButton extends GuiButton {
	constructor(text, x, y, w, h, wrapper, imgCoords = NORMAL_BUTTON_IMAGE_COORDS, imgCoords2) {
		super(text, x, y, w, h, wrapper, imgCoords);

		this.firstImgCoords = this.imgCoords;
		this.secondImgCoords = imgCoords2;

		this.currentStatus = "running";
	}

	toggle() {
		if (this.currentStatus === "running") {
			this.currentStatus = "stop";
			this.imgCoords = this.secondImgCoords;
		} else {
			this.currentStatus = "running";
			this.imgCoords = this.firstImgCoords;
		}

		this.btn.style.backgroundPosition = "-" + this.imgCoords[1].x * this.scaleW +  "px -" + this.imgCoords[1].y * this.scaleH + "px";
		this.btn.style.color = "#ffff55";
	}
}

class SelectableButton extends GuiButton {
	constructor(text, x, y, w, h, wrapper) {
		super(text, x, y, w, h, wrapper, NORMAL_BUTTON_IMAGE_COORDS, false);

		this.turnOff();
	}

	turnOn() {
		this.on = true;

		this.btn.style.backgroundPosition = "-" + this.imgCoords[1].x * this.scaleW +  "px -" + this.imgCoords[1].y * this.scaleH + "px";
		this.btn.style.color = "#ffff55";
	}

	turnOff() {
		this.on = false;

		this.btn.style.backgroundPosition = "-" + this.imgCoords[0].x * this.scaleW +  "px -" + this.imgCoords[0].y * this.scaleH + "px";
		this.btn.style.color = "#44aa33";
	}
}

class ButtonSet {
	constructor(names, x, y, w, h, font = "Bravura") {
		this.names = names;
		this.btns = [];

		this.font = font;

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.active = true;
		this.btnOnIndex = 0;

		for (let i = 0; i < this.names.length; i++) {
			const x = this.x + this.w * 1.1 * i;
			this.btns[i] = new SelectableButton(this.names[i], x, this.y, this.w, this.h, document.body);

			this.btns[i].btn.style.font = (this.w * 0.25) + "px " + this.font;
			this.btns[i].btn.style.display = "flex";
  			this.btns[i].btn.style.justifyContent = "center";
  			this.btns[i].btn.style.alignItems = "center";
  			this.btns[i].btn.style.lineHeight = 1;

			this.btns[i].addEventListener("click", () => {
				if (!this.active) return;

				for (const btn of this.btns) btn.turnOff();

				this.btns[i].turnOn();
				this.btnOnIndex = i;
			});
		}

		this.btns[0].turnOn();
	}

	increase(rate) {
		for (let btn of this.btns) btn.btn.style.font = ((this.w * 0.25) * (1 + rate)) + "px Bravura";	
	}

	breakPosition(pos) {
		for (let i = pos; i < this.btns.length; i++) {
			this.btns[i].btn.style.top = (parseInt(this.btns[i].btn.style.top) + this.h * 1.11) + "px";
			this.btns[i].btn.style.left = (this.x + this.w * 1.1 * (i - pos) - this.w * 0.5) + "px";
		}
	}

	turnOn(index) {
		this.btns[index].turnOn();
		this.btnOnIndex = index;
	}

	turnOff(index) {
		this.btns[index].turnOff();
	}

	turnOffAll() {
		for (let btn of this.btns) {
			btn.turnOff();
		}
	}

	activate() {
		this.active = true;

		for (let btn of this.btns) {
			btn.turnOn();
			btn.turnOff();
		}

		this.turnOn(0);
	}

	deactivate() {
		this.active = false;

		for (let btn of this.btns) btn.deactivate();
	}

	destroy() {
		GuiButton.destroy(...this.btns);
	}
}