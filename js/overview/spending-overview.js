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
	
	core.subscribe("clear-screen", name, function () {
		me.remove();
	});
	
	// If we need to show the overview, request the data but don't handle the
	// response.  We'll take care of that later.
	core.subscribe("show-overview", name, function (group) {
		me.requestData({type: myType, what: myWhat, group: group});
	});
	
	// Verify that data is for the request we made.  Then process it into a
	// format we can use.  We send back out this processed data so that we can
	// capture it as part of the browser history.
	core.subscribe("here's-data", name, function (response) {
		if (response.type !== myType || response.what !== myWhat) {
			return;
		}
		var data = {
			yesterday: me.formatMoney(response.data.yesterday),
			people: me.formatMoney(response.data.people),
			supplies: me.formatMoney(response.data.supplies),
			tools: me.formatMoney(response.data.tools),
			utilities: me.formatMoney(response.data.utilities),
			maintenance: me.formatMoney(response.data.maintenance),
			other: me.formatMoney(response.data.other)
		};
		me.renderSuccess(destination, data);
		core.publish("data-processed", name, data);
		me.addEvent("click", function () {
			core.publish("widget-clicked", response.group, myWhat);
		});
	});
	
	// Verify that our request hasn't returned any data, and then render the
	// failure template.
	core.subscribe("no-data", name, function (args) {
		if (args.type !== myType || args.what !== myWhat) {
			return;
		}
		me.renderFail(destination);
	});
	
	// If the user uses the backwards or forwards button, we'll get this message
	// and some data we can use to reconstruct the page.  The data should already
	// be processed into a form we can use directly.
	core.subscribe("reconstruct-overview", name, function (data) {
		if (!data.hasOwnProperty(name)) {
			me.renderFail(destination);
			return;
		}
		me.renderSuccess(destination, data[name]);
		me.addEvent("click", function () {
			core.publish("widget-clicked", data.group, myWhat);
		});
	});
	
}("spending-overview", dharma.widget, dharma.core));