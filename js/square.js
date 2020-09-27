class Square {
	constructor(name, x, y) {
		this.name = name;
		this.x = x;
		this.y = y;
		let texture = PIXI.Texture.from('images/blue-square.png');
		let square = new PIXI.Sprite(texture);
		this.square = square;
		let turn;
		this.turn = turn;
	}

	setObjectByXY() {
		this.square.position.x = this.x;                                         
		this.square.position.y = this.y;
		app.stage.addChild(this.square);
	}

	updateObjectXY() {
		this.x = Math.floor((Math.random() * 1000) / 2);
		this.y = Math.floor((Math.random() * 1000) / 2);
		this.square.position.x = this.x;
		this.square.position.y = this.y;
	}

	setObjectAround(centerX, centerY) {
		const radius = Math.round(Math.sqrt(Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2)));
		let angle = (Math.atan2(Math.abs(this.y - centerY), this.x - centerX) * 180) / Math.PI;
		this.turn = setInterval(() => {
			this.square.position.x = centerX + Math.round(radius * Math.cos((angle * Math.PI) / 180));
			if (this.y > centerY) {
				this.square.position.y = centerY + Math.round(radius * Math.sin((angle * Math.PI) / 180));
			}
			if (this.y < centerY) {
				this.square.position.y = centerY - Math.round(radius * Math.sin((angle * Math.PI) / 180));
			}
			angle++;
		}, 10);
	}

	stopObjectAround() {
		clearInterval(this.turn);
		this.x = this.square.position.x;
		this.y = this.square.position.y;
	}
}