$(document).ready(function() {
	function setup(){	
		 for(var i=0; i<6; i++){
		 	var tds = "";
		 	 for(var j=0; j < 7; j++){
		 	 	tds += "<td></td>";
		 	 }

		 	$('#board-table').append($("<tr>" + tds + "</tr>"));
		 }
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
		emptyCell = -1;
		for(var i = column.length-1;i >= 0;i--) {
			if(column[i].html() === '') {
				emptyCell = column[i];
				break;
			}
		}

		if(emptyCell === -1) {
			alert('column is full');
			return;
		}

		placePieces(currentplayer, emptyCell)
		currentplayer = (currentplayer === 'red') ? 'yellow' : 'red';
		check_winner();
	}

	function check_winner() {
		check_vertical();
		check_horizontal();	
	}

	function check_vertical() {
		var currentInARow = 0;
		var previous = '';
		var current = ''
		var column;
		for(var i = 0;i < 7;i++) {
			column = getColumn(i);
			for(var j = 0;j < column.length;j++) {
				if(column[j].html() === '') continue;

				current = $(column[j]).attr('class');
				if(previous === '') {
					previous = current
					currentInARow = 1;
					continue;
				}
				if(previous !== current) {
					previous = current;
					currentInARow = 1;
					continue;
				}
				else {
					currentInARow++;
				}
				if(currentInARow == 4) {
					alert(current + ' won!');
					won = true;
				}

			}
			previous = ''
		}
	}

	function check_horizontal() {}


	function placePieces(player, cell) {
		cell.html('<img src="img/'+player+'.png" class=".'+player+'-piece"/>')
	}
});