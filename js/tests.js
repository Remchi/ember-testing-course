App.rootElement = "#ember-testing";
App.setupForTesting();
App.injectTestHelpers();

module("Integration tests", {
  setup: function() {
    App.reset();
  }
});

test("No feats by default", function() {
  visit("/character").then(function() {
    equal(find("ul#character-feats").length, 1, "there should be feats list");
    equal(find("ul#character-feats > li").length, 0, "there should be no feats by default");
  });
});

test("Choosing race popupates feats list", function() {
  visit("/character")
    .fillIn("#select-race", "elf")
    .then(function() {
      equal(find("ul#character-feats > li").length, 2, "should have two feats");
    });
});

test("Display welcome message on main page", function () {
  visit("/").find("h1").then(function(el) {
    equal(el.length, 1, "H1 tag must be present");
  });
});

module("Unit Test");

test("Character's feats depends on race", function() {
  var character = App.Character.create();
  equal(character.get("feats").length, 0, "no race - no feats");

  character.set("race", "elf");
  equal(character.get("feats").length, 2, "elf's got two feats");

  character.set("race", "dwarf");
  equal(character.get("feats").length, 1, "dwarf's got one feat");
});
