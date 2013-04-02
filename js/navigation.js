/*jslint vars: true, browser: true */
/*global dharma */

// navigation controls the look and event handlers of the navigation parts of
// our app.  This module also manages the app history.
dharma.navigation = (function (me, document, core) {
    "use strict";
    
    // Keep references to screen elements we may be required to modify or update.
    var header = document.getElementsByTagName("header")[0],
        currentGroup = header.getElementsByTagName("h1")[0],
        groupAnchors = header.getElementsByTagName("nav")[0].getElementsByTagName("table")[0].getElementsByTagName("a");
    
    // makeGroupCallback returns a function that is called when a group link is
    // clicked.
    function makeGroupCallback(text) {
        // Remove the leading #.
        if (text[0] === "#") {
            text = text.slice(1);
        }
        return function (event) {
            core.publish("group-clicked", text);
            // Prevent the link from being followed.  We'll manually make any
            // changes without refreshing the page.
            event.preventDefault();
        };
    }
    
    // formatString puts a string in the format we want to display as part of
    // our navigaion.
    function formatString(input) {
        return input.slice(0, 1).toUpperCase() + input.slice(1).toLowerCase();
    }
    
    // Attach event handlers to the navigation buttons.
    var item;
    for (item = 0; item < groupAnchors.length; item += 1) {
        groupAnchors[item].addEventListener("click", makeGroupCallback(groupAnchors[item].innerHTML), false);
    }
    
    // Register our subscriptions.
    core.subscribe("show-overview", me, function (group) {
        var title = formatString(group);
        if (currentGroup.innerHTML !== title) {
            currentGroup.innerHTML = title;
        }
    });
    
}("navigation", parent.document, dharma.core));