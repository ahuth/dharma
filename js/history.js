/*jslint vars: true, browser: true */
/*global dharma */

// history manages the browser's history.  Because this is a single page app,
// we have to manage this ourselves so that the user can use the forward and
// back buttons as expected.
dharma.history = (function (name, window, history, core) {
    "use strict";
    
    var initial = false;
    
    // HTML elements we'll need to get data from.
    var breadcrumbs = document.getElementById("breadcrumbs");
    
    // updateContent takes a bunch of data after we get a 'popstate' event and
    // updates the page with it.
    function updateContent(data) {
        if (!data) {
            return false;
        }
		
    }
	
	// captureContent takes all the data we have on the page and puts it in an
	// object, so that later we can retrieve it and restore the state.
	function captureContent() {
		var data = {},
			breadcrumbElements = breadcrumbs.getElementsByTagName("li");
		data.group = breadcrumbElements[0].getElementsByTagName("a")[0].innerText.toLowerCase();
		// Is this an overview or a breakdown?
		if (breadcrumbElements.length === 1) {
			data.type = "overview";
		} else {
			data.type = "breakdown";
			data.category = breadcrumbElements[breadcrumbElements.length - 1].innerText.toLowerCase();
		}
		return data;
	}
	
	function changeHistory() {
		var content = captureContent();
		history.replaceState(content, "initialState", "jenkintown");
	}
	
	function captureHistory() {
		var content = captureContent();
		var url = "/dharma/" + content.group;
		if (content.type === "breakdown") {
			url += "/" + content.category;
		}
		history.pushState(content, content.type, url);
	}
    
    // As we update the page with 'show-overview' or 'show-breakdown', capture
    // what the page looks like so that we can come back to that.
    core.subscribe("capture-history", name, function () {
		if (!initial) {
			initial = true;
			changeHistory();
			return;
		}
		captureHistory();
    });
    
    // When the user clicks the backwards or forward button, a 'popstate' event
    // happens.  Listen for that, and restore the page to what it was.
    window.addEventListener("popstate", function (event) {
        updateContent(event.state);
    }, false);
    
}("history", window, window.history, dharma.core));