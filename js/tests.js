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

var server;

module("Ajax tests", {
  setup: function() {
    App.reset();
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  },
  teardown: function() {
    server.restore();
  }
});

test("Display error message when server responds with error", function() {
  server.respondWith("post", "/characters", [
    401, {}, "Something went wrong"]);

  visit("/character")
    .fillIn("#select-race", "elf")
    .click("#save-btn")
    .find("#error-message")
    .then(function(el) {
      equal(el.text(), "Something went wrong", "must display the error message");
    });
});

test("Sending ajax request to server on saving", function() {
  json = {
    race: 'elf',
    feats: [ "Slender", "Night Vision" ]
  };
  server.respondWith("post", "/characters")
  visit("/character")
    .fillIn("#select-race", "elf")
    .click("#save-btn")
    .then(function() {
      equal(server.requests.length, 1, "");
      equal(server.requests[0].url, "/characters", "");
      equal(server.requests[0].requestBody, Ember.$.param(json), "");
    });
});


module("Integration tests", {
  setup: function() {
    App.reset();
  }
});

test("Save button behaviour", function() {
  visit("/character")
    .exists("#save-btn", 0)
    .fillIn("#select-race", "elf")
    .exists("#save-btn");
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

test("Controller computed property test", function() {
  controller = App.__container__.lookup("controller:character")
  model = App.Character.create();
  controller.set("model", model);

  equal(controller.get("hasFeats"), false, "no feats by default");
  model.set("race", "elf");
  equal(controller.get("hasFeats"), true, "feats for elf");
});

test("Character's feats depends on race", function() {
  var character = App.Character.create();
  assertLength(character.get("feats"), 0)

  character.set("race", "elf");
  assertLength(character.get("feats"), 2)

  character.set("race", "dwarf");
  assertLength(character.get("feats"), 1)
  equal(character.get("feats").length, 1, "dwarf's got one feat");
});
