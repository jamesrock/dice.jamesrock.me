(function() {

	var
	Dice = ROCK.Object.extend({
		constructor: function Dice() {

			this.min = 1;
			this.max = 6;

		},
		roll: function() {

			return ROCK.MATH.random(this.min, this.max);

		}
	}),
	players = [
		"mummy",
		"daddy",
		"harris",
		"arran"
	],
	player = 0,
	addPlayerButton = ROCK.DOM.getNode("addPlayer"),
	clearPlayersButton = ROCK.DOM.getNode("clearPlayers"),
	rollButton = ROCK.DOM.getNode("roll"),
	outcomeNode = ROCK.DOM.getNode("outcome"),
	nameNode = ROCK.DOM.getNode("name"),
	playerListNode = ROCK.DOM.getNode("playerList"),
	dice = new Dice();

	addPlayerButton.addEventListener("click", function(e) {

		var
		name = prompt("player name");

		if(name) {

			players.push(name);

			playerListNode.innerHTML = players.join("<br/>");

		};

		player = 0;

		// console.log(players);

	});

	clearPlayersButton.addEventListener("click", function() {

		players = [];

		playerListNode.innerHTML = players.join("<br/>");

		// console.log(players);

	});

	outcomeNode.addEventListener("touchstart", function(e) {

		outcomeNode.innerHTML = "";

		e.preventDefault();

	});

	outcomeNode.addEventListener("touchend", function(e) {

		var
		outcome = dice.roll();

		outcomeNode.innerHTML = outcome;
		nameNode.innerHTML = players[player];

		if(outcome===6) {
			return;
		};

		if(player<(players.length-1)) {
			player ++;
		}
		else {
			player = 0;
		};

		e.preventDefault();

	});

	playerListNode.innerHTML = players.join("<br/>");

})();
