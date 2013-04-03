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
	
	// updateBreadcrumbs changes the breadcrumb elements based on what we pass
	// to it.  There are 3 possibilities: just a group, just a category, or both.
	function updateBreadcrumbs(group, category) {
		var splitNode,
			categoryNode;
		// Remove all elements from breadcrumbs except for the first element.
		// If necessary, we'll modify this first element and/or reconstruct
        // the subsequent elements.
		removeNodesExceptFirst(breadcrumbs);
		if (group) {
			currentGroup.innerText = formatString(group);
			currentGroup.href = "#" + group.toLowerCase();
		}
		if (category) {
			splitNode = document.createElement("li");
			splitNode.innerText = ">";
			categoryNode = document.createElement("li");
			categoryNode.innerText = formatString(category);
			breadcrumbs.appendChild(splitNode);
			breadcrumbs.appendChild(categoryNode);
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
    
    // If we're showing an overview or a breakdown, update the breadcrumbs in
    // the appropriate way.
    core.subscribe("show-overview", name, function (group) {
        if (!group) {
            return false;
        }
        updateBreadcrumbs(group, null);
    });
	core.subscribe("show-breakdown", name, function (category) {
        if (!category) {
            return false;
        }
        updateBreadcrumbs(null, category);
	});
	
    // The breadcrumb-clicked message is separate from the "click" event on the
    // breadcrumb just in case I ever decide to have another module handle this
    // event.
	core.subscribe("breadcrumb-clicked", name, function (group) {
        // If we're already where the breadcrumb link would take us, then end
        // here and don't proceed.
		if (typeof group !== "string" || breadcrumbs.children.length < 3) {
			return false;
		}
		core.publish("show-overview", group.toLowerCase());
	});
	
    // update-breadcrumbs only gets activated if we're interacting with the
    // browser history, and we need to reconstruct a previous state of the page.
	core.subscribe("update-breadcrumbs", name, function (group, category) {
		if (!group) {
            return false;
        }
        updateBreadcrumbs(group, category);
	});
    
}("navigation", parent.document, dharma.core));