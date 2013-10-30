Ember.Test.registerHelper('exists', function (app, selector, quantity) {
  if (quantity === undefined) { quantity = 1; }

  return wait()
    .find(selector)
    .then(function(el) {
      assertLength(el, quantity);
    });
});

Ember.Test.registerHelper('assertLength', function (app, el, quantity) {
  if (quantity === undefined) { quantity = 1; }

  equal(el.length, quantity, "should be " + quantity + " of " + el);
});

App.rootElement = "#ember-testing";
App.setupForTesting();
App.injectTestHelpers();

module("Integration tests", {
  setup: function() {
    App.reset();
  }
});

test("No feats by default", function() {
  visit("/character")
    .exists("#character-feats")
    .exists("#character-feats > li", 0)
});

test("Choosing race popupates feats list", function() {
  visit("/character")
    .fillIn("#select-race", "elf")
    .exists("ul#character-feats > li", 2);
});

test("Display welcome message on main page", function () {
  visit("/").exists("h1")
});

module("Unit Test");

test("Character's feats depends on race", function() {
  var character = App.Character.create();
  assertLength(character.get("feats"), 0)

  character.set("race", "elf");
  assertLength(character.get("feats"), 2)

  character.set("race", "dwarf");
  assertLength(character.get("feats"), 1)
});
