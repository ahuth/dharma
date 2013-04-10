/*jslint vars: true, browser: true, nomen: true, plusplus: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.karma_breakdown = (function (name, Charts, Widget, core) {
    "use strict";
    
    var me = new Widget(name, "karma-breakdown-template", "fail-breakdown-template"),
        destination = "content";
    
    // createReferenceLine creates the data for a line we can chart showing what
    // it would look like if you got <num> karma every day.  We pass in the data
    // object so that we can get the sames dates our data has.
    function createReferenceLine(num, data) {
        var output = [],
            total = 0,
            item;
        for (item = 0; item < data.length; item++) {
            total += num;
            output.push([data[item][0], total, {no_dot: true}]);
        }
        return output;
    }
    
    // drawChart takes some data and plots the chart.  We have 4 lines on the
    // chart: 1 is our data from the server, and 3 more reference lines.
    function drawChart(_data) {
        if (!_data) {
            return;
        }
        var chart = new Charts.LineChart("karmachart", {
            label_max: false,
            label_min: false,
            show_y_labels: false,
            fill_area: true,
            show_grid: true,
            x_padding: 65
        });
        chart.add_line({
            data: createReferenceLine(33, _data),
            options: {
                fill_area: false
            }
        });
        chart.add_line({
            data: createReferenceLine(66, _data),
            options: {
                fill_area: false
            }
        });
        chart.add_line({
            data: createReferenceLine(100, _data),
            options: {
                fill_area: false
            }
        });
        chart.add_line({
            data: _data
        });
        chart.draw();
    }
    
    // convertDates returns an object that mirrors the data we got from the
    // server, except the date strings are converted to javascript date objects.
    function convertDates(data) {
        var output = [], item;
        for (item = 0; item < data.length; item++) {
            output.push([new Date(data[item][0]), data[item][1]]);
        }
        return output;
    }
    
    // getDateString converts a date object to a string in the format we need
    // for our chart.
    function getDateString(dateobj) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[dateobj.getMonth()] + " " + dateobj.getDate();
    }
    
    // accumulateKarma returns an object that mirros the data we got from the
    // server, except the karma values are cumulative, not individual.
    function accumulateKarma(data) {
        var output = [],
            total = 0,
            item;
        for (item = 0; item < data.length; item++) {
            total += data[item][1];
            output.push([data[item][0], total, {tooltip: getDateString(data[item][0]) + ": " + data[item][1]}]);
        }
        return output;
    }
    
    core.subscribe("clear-screen", name, function () {
        me.remove();
    });
    
    core.subscribe("show-breakdown", name, function (_group, _what) {
        var args = {
            type: "breakdown",
            what: _what,
            group: _group
        };
        if (_what !== "karma") {
            return;
        }
        core.publish("request-data", args);
        core.subscribe("here's-data", name, function (_args, response) {
            var data;
            // See if the response is from the request we made.
            if (args !== _args) {
                return;
            }
            // After we render this, we won't need to listen for more data.
            core.unsubscribe("here's-data", name);
            core.unsubscribe("no-data", name);
            // The dates we get back from the server are strings, so we must
            // massage them into javacript date objects.  Also, add up the values
            // for each date to get cumulative numbers.
            data = convertDates(response[_what]);
            data = accumulateKarma(data);
            me.renderSuccess(destination);
            drawChart(data);
        });
        core.subscribe("no-data", name, function (_args) {
            if (args !== _args) {
                return;
            }
            me.renderFail(destination);
            core.unsubscribe("here's-data", name);
            core.unsubscribe("no-data", name);
        });
    });
    
    core.subscribe("reconstruct-breakdown", name, function (data) {
        var oldData;
        if (!data.hasOwnProperty("karma")) {
            me.renderFail(destination);
            return;
        }
        oldData = convertDates(data.karma);
        oldData = accumulateKarma(oldData);
        me.renderSuccess(destination);
        drawChart(oldData);
    });
    
}("karma-breakdown", parent.Charts, dharma.widget, dharma.core));