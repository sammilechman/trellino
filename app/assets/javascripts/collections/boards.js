Trellino.Collections.Boards = Backbone.Collection.extend({
	model: Trellino.Models.Board,
	
	url: "/api/boards",
	
	
});

Trellino.Collections.boards = new Trellino.Collections.Boards();