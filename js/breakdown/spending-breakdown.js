/*jslint vars: true, browser: true */
/*global dharma */

dharma.breakdown = dharma.breakdown || {};

dharma.breakdown.spending = (function (name, Widget, core) {
	"use strict";
	
	var successTemplate = document.getElementById("breakdown-template").innerHTML,
		failTemplate = document.getElementById("fail-template").innerHTML,
		destination = "content",
		myType = "breakdown",
		myWhat = "spending";
	
	// Me is the actual instance of our widget object.
	var me = new Widget(name, successTemplate, failTemplate, myType);
	
	// Request the data we need.  We'll handle this data later.
	core.subscribe("show-breakdown", function (group, widget) {
		me.remove();
		if (widget !== myWhat) {
			return;
		}
		core.publish("request-data", {type: myType, what: myWhat, group: group});
	});
	
	core.subscribe("show-overview", function (group) {
		me.remove();
	});
	
	// When we get data back, process it into a format that the chart module can
	// understand.  Then, send of the processed data to be stored.
	core.subscribe("here's-data", function (response) {
		if (response.type !== myType || response.what !== myWhat) {
			return;
		}
		var charts = me.constructChartTemplateData(response.data),
			item;
		me.renderSuccess(destination, {sectionId: name, charts: charts});
		for (item in response.data) {
			if (response.data.hasOwnProperty(item)) {
				if (item !== "dates") {
					core.publish("draw-line-chart", item + "chart", response.data.dates, response.data[item].values, response.data[item].reference);
				}
			}
		}
	});
	
	// If the request doesn't return any data, render the fail template.
	core.subscribe("no-data", function (args) {
		if (args.type !== myType || args.what !== myWhat) {
			return;
		}
		me.renderFail(destination);
	});
	
}("spending-breakdown", dharma.widget, dharma.core));