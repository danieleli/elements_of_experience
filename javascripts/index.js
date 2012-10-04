require(["jquery", "underscore", "experience", "parse"], function ($, under, experience, parse) {

    window.Parse.initialize("cYpqUUwP6PxhXFYD2EhqZ2dYgWHlglID3FKLc7KM", "XGEAjmlWWjY5KyirhJqgh08OVsJkjTjLXPL8vkoi");

	var Element = window.Parse.Object.extend("Element");

	var data_provider = {
		set_view_model: function (data) {
			var elementContainer = $("#node-container");
			var vm = new experience.ViewModel();
			vm.initialize(data, elementContainer);
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