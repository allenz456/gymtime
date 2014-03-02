// An example Parse.js Backbone application based on the todo app by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses Parse to persist
// the todo items and provide user authentication and sessions.

$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("NPAZBONQNApt7KpEfSfZPdtiCNIIyxnh3s4tIOv9",
                   "FdCQGOseoMqfVtxgshI2Ow9tEHxW1bIPme7g5Cpk");

  // Class Model
  // ----------

  var Class = Parse.Object.extend("Class", {
    // Default attributes.
    defaults: {
      name: "",
      location: "",
    },

    // Initialize
    initialize: function() {
      if (!this.get("content")) {
        this.set({"name": this.defaults.name});
        this.set({"location": this.defaults.location});
      }
    }
  });

  // This is the transient application state, not persisted on Parse
  var AppState = Parse.Object.extend("AppState", {
    defaults: {
      filter: "all"
    }
  });

  // Classes Collection
  // ---------------

  var ClassList = Parse.Collection.extend({

    // Reference to this collection's model.
    model: Class
  });



  var WelcomeView = Parse.View.extend({
    el: ".content",
    
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(_.template($("#welcome-template").html()));
    },
  });

  var ClassesView = Parse.View.extend({
    el: ".content",

    initialize: function () {
      this.render();
    },
    
    render: function () {
      this.$el.html(_.template($("#classes-template").html()));
    }
  });

  var MachinesView = Parse.View.extend({
    el: ".content",

    initialize: function () {
      this.render();
    },
    
    render: function () {
      this.$el.html(_.template($("#machines-template").html()));
    }
  });

  var CourtsView = Parse.View.extend({
    el: ".content",

    initialize: function () {
      this.render();
    },
    
    render: function () {
      this.$el.html(_.template($("#courts-template").html()));
    }
  });

  // The main view for the app
  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#gymtimeapp"),

    initialize: function() {
      this.render();
    },

    render: function() {
    },
  });

  var AppRouter = Parse.Router.extend({
    routes: {
      "": "welcome",
      "machines": "machines",
      "courts": "courts",
      "classes": "classes"
    },

    welcome: function () {
      new WelcomeView();
      delete this;
    },
    machines: function () {
      new MachinesView();
      delete this;
    },
    courts: function () {
      new CourtsView();
      delete this;
    },
    classes: function () {
      new ClassesView();
      delete this;
    }
  });


  appRouter = new AppRouter();
  var state = new AppState;
  appView = new AppView;
  Parse.history.start();
});
