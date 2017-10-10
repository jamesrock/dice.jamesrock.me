(function() {

	var
	Dice = ROCK.Object.extend({
		constructor: function Dice() {

			this.min = 1;
			this.max = 6;

		},
		roll: function() {

			var
			dice = this,
			timeout,
			count = 0,
			time = 0,
			outcome,
			newOutcome,
			startTimeout = function() {

				clearTimeout(timeout);

				timeout = setTimeout(function() {

					newOutcome = ROCK.MATH.random(dice.min, dice.max);

					while(newOutcome===outcome) {

						console.log('dupe');

						newOutcome = ROCK.MATH.random(dice.min, dice.max);

					};

					outcome = newOutcome;

					outcomeNode.setAttribute("data-number", outcome);

					time = (time + 10);

					if(count<30) {

						startTimeout();

					};

					count ++;

				}, time);

			};

			startTimeout();

			return this;

		}
	}),
	outcomeNode = ROCK.DOM.getNode("outcome"),
	dice = new Dice();

	outcomeNode.addEventListener("click", function(e) {

		dice.roll();

		e.preventDefault();

	});

})();
