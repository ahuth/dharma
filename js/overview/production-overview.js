/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

dharma.overview = dharma.overview || {};

dharma.overview.production = (function (name, Widget, core) {
	"use strict";
	
	var successTemplate = document.getElementById("production-overview-template").innerHTML,
		failTemplate = document.getElementById("fail-template").innerHTML,
		destination = "content",
		myType = "overview",
		myWhat = "production";
	
	// Me is the actual instance of our widget object.
	var me = new Widget(name, successTemplate, failTemplate, myType);
	
	// formatResults takes our data response and formats the numbers as money.
	function formatResults(obj) {
		var item, output = {};
		output.results = [];
		for (item = 0; item < obj.length; item++) {
			output.results.push({
				milestone: me.formatString(obj[item].milestone),
				result: me.formatMoney(obj[item].result)
			});
		}
		return output;
	}
	
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
		// Most 'groups' return data.  A few don't, because they don't have any
		// milestones associated with them.  If this is the case, create a blank
		// data object so that formatResults() doesn't choke on it.
		response.data = response.data || {results: {}};
		var data = formatResults(response.data.results);
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
	
}("production-overview", dharma.widget, dharma.core));