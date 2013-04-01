/*jslint vars: true, browser: true */
/*global dharma */

// navigation controls the look and event handlers of the navigation parts of
// our app.
dharma.navigation = (function (me, document, core) {
    "use strict";
    
    // Keep references to screen elements we may be required to modify or update.
    var header = document.getElementsByTagName("header")[0],
        currentGroup = header.getElementsByTagName("h1")[0],
        groupAnchors = header.getElementsByTagName("nav")[0].getElementsByTagName("table")[0].getElementsByTagName("a");
    
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
    
    // Attach event handlers to the navigation buttons.
    var item;
    for (item = 0; item < groupAnchors.length; item += 1) {
        groupAnchors[item].addEventListener("click", makeGroupCallback(groupAnchors[item].href), false);
    }
    
    // Register our subscriptions.
    core.subscribe("show-overview", me, function (group) {
        
    });
    
}("navigation", parent.document, dharma.core));