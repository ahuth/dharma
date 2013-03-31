/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.production = (function (me, document, hogan, charts, ajax, core) {
    "use strict";
    
    var templates = {
        success: hogan.compile(document.getElementById("production-template").innerHTML),
        failure: hogan.compile(document.getElementById("fail-template").innerHTML)
    };
    
    var content = document.getElementById("content");
    
    function renderInto(template, into, data) {
        into.innerHTML += template.render(data);
    }
    
    function removeFrom(from) {
        var node = document.getElementById(me);
        if (node === null) {
            return;
        }
        from.removeChild(node);
    }
    
    function drawBarChart(destination, bars, chartOptions) {
        var node = document.getElementById(destination),
            chart,
            item;
        
        if (node === null) {
            return;
        }
        
        chart = new charts.BarChart(node, chartOptions);
        
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
    
    core.subscribe("clear-content", me, function () {
        removeFrom(content);
    });
    
    core.subscribe("show-overview", me, function (_group) {
        ajax.get({type: "overview", what: me, group: _group}).then(function (value) {
            if (!value.hasOwnProperty(me)) {
                renderInto(templates.failure, content, {id: me});
                return;
            }
            renderInto(templates.success, content, null);
            drawBarChart("total-prod-chart", value[me].total, {bar_width: 20, bar_spacing: 46});
            drawBarChart("nuts-prod-chart", value[me].nuts, {bar_width: 20, bar_spacing: 46});
            drawBarChart("bolts-prod-chart", value[me].bolts, {bar_width: 20, bar_spacing: 46});
        }, function () {
            renderInto(templates.failure, content, {id: me});
        });
    });
    
}("production", parent.document, parent.Hogan, parent.Charts, dharma.ajax, dharma.core));