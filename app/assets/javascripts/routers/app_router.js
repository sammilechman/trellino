Trellino.Routers.AppRouter = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
		this.boards = options.boards;
	},

	routes: {
		"": "boardsIndex",
		"boards/new": "boardNew",
		"boards/:id": "boardShow",
	},

	boardsIndex: function() {
		this.boards.fetch();
		var indexView = new Trellino.Views.BoardsIndex({
			collection: this.boards
		});
		this._swapView(indexView);
	},

	boardNew: function() {
		var newView = new Trellino.Views.BoardNew();
		this._swapView(newView);
	},

	boardShow: function(id) {
		var board = Trellino.Collections.boards.getOrFetch(id);
		var showView = new Trellino.Views.BoardShow({
			model: board
		})
		this._swapView(showView);
	},

	_swapView: function(newView) {
		if (this.currentView) {
			this.currentView.remove();
		}
		this.currentView = newView;
		this.$rootEl.html(newView.render().$el);
	},

});