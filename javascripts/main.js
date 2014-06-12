$(document).ready(function() {
	function setup(){	
		 _(_.range(6)).each(function(i) {
		 	var tds = "";
		 	 _(_.range(7)).each(function(j) {
		 	 	tds += "<td id='"+i+"-"+j+"'></td>";
		 	 });

		 	$('#board-table').append($("<tr>" + tds + "</tr>"));	
		 })
		 $('#board-table').on("click", 'td', pieceClicked);
	}

	setup();

	var currentplayer = "red";
	var won = false;

	function getColumn(index) {
		elements = []
		$('#board-table tr').each(function() {
			elements.push($(this).children().eq(index))
		})

		return elements;
	}

	function pieceClicked() {
		if(won) return;
		column = getColumn($(this).index());
		emptyCell = _.chain(column.reverse()).filter(function(el) {
			return el.html() === '';
		}).first().value();

		if(emptyCell === undefined) {
			alert('column is full');
			return;
		}

		cell = placePieces(currentplayer, emptyCell)
		currentplayer = (currentplayer === 'red') ? 'yellow' : 'red';
		check_winner(cell);
	}

	function getSurroundingCells(cell) {
		//column its in(index) need it row index cells parent
		var row = cell.parent().index();
		var column = cell.index();
		var positions = [[-1, 0], [0, 1], [0, -1], [1, 0]];
		return _(positions).map(function(thing) {
			return getCell(row+thing[0],column+thing[1])
		});
	}	

	function getCell(row, column)
	{
		return $('#board-table tr').eq(row).children().eq(column);
	}

	function check_winner(cell) {
		var player = cell.attr("class")
		function recurse(count, cell, visitedCells) {
			console.info(cell.html());
			visitedCells.push(cell.attr('id'));
			var surroundingCells = _(getSurroundingCells(cell)).filter(function (el) {
				if (el.attr('class') === player && !_(visitedCells).contains(el.attr('id')))
					return true;
				return false;
			});

			if(count == 1) return true;
			if(surroundingCells.length == 0) return false;
			for(var i = 0;i < surroundingCells.length;i++) {
				return recurse(--count, surroundingCells[i], visitedCells);
			}
		}	

		return recurse(7, cell, []);
	}

	function placePieces(player, cell) {
		cell.html('<img src="img/'+player+'.png" />');
		cell.attr('class', player);
		return cell;
	}
});