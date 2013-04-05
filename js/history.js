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
    
    // updateContent takes a bunch of data after we get a 'popstate' event and
    // updates the page with it.
    function updateContent(data) {
        if (!data) {
            return false;
        }
        core.publish("reconstruct-previous-state", data);
    }
    
    // modifyHistory adds our data to the current history state, then adds a new
    // state representing our updated page.
    function modifyHistory(group, category) {
        var url = "/dharma/" + group,
            id = group;
        if (!group) {
            return false;
        }
        // Replace the previous browser state's data.
        history.replaceState(data, history.state.id, history.state.url);
        // Capture the new state without data.
        if (category) {
            url += "/" + category;
            id += "-" + category;
        }
        history.pushState({}, id, url);
        // Reset the data object so we can receive new ajax responses.
        data = null;
        data = {};
    }
    
    // If we're updating the screen, store any data we have received from ajax
    // calls into the previous item in the browser history.   Then create a new
    // item in the browser history for the updated page.
    core.subscribe("show-overview", name, function (group) {
        // On our first time running this, there is no previous state to change,
        // so just push a new state.
        if (initial) {
            history.pushState({}, "initial-state", group);
            initial = false;
            return;
        }
        modifyHistory(group.toLowerCase(), null);
    });
    core.subscribe("show-breakdown", name, function (category) {
        var group = document.getElementById("breadcrumbs").getElementsByTagName("a")[0].innerText;
        modifyHistory(group.toLowerCase(), category.toLowerCase());
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
        if (!data.group && response.hasOwnProperty("group")) {
            data.group = response.group;
        }
        if (!data.type && response.hasOwnProperty("type")) {
            data.type = response.type;
        }
    });
    
    // When the user clicks the backwards or forward button, a 'popstate' event
    // happens.  Listen for that, and restore the page to what it was.
    window.addEventListener("popstate", function (event) {
        updateContent(event.state);
    }, false);
    
}("history", window, window.history, dharma.core));