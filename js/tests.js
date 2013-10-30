App.rootElement = "#ember-testing";
App.setupForTesting();
App.injectTestHelpers();

module("Main page", {
  setup: function() {
    App.reset();
  }
});

test("Display welcome message on main page", function () {
  visit("/").find("h1").then(function(el) {
    equal(el.length, 1, "H1 tag must be present");
  });
});
