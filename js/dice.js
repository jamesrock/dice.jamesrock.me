(function() {

	var
	icons = [
		'&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;'
	],
	Dice = ROCK.Object.extend({
		constructor: function Dice(id, callback) {

			this.min = 1;
			this.max = 6;
			this.node = ROCK.DOM.getNode(id);
			this.value = 0;
			this.callback = callback;
			this.rolling = false;

		},
		roll: function() {

			// console.log('roll');

			var
			dice = this,
			timeout,
			count = 0,
			time = 0,
			outcome,
			newOutcome,
			node = dice.node,
			startTimeout = function() {

				clearTimeout(timeout);

				timeout = setTimeout(function() {

					newOutcome = ROCK.MATH.random(dice.min, dice.max);

					while(newOutcome===outcome) {

						// console.log('dupe');
						newOutcome = ROCK.MATH.random(dice.min, dice.max);

					};

					dice.value = outcome = newOutcome;

					node.innerHTML = icons[outcome-1];

					time = (time + 5);
					// console.log(time);

					if(count<32) {

						dice.rolling = true;
						startTimeout();

					}
					else {

						// console.log('value', dice.value);
						dice.rolling = false;
						dice.callback(dice.value);

					};

					count ++;

				}, time);

			};

			startTimeout();

			return this;

		}
	}),
	rolled = function(value) {

		// console.log(`outcome: ${value}`);

		if(dice1.rolling||dice2.rolling) {

			// console.log('still rolling!');
			return;

		};

		if(dice1.value===dice2.value) {

			console.log('match!');

			setTimeout(function() {

				nextPlayer();

			}, 500);

		}
		else {

			runners[player] += (dice1.value + dice2.value);

			if(player===1) {

				setTimeout(function() {

					if(ROCK.MATH.random(1, 6)===6) {

						nextPlayer(true);

					}
					else {

						dice1.roll();
						dice2.roll();

					};

				}, 1000);

			};

		};

		logScore();

	},
	dice1 = new Dice('d1', rolled),
	dice2 = new Dice('d2', rolled),
	tableNode = document.getElementById('table'),
	rollBtn = document.getElementById('roll'),
	passBtn = document.getElementById('pass'),
	scoreBoard = document.getElementById('scores'),
	playerScoreBoard = document.getElementById('playerScore'),
	oppoScoreBoard = document.getElementById('oppoScore'),
	player = 0,
	players = [0, 0],
	runners = [0, 0],
	nextPlayer = function(saveScore) {

		if(saveScore) {
			console.log('pass!');
			players[player] += runners[player];
		};

		runners[player] = 0;
		player = (player === 0 ? 1 : 0);
		tableNode.setAttribute('data-player', player);
		logScore();

		if(player===1) {

			passBtn.setAttribute('disabled', 'disabled');

			setTimeout(function() {

				dice1.roll();
				dice2.roll();

			}, 1000);

		}
		else {

			passBtn.removeAttribute('disabled');

		};

	},
	logScore = function() {

		// console.log(`player: ${player}`);
		var score = `${players[0]} / ${players[1]} (${runners[player]})`;
		// scoreBoard.innerHTML = score;
		playerScoreBoard.innerHTML = `${players[0]} (${runners[0]})`;
		oppoScoreBoard.innerHTML = `${players[1]} (${runners[1]})`;
		console.log(score);

	};

	logScore();

	// console.log(dice1);
	// console.log(dice2);

	rollBtn.addEventListener('click', function(e) {

		if(!dice1.rolling&&!dice2.rolling) {
			dice1.roll();
			dice2.roll();
		};

		e.preventDefault();

	});

	passBtn.addEventListener('click', function(e) {

		nextPlayer(true);
		e.preventDefault();

	});

})();
