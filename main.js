const scores = document.querySelector('.scores'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.game-area'),
	car = document.createElement('div');
	
car.classList.add('car');


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);


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
}


function startGame() {
	start.classList.add('hide');
	settings.start = true;
	gameArea.appendChild(car)
	requestAnimationFrame(playGame);
}

function playGame() {
	console.log('play game!');
	if (settings.start) {
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