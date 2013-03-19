/*jslint vars: true, browser: true */

var dharma = dharma || {};

// render contains low-level (interacts directly with the DOM) functions that
// add or clear HTML elements from the page.
dharma.render = (function (document, console) {
	"use strict";
	
	// clearInner removes all child elements from an HTML node.
	function clearInner(id) {
		document.getElementById(id).innerHTML = "";
	}
	
	// renderInto takes a hogan template and data, and appends the rendered HTML
	// to the provided element (id).
	function renderInto(template, id, data) {
		
		// Since variables don't have types, make sure that the "template" has
		// a 'render' function.
		if (typeof template.render !== "function") {
			console.log("render module (renderInto): invalid template");
			return;
		}
		
		var content = document.getElementById(id);
		content.innerHTML += template.render(data);
	}
    
	// Module API.
    return {
		clearInner: clearInner,
		renderInto: renderInto
    };
    
}(parent.document, parent.console));