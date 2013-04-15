/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

dharma.chart = (function (accounting, Charts) {
	"use strict";
	
	// getDateString converts a date object to a string in the following format:
	// Apr 14.
	function getDateString(dateobj) {
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return months[dateobj.getMonth()] + " " + dateobj.getDate();
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
	
	// generateDates takes an array of date strings and converts them to date
	// objects.
	function generateDates(dates) {
		var output = [], item;
		for (item = 0; item < dates.length; item++) {
			output.push(new Date(dates[item]));
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
	
	// makeTooltip creates the pop up box we'll use on our data points.
	function makeTooltip(date, value) {
		return getDateString(date) + ": " + value;
	}
	
	// makeRaphyData takes the data we've previously generated and puts it in a
	// data structure that raphy charts understands.
	function makeRaphyData(dates, values, dots) {
		if (!dates || !values) {
			return;
		}
		var item, output = [];
		for (item = 0; item < dates.length; item++) {
			if (dots) {
				output.push([dates[item], values[item], {tooltip: makeTooltip(dates[item], values[item])}]);
			} else {
				output.push([dates[item], values[item], {no_dot: true}]);
			}
		}
		return output;
	}
	
	// makeRaphyOptions provides some default raphy charts options, and allows
	// us to specify our own options.
	function makeRaphyOptions(userOptions) {
		var item, options = {
			show_grid: true,
			label_max: false,
			label_min: false,
			fill_area: true
		};
		if (userOptions) {
			for (item in userOptions) {
				if (userOptions.hasOwnProperty(item)) {
					options[item] = userOptions[item];
				}
			}
		}
		return options;
	}
	
	// findYAxisRange determines min and max values we want for our Y-axis.
	// Raphy charts doesn't start at 0 unless we specify our own range.
	function findYAxisRange(data, reference) {
		var maxValue;
		if (data[data.length - 1] > reference[reference.length - 1]) {
			maxValue = data[data.length - 1];
		} else {
			maxValue = reference[reference.length - 1];
		}
		return [0, maxValue];
	}
	
	// drawLineChart draws a line chart which includes our data and areference
	// line.
	function drawLineChart(destination, data, options) {
		var chartOptions, mainLine, referenceLine;
		
		options = options || {};
		options.y_axis_scale = findYAxisRange(data.data, data.reference);
		
		chartOptions = makeRaphyOptions(options);
		mainLine = makeRaphyData(data.dates, data.data, true);
		referenceLine = makeRaphyData(data.dates, data.reference, false);
		
		var chart = new Charts.LineChart(destination, chartOptions);
		
		if (referenceLine) {
			chart.add_line({data: referenceLine, options: {fill_area: false}});
		}
		chart.add_line({data: mainLine});
		chart.draw();
	}
	
	// Module API.
	return {
		generateData: generateData,
		generateDates: generateDates,
		generateReference: generateReference,
		drawLineChart: drawLineChart
	};
	
}(parent.accounting, parent.Charts));