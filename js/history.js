/*jslint vars: true, browser: true */
/*global dharma */

// history manages the browser's history.  Because this is a single page app,
// we have to manage this ourselves so that the user can use the forward and
// back buttons as expected.
dharma.history = (function (name, window, history, core) {
    "use strict";
    
    // Keep track of the current group and widget when we hear those messages.
    var currentGroup, currentWidget;
    
    // HTML elements we'll need to get data from.
    var breadcrumbs = document.getElementById("breadcrumbs");
    
    // updateContent takes a bunch of data after we get a 'popstate' event and
    // updates the page with it.
    function updateContent(data) {
        if (data === null) {
            return false;
        }
    }
    
    // We'll need to alter the initial history once the page is loaded so that
    // we can come back to it.  To do this, listen for the "chart-drawn" event,
    // which is the last thing to happen when the page is displayed.  We only
    // need this once, though, so immediately unsubscribe.
    core.subscribe("chart-drawn", name, function () {
        core.unsubscribe("chart-drawn", name);
    });
    
    // As we update the page with 'show-overview' or 'show-breakdown', capture
    // what the page looks like so that we can come back to that.
    core.subscribe("show-overview", name, function (group) {
        // Don't capture anything when the page initially loads.  In a different
        // function, we'll modify the initial history item instead.
        if (!currentGroup) {
            currentGroup = breadcrumbs.getElementsByTagName("li")[0].getElementsByTagName("a")[0].innerText;
            return false;
        }
    });
    
    core.subscribe("show-breakdown", name, function (widget) {
    });
    
    // When the user clicks the backwards or forward button, a 'popstate' event
    // happens.  Listen for that, and restore the page to what it was.
    window.addEventListener("popstate", function (event) {
        updateContent(event.state);
    }, false);
    
}("history", window, window.history, dharma.core));