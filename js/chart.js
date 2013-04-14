/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

dharma.chart = (function (accounting, Ico) {
	"use strict";
	
	// getDateString converts a date object to a string in the format we need
	// for our chart.
	function getDateString(dateobj) {
		//var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		//			  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return (dateobj.getMonth() + 1) + "/" + dateobj.getDate();
	}
	
	// generateData returns some data in a format that can be directly used by
	// our charting library.
	function generateData(values) {
		var output = [], total = 0, item;
		for (item = 0; item < values.length; item++) {
			total += values[item];
			output.push(total);
		}
		return output;
	}
	
	// generateDates takes some strings, converts them to date objects, and
	// outputs them back as strings in our desired format.
	function generateDates(dates) {
		var output = [], item;
		for (item = 0; item < dates.length; item++) {
			output.push(getDateString(new Date(dates[item])));
		}
		return output;
	}
	
	// generateReference returns an array that starts at num and increases by
	// num for each index a certain number of times.
	function generateReference(num, times) {
		var output = [], total = 0, item;
		for (item = 0; item < times; item++) {
			total += num;
			output.push(total);
		}
		return output;
	}
	
	// drawLineChart draws a line chart which includes our data and areference
	// line.
	function drawLineChart(destination, data) {
		var element = document.getElementById(destination);
		if (!element) {
			return;
		}
		var chart = new Ico.LineGraph(element, {
				dataLine: data.data,
				referenceLine: data.reference
			}, {
				markers: "circle",
				colours: {dataLine: "#00FF00", referenceLine: "#0000FF"},
				labels: data.dates,
				meanline: false,
				grid: true,
				start_value: 0
			}
				);	// This ); is in a weird place because of JSLint.
	}
	
	// Module API.
	return {
		generateData: generateData,
		generateDates: generateDates,
		generateReference: generateReference,
		drawLineChart: drawLineChart
	};
	
}(parent.accounting, parent.Ico));