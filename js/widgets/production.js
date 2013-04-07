/*jslint vars: true, browser: true, nomen: true, plusplus: true */
/*global dharma */

dharma.widgets = dharma.widgets || {};

dharma.widgets.production = (function (name, accounting, Widget, core) {
    "use strict";
    
    var chartOptions = {bar_width: 20, bar_spacing: 46};
    // me is our instance of the Widget object.  In the initialization we specify
    // the name and templates to use.
    var me = new Widget("production", "production-overview-template", "fail-overview-template");
    // destination is the default location on the page we'll render this widget
    // to.
    var destination = "content";
    
    // makeNodeCurrent removes all classes from a list of nodes, and puts the
    // 'current' class on the specified node.
    function makeNodeCurrent(nodes, num) {
        var item;
        for (item = 0; item < nodes.length; item++) {
            if (item === num - 1) {
                nodes[item].className = "current";
                return;
            }
            nodes[item].className = "";
        }
    }
    
    core.subscribe("clear-screen", name, function () {
        me.remove();
    });
    
    core.subscribe("show-overview", name, function (_group) {
        // args is the arguments we use when requesting data.  We save these so
        // that we can recognize the returned request.
        var args = {
            type: "overview",
            what: name,
            group: _group
        };
        core.publish("request-data", args);
        core.subscribe("here's-data", name, function (_args, response) {
            var listNodes;
            // See if the response is from the request we made.
            if (args !== _args) {
                return;
            }
            // After we render this, we won't need to listen for more data.
            core.unsubscribe("here's-data", name);
            core.unsubscribe("no-data", name);
            // Make sure that the data looks right.
            if (!response.hasOwnProperty(name)) {
                me.renderFail(destination);
                return;
            }
            me.renderSuccess(destination, response[name]);
            me.addEvent("click", function () {
                core.publish("widget-clicked", name);
            });
            // Add the 'current' class to the first list item of each list.
            listNodes = document.getElementById(name).getElementsByTagName("ul");
            makeNodeCurrent(listNodes[0].getElementsByTagName("li"), 1);
            makeNodeCurrent(listNodes[1].getElementsByTagName("li"), 1);
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
    
    core.subscribe("reconstruct-overview", name, function (data) {
        var listNodes;
        if (!data.hasOwnProperty(name)) {
            me.renderFail(destination);
            return;
        }
        me.renderSuccess(destination, data[name]);
        me.addEvent("click", function () {
            core.publish("widget-clicked", name);
        });
        // Add the 'current' class to both of our lists.
        listNodes = document.getElementById(name).getElementsByTagName("ul");
        makeNodeCurrent(listNodes[0].getElementsByTagName("li"), 1);
        makeNodeCurrent(listNodes[1].getElementsByTagName("li"), 1);
    });
    
}("production", parent.accounting, dharma.widget, dharma.core));