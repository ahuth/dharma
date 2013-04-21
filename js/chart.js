/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

// chart contains everything specific to whatever charting library we've chosen
// to use.
dharma.chart = (function (name, Chart, core) {
	"use strict";
	
	// getDateString returns a string from a date in the format that we want.
	function getDateString(dateObject) {
		if (!dateObject.getMonth) {
			dateObject = new Date(dateObject);
		}
		return (dateObject.getMonth() + 1) + "/" + dateObject.getDate();
	}
	
	// makeDateLabel formats an array of date-strings into the format we want
	// for our charts.
	function makeDateLabel(dates) {
		var output = [], item;
		for (item in dates) {
			if (dates.hasOwnProperty(item)) {
				output.push(getDateString(dates[item]));
			}
		}
		return output;
	}
	
	// makeCumulativeData takes a raw array of data and returns a new array with
	// cumulative data.
	function makeCumulativeData(data) {
		var output = [], total = 0, item;
		for (item in data) {
			if (data.hasOwnProperty(item)) {
				total += data[item];
				output.push(total);
			}
		}
		return output;
	}
	
	// makeReferenceData takes a single value, and makes a cumulative array of
	// data by summing that value a specified number of times.
	function makeReferenceData(reference, times) {
		var output = [], total = 0, item;
		for (item = 0; item < times; item++) {
			total += reference;
			output.push(total);
		}
		return output;
	}
	
	core.subscribe("draw-line-chart", name, function (destination, dates, line, reference) {
		var data = {
			labels: makeDateLabel(dates),
			datasets: [
				{
					fillColor: "rgba(0,0,0,0)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(0,0,0,0)",
					pointStrokeColor: "rgba(0,0,0,0)",
					data: makeReferenceData(reference, dates.length)
				},
				{
					fillColor: "rgba(0,170,221,0.5)",
					strokeColor: "rgba(0,170,221,1)",
					pointColor: "rgba(0,170,221,1)",
					pointStrokeColor: "#fff",
					data: makeCumulativeData(line)
				}
			]
		};
		var options = {
			animation: false,
			bezierCurve: false,
			datasetStrokeWidth: 4
		};
		// Get the 2d context of the canvas we want to draw to.
		var context = document.getElementById(destination).getContext("2d");
		if (!context) {
			return;
		}
		var chart = new Chart(context).Line(data, options);
	});
	
}("chart", parent.Chart, dharma.core));