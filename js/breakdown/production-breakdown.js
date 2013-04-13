/*jslint vars: true, browser: true */
/*global dharma */

dharma.breakdown = dharma.breakdown || {};

dharma.breakdown.quality = (function (name, Widget, chart, core) {
    "use strict";
    
    var template = document.getElementById("breakdown-template").innerHTML,
		chartTemplate = document.getElementById("breakdown-chart-template").innerHTML,
		destination = "content",
		myType = "breakdown",
		myWhat = "production";
    
    // Me is the actual instance of our widget object.
	var me = new Widget(name, template, myType);
    
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
        var data = {},
			item;
		me.renderSuccess(destination, {sectionId: name});
		// There could be more than one chart we need to draw.  Loop through the
		// data and draw a chart for each set that we find.
		for (item in response.data) {
			if (response.data.hasOwnProperty(item)) {
				if (item !== "dates") {
					// Put our data into a format that the chart module can understand.
					data[item] = {
						data: chart.generateData(response.data.dates, response.data[item].values, true),
						reference: response.data[item].reference,
						id: item + "chart",
						title: me.formatString(item)
					};
					// Render the template for this chart and draw the chart on it.
					me.renderTemplate(chartTemplate, {chartId: data[item].id, chartTitle: data[item].title});
					chart.drawLineChart(data[item].id, data[item].data, data[item].reference, {y_label_size: 12});
				}
			}
		}
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
		var myData = data[name],
			item;
		me.renderSuccess(destination, {sectionId: name});
		for (item in myData) {
			if (myData.hasOwnProperty(item)) {
				me.renderTemplate(chartTemplate, {chartId: myData[item].id, chartTitle: myData[item].title});
				chart.drawLineChart(myData[item].id, myData[item].data, myData[item].reference, {y_label_size: 12});
			}
		}
	});
    
}("production-breakdown", dharma.widget, dharma.chart, dharma.core));