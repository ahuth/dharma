/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

dharma.chart = (function (name, accounting, Charts, core) {
	"use strict";
	
	// getDateString converts a date object to a string in the following format:
	// Apr 14.  If the parameter isn't a date object, try to convert it to a date.
	function getDateString(dateobj) {
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		if (!dateobj.getMonth) {
			dateobj = new Date(dateobj);
		}
		return months[dateobj.getMonth()] + " " + dateobj.getDate();
	}
	
	// makeTooltip creates the pop up box we'll use on our data points.
	function makeTooltip(date, value, money) {
		var output = getDateString(date) + ": ";
		if (money) {
			output += accounting.formatMoney(value, "$", 0);
		} else {
			output += value;
		}
		return output;
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
	
	// generateTooltips makes what we want to see in the box that pops up when
	// you hover over a point on the graph.
	function generateTooltips(dates, values, money) {
		var output = [], item;
		for (item = 0; item < dates.length; item++) {
			output.push(makeTooltip(dates[item], values[item], money));
		}
		return output;
	}
	
	// makeRaphyData takes the data we've previously generated and puts it in a
	// data structure that raphy charts understands.
	function makeRaphyData(dates, values, tooltips) {
		if (!dates || !values) {
			return;
		}
		var item, output = [];
		for (item = 0; item < dates.length; item++) {
			if (tooltips) {
				output.push([dates[item], values[item], {tooltip: tooltips[item]}]);
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
		// Pick the largest value from between our reference line or our main
		// line.
		if (data[data.length - 1] > reference[reference.length - 1]) {
			maxValue = data[data.length - 1];
		} else {
			maxValue = reference[reference.length - 1];
		}
		// Round our max value up to a nice round number.
		if (maxValue < 100) {
			maxValue = Math.ceil(maxValue / 10) * 10;
		} else if (maxValue < 1000) {
			maxValue = Math.ceil(maxValue / 100) * 100;
		} else if (maxValue < 10000) {
			maxValue = Math.ceil(maxValue / 1000) * 1000;
		} else if (maxValue < 100000) {
			maxValue = Math.ceil(maxValue / 10000) * 10000;
		} else if (maxValue < 1000000) {
			maxValue = Math.ceil(maxValue / 100000) * 100000;
		} else {
			maxValue = Math.ceil(maxValue / 1000000) * 1000000;
		}
		// Return our range, starting at 0.
		return [0, maxValue];
	}
	
	// drawLineChart draws a line chart which includes our data and areference
	// line.
	function drawLineChart(destination, data, options) {
		var chartOptions, mainLine, referenceLine;
		
		options = options || {};
		options.y_axis_scale = findYAxisRange(data.data, data.reference);
		
		chartOptions = makeRaphyOptions(options);
		mainLine = makeRaphyData(data.dates, data.data, data.tooltips);
		referenceLine = makeRaphyData(data.dates, data.reference);
		
		var chart = new Charts.LineChart(destination, chartOptions);
		
		if (referenceLine) {
			chart.add_line({data: referenceLine, options: {fill_area: false}});
		}
		chart.add_line({data: mainLine});
		chart.draw();
	}
	
	core.subscribe("draw-line-chart", name, function (destination, dates, rawData, money, options) {
		var data = {
			dates: generateDates(dates),
			data: generateData(rawData.values),
			reference: generateReference(rawData.reference, dates.length),
			tooltips: generateTooltips(dates, rawData.values, money)
		};
		drawLineChart(destination, data, options);
	});
	
}("chart", parent.accounting, parent.Charts, dharma.core));