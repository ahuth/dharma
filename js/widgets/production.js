/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.production = (function (me, document, accounting, hogan, charts, ajax, core) {
    "use strict";
    
    // Hogan templates are stored in the DOM under script tags with type = "text/
    // mustache".  The browser doesn't recognize that, so ignores it.  We pull them
    // out here and pre-compile them.
    var templates = {
        success: hogan.compile(document.getElementById("production-template").innerHTML),
        failure: hogan.compile(document.getElementById("fail-template").innerHTML)
    };
    
    // The default place we render into and remove items from is a div with an
    // id of "content".
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
    
    function drawBarChart(destinationID, bars, chartOptions) {
        var node = document.getElementById(destinationID),
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
    
    function formatNumber(num) {
        return accounting.formatNumber(num / 1000, 0);
    }
    
    core.subscribe("clear-content", me, function () {
        removeFrom(content);
    });
    
    core.subscribe("show-overview", me, function (_group) {
        ajax.get({type: "overview", what: me, group: _group}).then(function (value) {
            var totalData, nutsData, boltsData;
            if (!value.hasOwnProperty(me)) {
                renderInto(templates.failure, content, {id: me});
                return;
            }
            totalData = {
                total: formatNumber(value[me].total.total),
                overdue: formatNumber(value[me].total.overdue),
                early: formatNumber(value[me].total.early)
            };
            nutsData = {
                nuts: formatNumber(value[me].nuts.nuts),
                overdue: formatNumber(value[me].nuts.overdue),
                early: formatNumber(value[me].nuts.early)
            };
            boltsData = {
                bolts: formatNumber(value[me].bolts.bolts),
                overdue: formatNumber(value[me].bolts.overdue),
                early: formatNumber(value[me].bolts.early)
            };
            renderInto(templates.success, content, null);
            drawBarChart("total-prod-chart", totalData, {bar_width: 20, bar_spacing: 46});
            drawBarChart("nuts-prod-chart", nutsData, {bar_width: 20, bar_spacing: 46});
            drawBarChart("bolts-prod-chart", boltsData, {bar_width: 20, bar_spacing: 46});
        }, function () {
            renderInto(templates.failure, content, {id: me});
        });
    });
    
}("production", parent.document, parent.accounting, parent.Hogan, parent.Charts, dharma.ajax, dharma.core));