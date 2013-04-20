/*jslint vars: true, browser: true */
/*global dharma */

dharma.breakdown = dharma.breakdown || {};

dharma.breakdown.production = (function (name, Widget, chart, core) {
	"use strict";
	
	var successTemplate = document.getElementById("breakdown-template").innerHTML,
		failTemplate = document.getElementById("fail-template").innerHTML,
		destination = "content",
		myType = "breakdown",
		myWhat = "production";
	
	// Me is the actual instance of our widget object.
	var me = new Widget(name, successTemplate, failTemplate, myType);
	
	core.subscribe("clear-screen", name, function () {
		me.remove();
	});
	
	// Request the data we need.  We'll handle this data later.
	core.subscribe("show-breakdown", name, function (group, widget) {
		if (widget !== myWhat) {
			return;
		}
		core.publish("request-data", {type: myType, what: myWhat, group: group});
	});
	
	// When we get data back, process it into a format that the chart module can
	// understand.  Then, send of the processed data to be stored.
	core.subscribe("here's-data", name, function (response) {
		if (response.type !== myType || response.what !== myWhat) {
			return;
		}
		var charts = me.constructChartTemplateData(response.data),
			item;
		me.renderSuccess(destination, {sectionId: name, charts: charts});
		for (item in response.data) {
			if (response.data.hasOwnProperty(item)) {
				if (item !== "dates") {
					core.publish("draw-line-chart", item + "chart", response.data.dates, response.data[item], true);
				}
			}
		}
	});
	
	// If the request doesn't return any data, render the fail template.
	core.subscribe("no-data", name, function (args) {
		if (args.type !== myType || args.what !== myWhat) {
			return;
		}
		me.renderFail(destination);
	});
	
}("production-breakdown", dharma.widget, dharma.chart, dharma.core));