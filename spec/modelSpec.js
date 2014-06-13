describe("model", function() {
	describe("with default time", function() {
		beforeEach(function() { 
			 this.model = new App.model();
		});
		it("should set up a view", function(){
			var view = "board";
			this.model.setView(view);
			expect(this.model.view).toEqual(view);
		});
		it("gets first empty cell in column", function() {
			var jqueryCollection = $("#list");
			expect(this.model.getFirstEmptyCellInColumn(jqueryCollection)).toEqual("");
		});
	}); 
});