const DINO_IMAGE_WIDTH = 68;
const DINO_IMAGE_HEIGHT = 47;
const DINO_IMAGE_ELEVATION = 5
const DINO_SPRINT_JUMP_SPEED = -10;
const DINO_GRAVITY = 1;


class Dino {
	constructor(x, y, dim, cnv) {
		this.cnv = cnv;
		this.ctx = this.cnv.getContext("2d");
		this.cnv.style.pointerEvents = "none";

		this.x = x - DINO_IMAGE_WIDTH * SCALE;
		this.initX = this.x;
		this.y = y - DINO_IMAGE_HEIGHT * dim;
		this.groundY = this.y + DINO_IMAGE_ELEVATION * dim; //posizione originale prima del salto
		this.w = DINO_IMAGE_WIDTH * dim;
		this.h = DINO_IMAGE_HEIGHT * dim;

		this.dinoImgs = dinoImgs;
		this.imgI = 0;

		this.isJumping = false;
		this.velX = 0;
		this.accY = 0;
		this.velY = 0;

		this.framePerJump = this.simulateJump();

		this.dead = false;
	}

	respawn() {
		this.isJumping = true;
		this.x = this.initX;	
		this.velX = 0;
		this.y = 0;
		this.velY = 0;
		this.accY = 1;
		this.imgI = 10;

		this.dead = false;
	}

	simulateJump() {
		let y = this.y;
		let velY = DINO_SPRINT_JUMP_SPEED;
		const accY = DINO_GRAVITY;

		let timeId = 0;

		while(y <= this.y || velY < 0) {
			y += velY;
			velY += accY;

			timeId++;
		}

		return timeId;
	}

	jump(distance) {
		if (this.isJumping || this.dead) return;

		this.isJumping = true;

		this.velY = DINO_SPRINT_JUMP_SPEED;
		this.accY = DINO_GRAVITY;
		this.imgI = 10;

		this.velX = distance / this.framePerJump;

		updateScore(LEVEL);
	}

	update(id) {
		if (this.isJumping && id % 3 == 0 || !this.isJumping && id % 5 == 0) this.imgI++;

		if (this.isJumping) {
			this.x += this.velX;
			this.y += this.velY;
			this.velY += this.accY;

			if (this.y > this.groundY && this.velY >= 0) {
				this.velX = 0;
				this.y = this.groundY;
				this.velY = 0;
				this.accY = 0;
				this.isJumping = false;
				this.imgI = 0;
			}

			if (this.imgI == 20 && !this.dead) this.imgI = 10;
		} else {
			if (this.imgI == 10 && !this.dead) this.imgI = 0;
		}

		if (this.imgI >= 28) {
			this.imgI = 27;
			cancelAnimationFrame(id);

			gameIsRunning = false;
			
			document.body.appendChild(fadingCnv);
			endgameLoop();
		}
	}

	toDeath() {
		this.dead = true;
		this.imgI = 20;

		mainCtx.drawImage(zzz, this.x + this.w / 3, this.y - this.h / 3, this.w, this.h);
	}

	draw() {
		this.ctx.drawImage(this.dinoImgs[this.imgI], this.x, this.y, this.w, this.h);
	}
}