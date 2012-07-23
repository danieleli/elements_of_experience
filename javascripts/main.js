/// <reference path="/scripts/parse-1.0.12.js" />
/// <reference path="/scripts/underscore.js" />

require.config({
  baseUrl: "javascripts",
  paths: {
    "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    "bootstrap": "http://twitter.github.com/bootstrap/assets/js/bootstrap",
    "underscore": "underscore.min",
    "knockout": "http://cloud.github.com/downloads/SteveSanderson/knockout/knockout-2.1.0",
    "isotope": "jquery.isotope.min",
    "parse": "parse-1.0.12"
  },
  priority: ['jquery']
});

require(["jquery"], function ($) {
  $(function () {
    $('#debug').append("<div>jquery -done</div>");
  });

  window.require(['bootstrap'], function () {
    $('#debug').append("<div>bootstap-done</div>");
  });
});


require(["jquery", "underscore", "experience", "parse"], function ($, under, experience, parse) {

  window.Parse.initialize("cYpqUUwP6PxhXFYD2EhqZ2dYgWHlglID3FKLc7KM", "XGEAjmlWWjY5KyirhJqgh08OVsJkjTjLXPL8vkoi");
  var Element = window.Parse.Object.extend("Element");
  
  var data_provider = {
    set_view_model: function (data) {
      var elementContainer = $("#node-container");
      var vm = new experience.ViewModel();
      vm.initialize(data, elementContainer);
    },
    save: function (item) {
      //var element = new Element({ name: 'web communication foundation', symbol: 'wcf', category: 'library', experience: 1 });
      //element.save(null, {
      //  success: function(elmt) {
      //    alert("success: " + JSON.stringify(element));
      //  },
      //  error: function (elmt, error) {
      //    alert("error: " + error);
      //  }
      //});
    }
  };

  $(function () {
    
    var query = new window.Parse.Query(Element);
    query.find({
      success: function (parse_data) {
        var raw_data = _.pluck(parse_data, 'attributes');
        data_provider.set_view_model(raw_data);
      },
      error: function (data, error) {
        alert("error: " + error);
      }
    });



  });
});