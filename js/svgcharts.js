/*jslint vars: true, browser: true */
/*global dharma */

dharma.svgcharts = (function (name, charts, core) {
    "use strict";
    
    function drawBarChart(destination, data, options) {
        // See if the destination exists.
        var node = document.getElementById(destination);
        if (!node) {
            return false;
        }
        
        var chart, item;
        chart = new charts.BarChart(node, options);
        
        for (item in data) {
            if (data.hasOwnProperty(item)) {
                chart.add({label: item, value: data[item]});
            }
        }
        
        chart.draw();
    }
    
    core.subscribe("request-chart", name, function (type, destination, data, options) {
        switch (type) {
        case "bar":
            drawBarChart(destination, data, options);
            break;
        }
        core.publish("chart-drawn", type, destination);
    });
    
}("svgcharts", parent.Charts, dharma.core));