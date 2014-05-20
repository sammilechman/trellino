Trellino.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  className: 'list',

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'remove', this.removeCard);

    this.model.cards().each(this.addCard.bind(this));
  },

  events: {
    "mouseenter #panel-heading-id": "showTrashButton",
    "mouseleave #panel-heading-id": "hideTrashButton",
    "click .list-delete-btn": "handleListDeletion",
    "click .card-create-btn": "addCardView",
    "click .new-card-create": "addCard",
    "click .card-delete-btn": "removeCard",
    "mousedown .card-well": "sortableObject",
  },

  sortableObject: function(event) {
    var $object = $(event.currentTarget.parentElement);

    var s = $('#sortable')
    var origIDs = [];

    //origIDs is the rank numbers in order, before movement.
    _(s.children()).each(function(x) {
      origIDs.push(x.id.slice(5));
      debugger
    });

    //Get objets associated with these ranks? They're not IDs
    // var view = this;
    // var origCards = [];
    // _(origIDs).each(function(el) {
    //   origCards.push(view.model.fetch(el))
    //   debugger
    // });

    //Now for the actual movement
    $object.sortable({
      axis: 'y',
      update: function(event, ui) {
        var s = $('#sortable')

        var newData = [];
        var unfilteredArray = s.sortable('toArray');
        _(unfilteredArray).each(function(x) {
          newData.push(x.slice(5));
        });

        //We now have origData and newData to setup new ranking.
        var counter = 0;
        _(s.children()).each(function(x) {
          x.setAttribute("rank", newData[counter]);
          debugger
          x.save({}, {
            success: function(){
              console.log("SAVED");
            }
          });
          counter++;
        });

      }

    });
  },

  addCard: function (card) {
    var cardShow = new Trellino.Views.CardsShowView({
      model: card
    });
    this.addSubview('.cards', cardShow.render());
  },

  removeCard: function (card) {
    var subview = _.find(
      this.subviews(".cards"),
      function (subview) {
        return subview.model === card;
      }
    );

    this.removeSubview(".cards", subview);
  },

  showTrashButton: function () {
    this.$('.list-delete-btn').removeClass('hidden');
  },

  hideTrashButton: function () {
    this.$('.list-delete-btn').addClass('hidden');
  },

  addCardView: function (event) {
    event.preventDefault();
    var newCardForm = new Trellino.Views.CardForm({
      list: this.model
    });
    this.$('.cards').append(newCardForm.render().$el);
  },

  handleListDeletion: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  render: function () {
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
});