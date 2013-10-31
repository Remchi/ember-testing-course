
document.write('<div id="ember-container"><div id="ember-testing"></div></div>')
Ember.Test.adapter = Ember.Test.MochaAdapter.create()

App.rootElement = "#ember-testing"
App.setupForTesting()
App.injectTestHelpers()

describe "Main page", ->
  it "should have a welcome message", ->
    App.reset()
    visit("/").then ->
      find("h1").text().should.equal("Welcome to Ember.js")
