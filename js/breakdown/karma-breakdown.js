/*jslint vars: true, browser: true */
/*global dharma */

dharma.breakdown = dharma.breakdown || {};

dharma.breakdown.karma = (function (name, Widget, chart, core) {
	"use strict";
	
	var successTemplate = document.getElementById("breakdown-template").innerHTML,
		failTemplate = document.getElementById("fail-template").innerHTML,
		chartTemplate = document.getElementById("breakdown-chart-template").innerHTML,
		destination = "content",
		myType = "breakdown",
		myWhat = "karma";
	
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
		me.requestData({type: myType, what: myWhat, group: group});
	});
	
	// When we get data back, process it into a format that the chart module can
	// understand.  Then, send of the processed data to be stored.
	core.subscribe("here's-data", name, function (response) {
		if (response.type !== myType || response.what !== myWhat) {
			return;
		}
		var data = {
			dates: chart.generateDates(response.data.dates),
			data: chart.generateData(response.data.karma.values),
			reference: chart.generateReference(response.data.karma.reference, response.data.dates.length),
			tooltips: chart.generateTooltips(response.data.dates, response.data.karma.values, false)
		};
		me.renderSuccess(destination, {sectionId: name});
		me.renderTemplate(chartTemplate, {chartId: myWhat + "chart", chartTitle: "Karma"});
		chart.drawLineChart("karmachart", data, {show_y_labels: false});
		core.publish("data-processed", name, data);
	});
	
	// If the request doesn't return any data, render the fail template.
	core.subscribe("no-data", name, function (args) {
		if (args.type !== myType || args.what !== myWhat) {
			return;
		}
		me.renderFail(destination);
	});
	
	core.subscribe("reconstruct-breakdown", name, function (data) {
		if (!data.hasOwnProperty(name)) {
			return;
		}
		me.renderSuccess(destination, {sectionId: name});
		me.renderTemplate(chartTemplate, {chartId: myWhat + "chart", chartTitle: "Karma"});
		chart.drawLineChart("karmachart", data[name], {show_y_labels: false});
	});
	
}("karma-breakdown", dharma.widget, dharma.chart, dharma.core));