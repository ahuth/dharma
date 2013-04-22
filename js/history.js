/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

// history manages the browser's history.  Because this is a single page app,
// we have to manage this ourselves so that the user can use the forward and
// back buttons as expected.
dharma.history = (function (name, window, history, core) {
	"use strict";
	
	var initial = true;
	
	// Modify the current history state with a url representing our group and
	// category, and a data object that describes the basic attributes of our
	// current view.
	function addHistory(group, category, type) {
		var url = "/dharma/" + group;
		if (category) {
			url += "/" + category;
		}
		history.pushState({group: group, type: type, what: category}, url, url);
	}
	
	core.subscribe("show-overview", name, function (group, dontAdd) {
		if (initial) {
			initial = false;
			history.replaceState({group: group, type: "overview", what: null}, "dharma-initial", group);
			return;
		}
		if (dontAdd) {
			return;
		}
		addHistory(group, null, "overview");
	});
	
	core.subscribe("show-breakdown", name, function (group, category, dontAdd) {
		if (dontAdd) {
			return;
		}
		addHistory(group, category, "breakdown");
	});
	
	// If the user presses the back or forward browser button, we get a popstate
	// event, from which we can read the data we stored earlier for the page.
	window.addEventListener("popstate", function (event) {
		if (!event.state) {
			return;
		}
		if (event.state.type === "overview") {
			core.publish("show-overview", event.state.group, true);
		} else if (event.state.type === "breakdown") {
			core.publish("show-breakdown", event.state.group, event.state.what, true);
		}
		
	}, false);
	
}("history", window, window.history, dharma.core));