/*jslint vars: true, browser: true */

var dharma = dharma || {};

// render contains low-level (interacts directly with the DOM) functions that
// add or clear HTML elements from the page.
dharma.render = (function (document, errors, templates) {
	"use strict";
    
    // helper is a div node that helps us convert an html string to an actual
    // node.  It's a module-level variable so that we don't have to keep
    // creating and destroying it each time we want to use it.
    var helper;
    
    // convertStringToDom converts an html string to dom nodes.
    function convertStringToDom(htmlstring) {
        
        var elementNode = 1,
            firstNode;
        
        helper = helper || document.createElement("div");
        helper.innerHTML = htmlstring;
        firstNode = helper.firstChild;
        
        // Check to make sure that the firstChild was actually an element node,
        // and not, for example, whitespace.  If it isn't an element, then check
        // nextSiblings until we find it.
        while (firstNode.nodeType !== elementNode) {
            firstNode = firstNode.nextSibling;
        }
        
        return firstNode;
    }
	
	// clearInner removes all child elements from an HTML node.
	function clearInner(id) {
		document.getElementById(id).innerHTML = "";
	}
	
	// renderInto takes a hogan template and data, and appends the rendered HTML
	// to the provided element.
	function renderInto(templateName, id, data) {
		
		if (!templates.hasOwnProperty(templateName)) {
			errors.log("render", "renderInto", "Invalid template name");
			return;
		}
		
		var content = document.getElementById(id);
		content.innerHTML += templates[templateName].render(data);
	}
    
    // renderIntoOrdered appends a hogan template as a child to the given element,
    // in a specified order.  We need to do this if we want a specific order AND
    // we're making asynchronous requests.  The order is specified as a 'data-order' 
    // attribute on the html element.
    function renderIntoOrdered(templateName, id, data) {
        
		if (!templates.hasOwnProperty(templateName)) {
			errors.log("render", "renderIntoOrdered", "Invalid template name");
			return;
		}
        
        // We have seperate widget and widgetString variables because innerHTML
        // requires a string, while insertBefore() requires a DOM node.
        var content = document.getElementById(id),
            widgetString = templates[templateName].render(data),
            widget = convertStringToDom(widgetString),
            sections = content.querySelectorAll("[data-order]"),
            i;
        
        // Check the 'data-order' attribute for each element that's already on
        // the page.  If we find one bigger than the one we want to add, then
        // add our element before that one.  Otherwise, appened to the end.
        if (sections.length > 0) {
            for (i = 0; i < sections.length; i += 1) {
                if (sections[i].getAttribute("data-order") > widget.getAttribute("data-order")) {
                    content.insertBefore(widget, sections[i]);
                    return;
                }
            }
        }
        
        content.innerHTML += widgetString;
    }
    
	// Module API.
    return {
		clearInner: clearInner,
		renderInto: renderInto,
        renderIntoOrdered: renderIntoOrdered
    };
    
}(parent.document, dharma.errors, dharma.templates));