Trellino.Models.Board = Backbone.Model.extend({
	urlRoot: "api/boards",
	
	parse: function(response) {
		if (response.lists) {
			var lists = response.lists;
			var that = this;
			
			_(lists).each(function(listData) {
				var list = new Trellino.Models.List(listData);	
				that.lists().add(list);
				list.parseCards();
			});
			
			delete response.lists;
		}
		
		return response;
	},
	
  lists: function () {
    if (!this._lists) {
      this._lists = new Trellino.Collections.Lists([], {
        board: this
      });
    }

    return this._lists;
  }
});