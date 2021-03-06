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
	
	// Upon initialization of this module, we'll insert the current date into the
	// header.
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
				  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today = new Date(),
		dateElement = document.getElementById("today");
	
	// formatString puts a string in the format we want to display as part of
	// our navigaion.
	function formatString(input) {
		return input.slice(0, 1).toUpperCase() + input.slice(1).toLowerCase();
	}
	
	// makeGroupCallback returns a function that is called when a group link is
	// clicked.  We set our group click events in a loop, which is why we make
	// a function instead of directly making a function in the loop.
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
		// Remove all elements from breadcrumbs except for currentGroup element.
		// If necessary, we'll modify the currentGroup element, or create
		// additional elements.
		removeNodesExceptFirst(breadcrumbs);
		// Modify the group and/or create two additional elements.
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
	
	// Attach event handlers to the navigation buttons.  Directly attaching a
	// function to the event doesn't work, so we have to use a function factory
	// to capture variables the function should use.
	var item;
	for (item = 0; item < groupAnchors.length; item += 1) {
		groupAnchors[item].addEventListener("click", makeGroupCallback(groupAnchors[item].innerText), false);
	}
	
	// Insert today's date into the time#today element on the page.
	dateElement.innerHTML = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();
	months = null;
	today = null;
	dateElement = null;
	
	// If the currentGroup gets clicked, determine if we're already looking at
	// overview.  If so, we don't need to update anything.  If we aren't, then
	// fire off a message so we can update.
	currentGroup.addEventListener("click", function (event) {
		if (breadcrumbs.children.length > 1) {
			core.publish("breadcrumb-clicked", currentGroup.innerText);
		}
		event.preventDefault();
	}, false);
	
	// Update the breadcrumbs if we change whats on the screen.
	core.subscribe("show-overview", function (group) {
		updateBreadcrumbs(group, null);
	});
	core.subscribe("show-breakdown", function (group, category) {
		updateBreadcrumbs(group, category);
	});
	
}("navigation", parent.document, dharma.core));