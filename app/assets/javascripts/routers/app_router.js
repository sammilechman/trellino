Trellino.Routers.AppRouter = Backbone.Router.extend({

	routes: {
		"boards": "boardsIndex",
	},
	
	boardsIndex: function() {
		Trellino.Collections.boards.fetch();
		var indexView = new Trellino.Views.BoardsIndex({
			collection: Trellino.Collections.boards
		});
		this._swapView(indexView);
	},
	
	_swapView: function(newView) {
		if (this.currentView) {
			this.currentView.remove();
		}
		$('body').html(newView.render().$el);
		this.currentView = newView;
	},

});