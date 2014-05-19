Trellino.Views.BoardsIndex = Backbone.View.extend({
	template: JST["boards/index"],
	
	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},
	
	events: {
		"click .refresh": "refresh"
	},
	
	render: function() {
		console.log("Rendering boards index");
		var renderedContent = this.template({
			boards: this.collection,
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	refresh: function() {
		this.collection.fetch();
	}
});