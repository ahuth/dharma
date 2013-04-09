/*jslint vars: true, browser: true, nomen: true, plusplus: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.karma = (function (name, Charts, Widget, core) {
    "use strict";
    
    var me = new Widget(name, "karma-breakdown-template", "fail-overview-template"),
        destination = "content";
	
	function createReferenceLine(num, data) {
		var output = [],
			total = 0,
			item;
		for (item = 0; item < data.length; item++) {
			total += num;
			output.push([data[item][0], total, {no_dot: true}]);
		}
		/*var day = new Date(2013, 3, 1);
		for (item = 0; item < 64; item++) {
			total += num;
			day = new Date(day.setDate(day.getDate() + 1));
			output.push([new Date(day), total, {no_dot: true}]);
		}*/
		return output;
	}
	
	function drawChart(_data) {
		if (!_data) {
			return;
		}
		var referenceLineOptions = {
			fill_area: false
		};
		var chart = new Charts.LineChart("chartarea", {
			label_max: false,
			label_min: false,
			show_y_labels: false,
			x_padding: 40
		});
		chart.add_line({
			data: createReferenceLine(100, _data),
			options: referenceLineOptions
		});
		chart.add_line({
			data: createReferenceLine(66, _data),
			options: referenceLineOptions
		});
		chart.add_line({
			data: createReferenceLine(33, _data),
			options: referenceLineOptions
		});
		chart.add_line({
			data: _data
		});
		chart.draw();
	}
	
	function convertDates(data) {
		var output = [], item;
		for (item = 0; item < data.length; item++) {
			output.push([new Date(data[item][0]), data[item][1]]);
		}
		return output;
	}
	
	function accumulateKarma(data) {
		var output = [],
			total = 0,
			item;
		for (item = 0; item < data.length; item++) {
			total += data[item][1];
			output.push([data[item][0], total, {tooltip: data[item][0].toDateString() + ": " + data[item][1]}]);
		}
		return output;
	}
    
    core.subscribe("show-overview", name, function () {
        me.remove();
    });
    
    core.subscribe("show-breakdown", name, function (_group, _what) {
		me.remove();
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
    
}("karma-breakdown", parent.Charts, dharma.widget, dharma.core));