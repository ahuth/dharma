/*jslint vars: true, browser: true */
/*global dharma */

// navigation controls the look and event handlers of the navigation parts of
// our app and the breadcrumbs.
dharma.navigation = (function (name, document, core) {
    "use strict";
    
    // Keep references to screen elements we may be required to modify or update.
    var header = document.getElementsByTagName("header")[0],
		breadcrumbs = document.getElementById("breadcrumbs"),
        currentGroup = breadcrumbs.getElementsByTagName("li")[0].getElementsByTagName("a")[0],
        groupAnchors = header.getElementsByTagName("nav")[0].getElementsByTagName("table")[0].getElementsByTagName("a");
	
	// formatString puts a string in the format we want to display as part of
    // our navigaion.
    function formatString(input) {
        return input.slice(0, 1).toUpperCase() + input.slice(1).toLowerCase();
    }
    
    // makeGroupCallback returns a function that is called when a group link is
    // clicked.
    function makeGroupCallback(text) {
        // Remove a leading #, if present.
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
	
	// removeNodesExceptFirst removes all children nodes from a parent EXCEPT for
	// the first one.
	function removeNodesExceptFirst(parent) {
		var nodes = parent.children;
		while (nodes.length > 1) {
			parent.removeChild(parent.lastChild);
		}
	}
    
    // Attach event handlers to the navigation buttons.
    var item;
    for (item = 0; item < groupAnchors.length; item += 1) {
        groupAnchors[item].addEventListener("click", makeGroupCallback(groupAnchors[item].innerText), false);
    }
	
	// Attach an event handler to our breadcrumb.
	currentGroup.addEventListener("click", function () {
		core.publish("breadcrumb-clicked", currentGroup.innerText);
		event.preventDefault();
	}, false);
    
    // Register our subscriptions.
    core.subscribe("show-overview", name, function (group) {
		var title = formatString(group);
		if (typeof group !== "string") {
			return false;
		}
		removeNodesExceptFirst(breadcrumbs);
		currentGroup.innerText = title;
		currentGroup.href = "#" + group.toLowerCase();
    });
	
	core.subscribe("show-breakdown", name, function (category) {
		var title = formatString(category),
			splitNode,
			categoryNode;
		if (typeof category !== "string") {
			return false;
		}
		splitNode = document.createElement("li");
		splitNode.innerText = ">";
		categoryNode = document.createElement("li");
		categoryNode.innerText = title;
		breadcrumbs.appendChild(splitNode);
		breadcrumbs.appendChild(categoryNode);
	});
	
	core.subscribe("breadcrumb-clicked", name, function (group) {
		var title = formatString(group);
		if (typeof group !== "string" || breadcrumbs.children.length < 3) {
			return false;
		}
		core.publish("show-overview", group.toLowerCase());
	});
    
}("navigation", parent.document, dharma.core));