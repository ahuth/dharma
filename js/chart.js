/*jslint vars: true, browser: true, plusplus: true */
/*global dharma */

dharma.chart = (function (accounting, Ico) {
	"use strict";
	
	
	
	// Module API.
	return {
		generateData: generateData,
		drawLineChart: drawLineChart
	};
	
}(parent.accounting, parent.Ico));