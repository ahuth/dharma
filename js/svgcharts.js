/*jslint vars: true, browser: true */

var dharma = dharma || {};

dharma.svgcharts = (function (document, Charts, debug) {
	"use strict";
    
    function drawBarChart(destination, bars, chartOptions) {
        var node = document.getElementById(destination),
            chart,
            item;
        
        if (node === null) {
            debug.log("svgcharts", "drawBarChart", "Invalid id: " + destination);
            return;
        }
		
		if (typeof bars !== "object") {
			debug.log("svgcharts", "drawBarChart", "Invalid 'bars' for chart");
			return;
		}
		
		if (typeof chartOptions !== "object") {
			chartOptions = {};
		}
        
        chart = new Charts.BarChart(node, chartOptions);
        
        for (item in bars) {
            if (bars.hasOwnProperty(item)) {
                chart.add({
                    label: item,
                    value: bars[item]
                });
            }
        }
        
        chart.draw();
    }
    
    return {
        drawBarChart: drawBarChart
    };
    
}(parent.document, parent.Charts, dharma.debug));