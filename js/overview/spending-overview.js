/*jslint vars: true, browser: true */
/*global dharma */

dharma.overview = dharma.overview || {};

dharma.overview.spending = (function (name, Widget, core) {
	"use strict";
	
	var successTemplate = document.getElementById("spending-overview-template").innerHTML,
		failTemplate = document.getElementById("fail-template").innerHTML,
		destination = "content",
		myType = "overview",
		myWhat = "spending";
	
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
			yesterday: me.formatMoney(response.data.yesterday, 2),
			people: me.formatMoney(response.data.people, 2),
			supplies: me.formatMoney(response.data.supplies, 2),
			tools: me.formatMoney(response.data.tools, 2),
			utilities: me.formatMoney(response.data.utilities, 2),
			maintenance: me.formatMoney(response.data.maintenance, 2),
			other: me.formatMoney(response.data.other, 2)
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
	
}("spending-overview", dharma.widget, dharma.core));