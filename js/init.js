/*jslint vars: true, browser: true */
/*global dharma */

dharma.init = (function (name, document, core) {
	"use strict";
    
    // makeGroupCallback returns a function that is called when a group link is
    // clicked.
    function makeGroupCallback(url) {
        // Get the last part of the url.
        var text = url.split("/");
        text = text[text.length - 1];
        // Remove the leading #.
        if (text[0] === "#") {
            text = text.slice(1);
        }
        return function (event) {
            core.publish("group-clicked", text);
            event.preventDefault();
        };
    }
    
    // Main entry point for the program.  Start off by showing the jenkintown
    // overview.
    core.publish("show-overview", "jenkintown");
    core.subscribe("widget-clicked", name, function (widget) {
        core.publish("clear-screen");
    });
    core.subscribe("group-clicked", name, function (group) {
        core.publish("clear-screen");
        core.publish("show-overview", group);
    });
    
    // Attach event handlers to the navigation buttons.
    var groups = document.getElementsByTagName("nav")[0].getElementsByTagName("table")[0].getElementsByTagName("a"),
        item;
    for (item = 0; item < groups.length; item += 1) {
        groups[item].addEventListener("click", makeGroupCallback(groups[item].href), false);
    }
}("init", parent.document, dharma.core));