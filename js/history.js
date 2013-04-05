/*jslint vars: true, browser: true */
/*global dharma */

// history manages the browser's history.  Because this is a single page app,
// we have to manage this ourselves so that the user can use the forward and
// back buttons as expected.
dharma.history = (function (name, window, history, core) {
    "use strict";
    
    var initial = true,
        currentGroup;
    
    // Keep track of ajax response data here.  We'll use this to update our
    // browser history.
    var data = {};
    
    // updateContent takes a bunch of data after we get a 'popstate' event and
    // update the page with it.
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
    
    // If we're updating the screen, add data we've stored to the current history
    // state, then add a new state representing the updated page (but no data).
    core.subscribe("show-overview", name, function (group) {
        currentGroup = group;
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
        modifyHistory(currentGroup.toLowerCase(), category.toLowerCase());
    });
    
    // Keep track of ajax responses.  Before we update the page, we'll store this
    // data with the appropriate item int he browser history.
    core.subscribe("here's-data", name, function (args, response) {
        var item;
        for (item in response) {
            if (response.hasOwnProperty(item)) {
                data[item] = response[item];
            }
        }
        if (!data.group && args.hasOwnProperty("group")) {
            data.group = args.group;
        }
        if (!data.type && args.hasOwnProperty("type")) {
            data.type = args.type;
        }
    });
    
    // When the user clicks the backwards or forward button, a 'popstate' event
    // happens.  Listen for that, and restore the page to what it was.
    window.addEventListener("popstate", function (event) {
        updateContent(event.state);
    }, false);
    
}("history", window, window.history, dharma.core));