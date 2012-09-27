/// <reference path="/scripts/parse-1.0.12.js" />
/// <reference path="/scripts/underscore.js" />

require.config({
	baseUrl  : "javascripts",
	paths    : {
		"jquery"     : "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
		"underscore" : "underscore.min",
		"knockout"   : "knockout-2.1.0",
		"isotope"    : "jquery.isotope.min",
		"bootstrap"  : "bootstrap",
		"parse"      : "parse-1.0.12"
	},
	priority : ['jquery']
});

require(["jquery"], function ($) {
	$(function () {
		$('#debug').append("<div>jquery -done</div>");
	});

	window.require(['bootstrap'], function () {
		$('#debug').append("<div>bootstap-done</div>");
	});
});


