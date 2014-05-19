Trellino.Collections.Cards = Backbone.Collection.extend({
	model: Trellino.Models.Card,

	initialize: function(options) {
		this.list = options.list;
    this.listenTo(this, "add", this.secretSort)
	},

	comparator: function(card) {
		return card.get("rank");
	},

  secretSort: function() {
    console.log("sorting");
  },

});