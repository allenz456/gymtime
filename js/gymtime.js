// An example Parse.js Backbone application based on the todo app by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses Parse to persist
// the todo items and provide user authentication and sessions.

$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  // Parse.initialize("NPAZBONQNApt7KpEfSfZPdtiCNIIyxnh3s4tIOv9",
  //                  "FdCQGOseoMqfVtxgshI2Ow9tEHxW1bIPme7g5Cpk");
Parse.initialize("7Vgwgh4wBMx90OpRucq3YDvXs4fWjRMZZeCZOMHK", "MekJdMPnciLVkLdWdkUKPhkFPVK3t88oVWsSFuAd");


  // Class Model
  // ----------

  var Class = Parse.Object.extend("Class", {
    // Default attributes.
    defaults: {
      name: "None",
      type: "None",
      dateTime: "None"
    },

    // Initialize
    initialize: function() {
      if (!this.get("content")) {
        this.set({"name": this.defaults.name});
        this.set({"type": this.defaults.type});
        this.set({"dateTime": this.defaults.dateTime});
      }
    }
  });

  var Schedule = Parse.Object.extend("Schedule", {
    // Default attributes.
    defaults: {
      day: "None",
      Class: "",
    },

    // Initialize
    initialize: function() {
      if (!this.get("content")) {
        this.set({"day": this.defaults.day});
        this.set({"Class": this.defaults.Class});
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

  var scheduleList = Parse.Collection.extend({

    // Reference to this collection's model.
    model: Schedule
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
    template: _.template($("#classes-template").html()),
    initialize: function () {
      var self = this;
      this.test = new scheduleList();
      this.test.fetch({
        success: function(test) {
          this.test = test;
          test.each(function(object) {
            console.log(object.get("Class"));
          });
          self.render();
        },
        error: function(test, error) {
          console.log("could not retrieve collecitons");
        }
      });
      
    },
    
    render: function () {
      console.log(this.test);
      this.$el.html(this.template({test: this.test.toJSON() }));
      return this;
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