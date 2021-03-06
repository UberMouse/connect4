(function() {
	App.view = function(tableId, bannerId, playerNameId, pieceClickedCallback) {
		this.tableId = tableId;
		this.bannerId = bannerId;
		this.playerNameId = playerNameId;
		this.pieceClickedCallback = pieceClickedCallback;
	    this.setup();
	}

	App.view.prototype = {
	    setup: function () {
	    	self = this;
	        _(_.range(6)).each(function (i) {
	            var tds = "";
	            _(_.range(7)).each(function (j) {
	                tds += "<td id='" + i + "-" + j + "'></td>";
	            });

	            $(self.tableId).append($("<tr>" + tds + "</tr>"));
	        })
	        $(this.tableId).on("click", 'td', function() {
	        	self.pieceClickedCallback(self.getColumn($(this).index()))
	    	});
	    },

	    getColumn: function (index) {
	        elements = []
	        $(this.tableId + ' tr').each(function () {
	            elements.push($(this).children().eq(index))
	        })

	        return elements;
	    },

	    getSurroundingCells: function (cell) {
	        //coulum its in(index) need it row index cells parent
	        var row = cell.parent().index();
	        var column = cell.index();
	        var positions = [
	            [-1, 0],
	            [0, 1],
	            [0, -1],
	            [1, 0]
	        ];
	        var that = this;
	        console.log('-------')
	        return _(positions).chain().map(function (positionModifer) {
	        	var newRow = row + positionModifer[0]
	        	var newColumn = column + positionModifer[1]
	        	if((newRow > 7 || newRow < 0) || (newColumn > 7 || newColumn < 0))
	        		return null;
	            return that.getCell(newRow, newColumn)
	        }).compact().value();
	    },

	    getCell: function (row, column) {
	        return $(this.tableId + ' tr').eq(row).children().eq(column);
	    },

	    showWinner: function (player) {
	        $(this.playerNameId).text(player)
	        $(this.bannerId).show();
	    },


	    placePiece: function (player, cell) {
	        
	        cell.html('<img src="img/' + player + '.png" />')
	        	.attr('class', player);
	        this.animatePieceDrop(cell)
	        return cell;
	    },

	    animatePieceDrop: function (cell) {
		    cell.css("position", "relative")
		        .css("top", -800)
		        .animate({ top: "+=800" }, 800);
		}
	}
})();