/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

// history manages the browser's history.  Because this is a single page app,
// we have to manage this ourselves so that the user can use the forward and
// back buttons as expected.
dharma.history = (function (name, window, history, core) {
    "use strict";
    
    var initial = true,
        data = {},
        currentGroup;
    
    // updateContent recieves data from a popstate event and signals that we
    // should reconstruct a page.
    function updateContent(oldData) {
        if (!oldData) {
            return false;
        }
        core.publish("reconstruct-previous-state", oldData);
    }
    
    // addHistory pushes a new history state to the history object, but without
    // any data.  We'll add data later.
    function addHistory(group, category) {
        var url;
        if (!group && !category) {
            return false;
        }
        if (group) {
            currentGroup = group;
        }
        url = "/dharma/" + currentGroup;
        if (category) {
            url += "/" + category;
        }
        history.pushState({}, url, url);
    }
    
    // Who says you can't change history?... changeHistory updates the data
    // stored in the current history object.
    function changeHistory(newData) {
        if (!newData) {
            return false;
        }
        history.replaceState(newData);
    }
    
    // If we get notified that the page is going to update, push a new history
    // state to the history object, but without any data.  Once we get ajax
    // requests back, we'll update the data for this history state.
    core.subscribe("show-overview", name, function (group) {
        if (initial) {
            currentGroup = group;
            history.replaceState({}, "dharma-initial", group);
            initial = false;
            return;
        }
        addHistory(group.toLowerCase(), null);
        // Reset the data object so we can receive new ajax requests.
        data = null;
        data = {};
    });
    core.subscribe("show-breakdown", name, function (category) {
        addHistory(null, category.toLowerCase());
        // Reset the data object so we can receive new ajax requests.
        data = null;
        data = {};
    });
    
    // Listen for successful ajax requests, and store the data if we hear any.
    core.subscribe("here's-data", name, function (args, response) {
        var item;
        for (item in response) {
            if (response.hasOwnProperty(item)) {
                data[item] = response[item];
            }
        }
        if (!data.type) {
            data.type = args.type;
        }
        if (!data.category && data.type === "breakdown") {
            data.category = args.what;
        }
        if (!data.group) {
            data.group = currentGroup;
        }
        changeHistory(data);
    });
    
    // If the user presses the back or forward browser button, we get a popstate
    // event, from which we can read the data we stored earlier for the page.
    window.addEventListener("popstate", function (event) {
        updateContent(event.state);
    }, false);
    
}("history", window, window.history, dharma.core));