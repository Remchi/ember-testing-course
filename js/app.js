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

  actions: {
    save: function() {
      this.get("model").save();
    }
  },

  hasFeats: function() {
    return Boolean(this.get("feats").length);
  }.property('model.feats')
});

App.Character = Ember.Object.extend({
  race: "",

  save: function() {
    return Ember.$.post("/characters", this.serialize());
  },

  serialize: function() {
    return {
      race: this.get('race'),
      feats: this.get('feats')
    }
  },

  feats: function() {
    if (this.get("race") === "elf") {
      return [ "Slender", "Night Vision" ];
    } else if (this.get("race") === "dwarf") {
      return [ "Brawny" ];
    }
    return [];
  }.property("race")
});

