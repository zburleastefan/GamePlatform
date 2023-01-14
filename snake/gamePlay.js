	const canvas = document.getElementById("gameBoard");
	const ctx = canvas.getContext("2d");

	const eatSound = new Audio("Assets/chewing-sound.wav");
	const gameOverSound = new Audio("Assets/game-over-sound.wav");

	const titleImage = new Image();
	titleImage.src = "Assets/snaketitle.png"
	const food = new Image();
  	food.src = "Assets/apple.png";
  	const head = new Image();
  	head.src = "Assets/head.png";
  	const tail = new Image();
  	tail.src = "Assets/tail.png";

	let gameSpeed = 5;
	let tileCount = 20;

	let snakeHeadXpoz = 10;
	let snakeHeadYpoz = 10;

	let foodXpoz = 5;
	let foodYpoz = 5;

	let xDirection = 0; 
	let yDirection = 0;

	class SnakeTailPiece {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
	}

	const snakeTailPieces = [];
	let snakeTailLength = 2;
	let score = 0;

	function mainGameLoop() {
		let gameRezult = isGameOver();
		if (gameRezult) {
			ctx.fillStyle = "red";
			ctx.font = "30px Verdana";
			ctx.fillText("GAME  OVER!", canvas.width / 4, canvas.height / 2);
			gameOverSound.play();
			document.getElementById("resetButton").removeAttribute("hidden");
			document.getElementById("backToGamePlatform").removeAttribute("hidden");
			return 0;
		} else {
			clearGameBoard();
		}
		drawSnake();
		drawFood();
		snakeMovement();
		drawTitleBoard();
		setTimeout(mainGameLoop, 1000 / gameSpeed);
	}

	function isGameOver() {
		// check wall collision
		if (snakeHeadXpoz < 0) {						// left wall
			return true;
		} else if (snakeHeadXpoz > tileCount - 1) {		// right wall
			return true;
		} else if (snakeHeadYpoz < 2.5) {				// top wall
			return true;
		} else if (snakeHeadYpoz > tileCount + 2) {		// bottom wall
			return true;
		} 

		// check tail collision
		for (let i = 0; i < snakeTailPieces.length; ++i) {
			if (snakeTailPieces[i].x == snakeHeadXpoz && snakeTailPieces[i].y == snakeHeadYpoz) {
				return true;
			}
		}
		return false;
	}

	function clearGameBoard() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function drawSnake() {
		// draw snake's head
		ctx.drawImage(head, snakeHeadXpoz * tileCount, snakeHeadYpoz * tileCount);
  
		if (yDirection != 0 || xDirection != 0) {
			// draw snake's tail
			for (let i = 0; i < snakeTailPieces.length; ++i) {
				ctx.drawImage(tail, snakeTailPieces[i].x * tileCount, snakeTailPieces[i].y * tileCount);
			}

			snakeTailPieces.push(new SnakeTailPiece(snakeHeadXpoz, snakeHeadYpoz));	// add tail pieces
			if (snakeTailPieces.length > snakeTailLength) {
				snakeTailPieces.shift();	// remove first piece of snake's tail
			}
		}
	}

	function snakeMovement() {
		snakeHeadXpoz += xDirection;
		snakeHeadYpoz += yDirection;
	}

	function drawFood() {
		let randomPozX = Math.floor(Math.random() * (tileCount - 0) + 0);
		let randomPozY = Math.floor(Math.random() * ((tileCount + 3) - 3) + 3);
		if (snakeHeadXpoz == foodXpoz && snakeHeadYpoz == foodYpoz) {	// check if snake eats the food
			foodXpoz = randomPozX;
			foodYpoz = randomPozY;
			++snakeTailLength;
			++score;
			if (score > 9 && score % 5 == 0) {
				++gameSpeed;
			}
			eatSound.play();
		}

		for (let i = 0; i < snakeTailPieces.length; ++i) {	// check if food overlap snake's tail
			if (snakeTailPieces[i].x == foodXpoz && snakeTailPieces[i].y == foodYpoz) {
				foodXpoz = randomPozX;
				foodYpoz = randomPozY;
			} 
		}
		ctx.drawImage(food, foodXpoz * tileCount, foodYpoz * tileCount);
	}

	function drawTitleBoard() {
		ctx.drawImage(titleImage, 0, 0);
		ctx.fillStyle = "black";
		ctx.font = "14px Showcard Gothic";
		ctx.fillText("Speed:", canvas.width - 65, 30);
		ctx.fillText(gameSpeed/5 + "X", canvas.width - 50, 48);
		ctx.fillText("Score:", canvas.width - 380, 30);
		ctx.fillText(score * 10 + " points", canvas.width - 380, 48);
	}

	document.body.addEventListener("keydown", keyListener);

	function keyListener(event) {
  		if (event.isComposing || event.keyCode === 229) {
   			return 0;
  		}
  		if (xDirection == 0 && yDirection == 0 && event.keyCode != 38) {
  			ctx.fillStyle = "white";
			ctx.font = "30px Verdana";
			ctx.fillText("Press UP to Start", canvas.width / 5.5, canvas.height / 2);
  		}

  		if (event.keyCode == 37 && (xDirection != 0 || yDirection != 0)) { 	// left
  			if (xDirection == 1) {
  				return 0;
  			}
  			yDirection = 0;
  			xDirection = -1;
  		} 	
  		if (event.keyCode == 38) { 	// up
  			if (yDirection == 1) {	// if snake is going up he cannot go down
  				return 0;
  			}
  			yDirection = -1;
  			xDirection = 0;
  		} 
  		if (event.keyCode == 39 && (xDirection != 0 || yDirection != 0)) { 	// right
  			if (xDirection == -1) {
  				return 0;
  			}
  			yDirection = 0;
  			xDirection = 1;
  		}  
  		if (event.keyCode == 40 && (xDirection != 0 || yDirection != 0)) { 	// down
  			if (yDirection == -1) {
  				return 0;
  			}
  			yDirection = 1;
  			xDirection = 0;
  		}
	}

	mainGameLoop();