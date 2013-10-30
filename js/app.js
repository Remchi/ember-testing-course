App = Ember.Application.create();

App.Router.map(function() {
  this.route("character");
});

App.CharacterRoute = Ember.Route.extend({
  model: function() {
    return App.Character.create();
  }
});

App.CharacterController = Ember.ObjectController.extend({
  races: [ "", "elf", "dwarf" ],

  hasFeats: function() {
    return Boolean(this.get("feats").length);
  }.property('model.feats')
});

App.Character = Ember.Object.extend({
  race: "",

  feats: function() {
    if (this.get("race") === "elf") {
      return [ "Slender", "Night Vision" ];
    } else if (this.get("race") === "dwarf") {
      return [ "Brawny" ];
    }
    return [];
  }.property("race")
});

