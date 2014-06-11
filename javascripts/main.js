$(document).ready(function() {
	function setup(){	
		 for(var i=0; i<6; i++){
		 	var tds = "";
		 	 for(var j=0; j < 7; j++){
		 	 	tds += "<td></td>";
		 	 }

		 	$('#board-table').append($("<tr>" + tds + "</tr>"));
		 }
	}

	setup();
});