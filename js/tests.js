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

test("Display welcome message on main page", function () {
  visit("/").find("h1").then(function(el) {
    equal(el.length, 1, "H1 tag must be present");
  });
});
