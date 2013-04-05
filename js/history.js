/*jslint vars: true, browser: true */
/*global dharma */

// history manages the browser's history.  Because this is a single page app,
// we have to manage this ourselves so that the user can use the forward and
// back buttons as expected.
dharma.history = (function (name, window, history, core) {
    "use strict";
    
    var initial = true;
    
    // Keep track of ajax response data here.  We'll use this to update our
    // browser history.
    var data = {};
    
    // HTML elements we'll need to get data from.
    var breadcrumbs = document.getElementById("breadcrumbs");
    
    // updateContent takes a bunch of data after we get a 'popstate' event and
    // updates the page with it.
    function updateContent(data) {
        if (!data) {
            return false;
        }
        core.publish("update-breadcrumbs", data.group, data.category);
    }
    
    // If we're updating the screen, store any data we have received from ajax
    // calls into the previous item in the browser history.   Then create a new
    // item in the browser history for the updated page.
    core.subscribe("show-overview", name, function (group) {
        var url;
        // On our first time running this, there is no previous state to change,
        // so just push a new state.
        if (initial) {
            history.pushState({}, "initial-state", group);
            initial = false;
            return;
        }
        // Replace the previous browser state's data.
        history.replaceState(data, history.state.id, history.state.url);
        // Capture the new state without data.
        url = "/dharma/" + group;
        history.pushState({}, group + "-overview", url);
        // Reset the data object se we can receive new ajax responses.
        data = null;
        data = {};
    });
    core.subscribe("show-breakdown", name, function (category) {
        var url,
            group = breadcrumbs.getElementsByTagName("a")[0].innerText.toLowerCase();
        // Replace the previous browser state's data.
        history.replaceState(data, history.state.id, history.state.url);
        // Capture the new state without data.
        url = "/dharma/" + group + "/" + category.toLowerCase();
        history.pushState({}, group + "-breakdown", url);
        // Reset the data object se we can receive new ajax responses.
        data = null;
        data = {};
    });
    
    // As ajax returns data to us, keep track of the response.  If we need to
    // update the page, we'll store this data so we can come back to a previous
    // point in history using the back button.
    core.subscribe("here's-data", name, function (args, response) {
        var item;
        for (item in response) {
            if (response.hasOwnProperty(item)) {
                data[item] = response[item];
            }
        }
        for (item in args) {
            if (args.hasOwnProperty(item)) {
                data[item] = args[item];
            }
        }
    });
    
    // When the user clicks the backwards or forward button, a 'popstate' event
    // happens.  Listen for that, and restore the page to what it was.
    window.addEventListener("popstate", function (event) {
        updateContent(event.state);
    }, false);
    
}("history", window, window.history, dharma.core));