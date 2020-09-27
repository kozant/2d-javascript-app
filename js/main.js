const app = new PIXI.Application({ backgroundColor: 0xffffff, width: 501, height: 501 }); 
document.body.appendChild(app.view);

let id = 1;
const objectData = [];
const grid = new PIXI.Graphics();				//	Создание сетки

grid.lineStyle(1, 0x000000, 1);
grid.beginFill(0xffffff);
grid.drawRect(0, 0, 500, 500);
grid.endFill();

let counterY = 0;
let counterX = 0;

for (let i = 1; i <= 25; i++) {
	grid.moveTo(0, counterY);
	grid.lineTo(500, counterY);
	counterY += 20;
}

for (let i = 1; i <= 25; i++) {
	grid.moveTo(counterX, 0);
	grid.lineTo(counterX, 500);
	counterX += 20;
}

app.stage.addChild(grid);

for (let i = 0; i < 10; i++) {					//	Добавление 10 объектов по умолчанию
	let square = new Square(
		`square${id++}`,
		Math.floor((Math.random() * 1000) / 2),
		Math.floor((Math.random() * 1000) / 2)
	);
	square.setObjectByXY();
	objectData.push(square);
}

const canvas = document.getElementsByTagName('canvas')[0];

canvas.addEventListener('click', (e) => {										//	Добавление объекта по клику
	let target = canvas.getBoundingClientRect();
	let x = e.clientX - target.left;
	let y = Math.round(e.clientY - target.top);
	let square = new Square(`square${id++}`, x, y);
	square.setObjectByXY();
	objectData.push(square);
});

canvas.addEventListener('mousemove', (e) => {									//	Координаты курсора
	let target = canvas.getBoundingClientRect();
	let x = e.clientX - target.left;
	let y = Math.round(e.clientY - target.top);
	document.querySelector('.coord-live').innerHTML = `${x}, ${y}`;
});

document.querySelector('.add-object').addEventListener('click', () => {			//	Добавление объектов по нажатию кнопки
	const amount = +document.querySelector('.add-value').value;
	for (let i = 0; i < amount; i++) {
		let square = new Square(
			`square${id++}`,
			Math.floor((Math.random() * 1000) / 2),
			Math.floor((Math.random() * 1000) / 2)
		);
		square.setObjectByXY();
		objectData.push(square);
	}
});

document.querySelector('.change-object').addEventListener('click', () => {			//	Перемещение объектов
	objectData.forEach((object) => {
		object.updateObjectXY();
	});
});

document.querySelector('.move-object-around').addEventListener('click', () => {		//	Движение по окружности
	const centerX = +document.querySelector('.x').value;
	const centerY = +document.querySelector('.y').value;
	objectData.forEach((object) => {
		object.setObjectAround(centerX, centerY);
	});
});

document.querySelector('.stop-object-around').addEventListener('click', () => {		//	Остановка движения
	objectData.forEach((object) => {
		object.stopObjectAround();
	});
})