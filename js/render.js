/*jslint vars: true, browser: true */

var dharma = dharma || {};

// render contains low-level (interacts directly with the DOM) functions that
// add or clear HTML elements from the page.
dharma.render = (function (document, console, templates) {
	"use strict";
	
	// clearInner removes all child elements from an HTML node.
	function clearInner(id) {
		document.getElementById(id).innerHTML = "";
	}
	
	// renderInto takes a hogan template and data, and appends the rendered HTML
	// to the provided element (id).
	function renderInto(templateName, id, data) {
		
		// Make sure that the template name provided to this function actually
        // exists.
		if (!templates.hasOwnProperty(templateName)) {
			console.log("render module (renderInto): invalid template name");
			return;
		}
		
		var content = document.getElementById(id);
		content.innerHTML += templates[templateName].render(data);
	}
    
	// Module API.
    return {
		clearInner: clearInner,
		renderInto: renderInto
    };
    
}(parent.document, parent.console, dharma.templates));