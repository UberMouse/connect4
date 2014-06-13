(function() {
	var self;
	App.model = function(time) {
		this.currentplayer = "red";
		this.won = false;
		this.time = time || 10;
		this.interval;
		this.view;
		self = this;
	}

	App.model.prototype = {
		pieceClickedCallback: function(column) {
			if(self.won) return;

			emptyCell = self.getFirstEmptyCellInColumn(column)

			if(emptyCell === undefined) {
				alert('column is full');
				return;
			}

			self.doTimerStuff();

			cell = self.view.placePiece(self.currentplayer, emptyCell)
			self.currentplayer = (self.currentplayer === 'red') ? 'yellow' : 'red';
			self.checkWinner(cell);
		},

		doTimerStuff: function() {
			clearInterval(self.interval);
	        self.startTimer();
		},

		getFirstEmptyCellInColumn: function(column) {
			return _.chain(column.reverse()).filter(function(el) {
				return el.html() === '';
			}).first().value();
		},

		startTimer: function() {
			self.interval = window.setInterval(function() {
			if (self.time >= 0) {
				$('#timer').html("<p>You have: "+ self.time+" second remaining</p>");
				self.time--;
				} else {
					var answer = alert("You are out of time!!! Click ok to restart game");
					if (!answer) {
						window.location="index.html";
					}
				}
			}, 1000);
		},

		checkWinner: function(cell) {
			var player = cell.attr("class")
			function recurse(count, cell, visitedCells) {
				cell.addClass('visiting');

				visitedCells.push(cell.attr('id'));
				var surroundingCells = _(self.view.getSurroundingCells(cell)).filter(function (el) {
					if (el.attr('class') === player && !_(visitedCells).contains(el.attr('id')))
						return true;
					return false;
				});

				_(surroundingCells).each(function(el) {
					el.addClass('checked')
				});

				if(count == 1) return true;
				if(surroundingCells.length == 0) return false;
				for(var i = 0;i < surroundingCells.length;i++) {
					return recurse(--count, surroundingCells[i], visitedCells);
				}
			}	
			return recurse(7, cell, []);
		},

		setView: function(view) {
			self.view = view;
		}
	}
})();