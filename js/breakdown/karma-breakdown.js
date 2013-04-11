/*jslint vars: true, browser: true */
/*global dharma */

dharma.breakdown = dharma.breakdown || {};

dharma.breakdown.karma = (function (name, Widget, chart, core) {
    "use strict";
    
    var template = document.getElementById("karma-breakdown-template").innerHTML,
		destination = "content",
		myType = "breakdown",
		myWhat = "karma";
    
    // Me is the actual instance of our widget object.
	var me = new Widget(name, template, myType);
    
    core.subscribe("clear-screen", name, function () {
		me.remove();
	});
    
    // Request the data we need.  We'll handle this data later.
    core.subscribe("show-breakdown", name, function (group, widget) {
        if (widget !== myWhat) {
            return;
        }
		me.requestData({type: myType, what: myWhat, group: group});
	});
    
    core.subscribe("here's-data", name, function (response) {
		if (response.type !== myType || response.what !== myWhat) {
			return;
		}
        var data;
		me.renderSuccess(destination);
		core.publish("data-processed", name, data);
	});
    
}("karma-breakdown", dharma.widget, dharma.chart, dharma.core));