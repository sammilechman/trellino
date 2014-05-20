Trellino.Views.CardsShowView = Backbone.View.extend({
  template: JST["cards/show"],

  className: "card-well ui-sortable",

  events: {
    "click .card-delete-btn": "handleCardDeletion",
    "mouseover": "showDelete",
    "mouseleave": "hideDelete",
  },

  handleCardDeletion: function (event) {
    this.model.destroy();
  },

  render: function () {
    console.log("rendering Card");
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.attr('id', "rank_" + this.model.get("rank"));
    this.$el.html(renderedContent);
    return this;
  },

  showDelete: function() {
    this.$('#card-delete-button').removeClass('hidden');
  },

  hideDelete: function() {
    this.$('#card-delete-button').addClass('hidden');
  }


});