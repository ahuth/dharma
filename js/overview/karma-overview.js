/*jslint vars: true, browser: true */
/*global dharma */

dharma.overview = dharma.overview || {};

dharma.overview.karma = (function (name, Widget, core) {
	"use strict";
	
	var successTemplate = document.getElementById("karma-overview-template").innerHTML,
		failTemplate = document.getElementById("fail-template").innerHTML,
		destination = "content",
		myType = "overview",
		myWhat = "karma";
	
	// Me is the actual instance of our widget object.
	var me = new Widget(name, successTemplate, failTemplate, myType);
	
	// If we need to show the overview, request the data but don't handle the
	// response.  We'll take care of that later.
	core.subscribe("show-overview", function (group) {
		me.remove();
		core.publish("request-data", {type: myType, what: myWhat, group: group});
	});
	
	core.subscribe("show-breakdown", function (group, widget) {
		me.remove();
	});
	
	// Verify that data is for the request we made.  Then process it into a
	// format we can use.  We send back out this processed data so that we can
	// capture it as part of the browser history.
	core.subscribe("here's-data", function (response) {
		if (response.type !== myType || response.what !== myWhat) {
			return;
		}
		var data = {
			value: response.data.value,
			change: (response.data.change < 0 ?
					 response.data.change + "%" :
					 "+" + response.data.change + "%")
		};
		me.renderSuccess(destination, data);
		me.addEvent("click", function () {
			core.publish("widget-clicked", response.group, myWhat);
		});
	});
	
	// Verify that our request hasn't returned any data, and then render the
	// failure template.
	core.subscribe("no-data", function (args) {
		if (args.type !== myType || args.what !== myWhat) {
			return;
		}
		me.renderFail(destination);
	});
	
}("karma-overview", dharma.widget, dharma.core));