/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

dharma.chart = (function (accounting, Charts) {
	"use strict";
	
	// getDateString converts a date object to a string in the format we need
	// for our charts.  It's 'Apr 11'.
	function getDateString(dateobj) {
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return months[dateobj.getMonth()] + " " + dateobj.getDate();
	}
	
	// createReferenceLine makes a line for our chart that will be a straight
	// line increasing by 'num' every day.
	function createReferenceLine(data, num) {
		var output = [], total = 0, item;
		for (item = 0; item < data.length; item++) {
			total += num;
			output.push([data[item][0], total, {no_dot: true}]);
		}
		return output;
	}
	
	// generateOptions starts off with some default options, and adds in any
	// user supplied ones.
	function generateOptions(options) {
		var chartOptions = {
			label_max: false,
			label_min: false,
			fill_area: true,
			show_grid: true
		},
			item;
		if (options) {
			for (item in options) {
				if (options.hasOwnProperty(item)) {
					chartOptions[item] = options[item];
				}
			}
		}
		return chartOptions;
	}
	
	// generateData turns each date string into a date object, accumulates each
	// value, and adds any tooltips.  All of these get put together into an array
	// of arrays, which our charts library can understand.
	function generateData(dates, values, money) {
		var output = [], total = 0, date, item;
		for (item = 0; item < dates.length; item++) {
			total += values[item];
			date = new Date(dates[item]);
			if (money) {
				output.push([date, total, {tooltip: getDateString(date) + ": " + accounting.formatMoney(values[item])}]);
			} else {
				output.push([date, total, {tooltip: getDateString(date) + ": " + values[item]}]);
			}
		}
		return output;
	}
	
	// drawLineChart draws a line chart to the destination.  It optionally adds
	// a reference line or the supplised options.
	function drawLineChart(destination, data, referenceLine, options) {
		var chartOptions = generateOptions(options);
		if (!destination || !data) {
			return;
		}
		var chart = new Charts.LineChart(destination, chartOptions);
		if (referenceLine) {
			chart.add_line({
				data: createReferenceLine(data, referenceLine),
				options: {fill_area: false}
			});
		}
		chart.add_line({data: data});
		chart.draw();
	}
	
	// Module API.
	return {
		generateData: generateData,
		drawLineChart: drawLineChart
	};
	
}(parent.accounting, parent.Charts));