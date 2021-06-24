"use strict";

const scores = document.querySelector('.scores'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.game-area'),
	car = document.createElement('div'),
	easyLevel = document.querySelector('.easy-level'),
	hardLevel = document.querySelector('.hard-level'),
	veryHardLevel = document.querySelector('.very-hard-level');


const MAX_ENEMY = 5;


const music = new Audio('./music/01. DEUTSCHLAND.mp3')	;



car.classList.add('car');



const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false,
}

const settings = {
	start: false,
	scores: 0,
	speed: 3,
	traffic: 3,
}

const getRandomEnemy = (max) => Math.floor((Math.random() * max) + 1); 


function choodeLevel() {
	easyLevel.classList.remove('hide');
	hardLevel.classList.remove('hide');
	veryHardLevel.classList.remove('hide');
}


function playEasy() {
	settings.traffic = 3;
	startGame();
}

function playHard() {
	settings.traffic = 2;
	startGame();
}

function playVeryHard() {
	settings.traffic = 1;
	startGame();
}


function getQuantityElements(elementHeight) {
	return document.documentElement.clientHeight / elementHeight + 1;
}


function startGame() {

	start.classList.add('hide');

	easyLevel.classList.add('hide');
	hardLevel.classList.add('hide');
	veryHardLevel.classList.add('hide');

	gameArea.innerHTML = '';


	music.play();


	for (let i = 0; i < getQuantityElements(100); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * 100) + 'px';
		line.y = i * 100;
		gameArea.appendChild(line)
	}

	for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
		const enemy = document.createElement('div');
		enemy.classList.add('enemy');
		enemy.y = -100 * settings.traffic * i + 1;
		enemy.style.background = `transparent url(./images/enemy${getRandomEnemy(MAX_ENEMY)}.png) center / cover no-repeat`;
		enemy.style.top = enemy.y + 'px';
		enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		gameArea.appendChild(enemy);
	}

	settings.scores = 0;
	settings.start = true;
	gameArea.appendChild(car)
	car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2 + 'px';
	car.style.bottom = '10px';
	car.style.top = 'auto';

	settings.x = car.offsetLeft;
	settings.y = car.offsetTop;

	requestAnimationFrame(playGame);
}

function playGame() {

	if (settings.start) {
		moveRoad();
		moveEnemy();
		settings.scores += settings.speed;
		scores.innerHTML = 'SCORES<br>' + settings.scores;

		if (keys.ArrowLeft && settings.x > 0) {
			settings.x -= settings.speed;
		}

		if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
			settings.x += settings.speed;
		}

		if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
			settings.y += settings.speed;
		}
		
		if (keys.ArrowUp && settings.y > 0) {
			settings.y -= settings.speed;
		}


		car.style.left = settings.x + 'px';
		car.style.top = settings.y + 'px';

		requestAnimationFrame(playGame);
	}
}

function startRun(event) {
	event.preventDefault();
	keys[event.key] = true;
}

function stopRun(event) {
	event.preventDefault();
	keys[event.key] = false;
}

function moveRoad() {
	let lines = document.querySelectorAll('.line');
	lines.forEach((line) => {
		line.y += settings.speed;
		line.style.top = line.y + 'px';

		if (line.y > document.documentElement.clientHeight) {
			line.y = -100;
		}

	})
}

function moveEnemy() {
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach((item) => {

		let carRect = car.getBoundingClientRect();
		let enemyRect = item.getBoundingClientRect();

		if (carRect.top <= enemyRect.bottom &&
			carRect.right >= enemyRect.left &&
			carRect.left <= enemyRect.right &&
			carRect.bottom >= enemyRect.top) {

			settings.start = false;
			console.warn('дтп');
			start.classList.remove('hide');
			scores.style.top = start.offsetHeight;
			start.style.top = '75px';

		}

		item.y += settings.speed / 2;
		item.style.top = item.y + 'px';

		if (item.y >= document.documentElement.clientHeight) {
			item.y = -100 * settings.traffic;
			item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		}

	})

}



easyLevel.addEventListener("click", playEasy);
hardLevel.addEventListener("click", playHard);
veryHardLevel.addEventListener("click", playVeryHard);

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);