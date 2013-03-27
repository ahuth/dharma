/*jslint vars: true, browser: true */

var dharma = dharma || {};

dharma.svgcharts = (function (document, Charts, errors) {
	"use strict";
    
    function drawBarChart(id, data) {
        var node = document.getElementById(id),
            chart,
            item;
        
        if (node === null) {
            errors.log("svgcharts", "drawBarChart", "Invalid id: " + id);
            return;
        }
        
        chart = new Charts.BarChart(node, {
            bar_width: 20,
            bar_spacing: 46
        });
        
        for (item in data) {
            if (data.hasOwnProperty(item)) {
                chart.add({
                    label: item,
                    value: data[item]
                });
            }
        }
        
        chart.draw();
    }
    
    return {
        drawBarChart: drawBarChart
    };
    
}(parent.document, parent.Charts, dharma.errors));