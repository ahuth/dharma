/*jslint vars: true, browser: true */
/*global dharma */

dharma.widget = (function (document, hogan) {
    "use strict";
    
    // helper is a div that is NOT in the DOM.  It helps us convert a string
    // to an actual HTML node.  I put it at the module-level so that we don't
    // have to repeatedly create and destroy it.
    var helper;
    
    // elementizeString creates an HTML element from a string, which allows us
    // to use appendChild() too add things to the page.  Using .innerHTML is
    // easier, but it will remove event handlers of items already there.
    function elementizeString(htmlString) {
        var elementNode = 1,
            firstNode;
        helper = helper || document.createElement("div");
        helper.innerHTML = htmlString;
        firstNode = helper.firstChild;
        // The first node may have been whitespace, so find the real first node.
        while (firstNode.nodeType !== elementNode) {
            firstNode = firstNode.nextSibling;
        }
        return firstNode;
    }
    
    // Returning this function allows us to use this module as a base for making
    // widgets.
    return function (name, successTemplate, failTemplate) {
        this.name = name;
        // reference will refer to the actual HTML element.  Once we have it,
        // we can remove the widget from the page without knowing where it is.
        var reference = null;
        // Templates stores pre-compiled mustache templates.  We pull these out
        // of the DOM.
        var templates = {
            success: hogan.compile(document.getElementById(successTemplate).innerHTML),
            fail: hogan.compile(document.getElementById(failTemplate).innerHTML)
        };
        // renderSuccess renders the success template and places it into the DOM.
        this.renderSuccess = function (destinationName, data) {
            var node = document.getElementById(destinationName);
            if (!node) {
                return false;
            }
            // If the widget has already been rendered, remove the previous one.
            if (reference) {
                this.remove();
            }
            node.appendChild(elementizeString(templates.success.render(data)));
            reference = document.getElementById(this.name);
        };
        // renderFail renders the fail template into the DOM.
        this.renderFail = function (destinationName) {
            var node = document.getElementById(destinationName);
            if (!node) {
                return false;
            }
            // If the widget has already been rendered, remove the previous one.
            if (reference) {
                this.remove();
            }
            node.appendChild(elementizeString(templates.fail.render({id: this.name})));
            reference = document.getElementById(this.name);
        };
        // removeMe removes the widget from the DOM.
        this.remove = function () {
            if (!reference) {
                return false;
            }
            reference.parent.removeChild(reference);
            reference = null;
        };
        // addEvent adds an event handler to the widget.
        this.addEvent = function (event, fn) {
            if (!reference) {
                return false;
            }
            reference.addEventListener(event, fn, false);
        };
    };
    
}(parent.document, parent.Hogan));