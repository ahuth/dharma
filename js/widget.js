/*jslint vars: true, browser: true */
/*global dharma */

// widget implements a base module that we will build off of for our widget
// modules.  This tells each widget how to render itself and how to manage
// event handlers.
dharma.widget = (function (document, hogan) {
    "use strict";
    
    // helper is a div that is NOT in the DOM.  It helps us convert a string
    // to an actual HTML node.  I put it at the module-level so that we don't
    // have to repeatedly create and destroy it.
    var helper = document.createElement("div");
    
    // elementizeString creates an HTML element from a string, which allows us
    // to use appendChild() too add things to the page.  Using .innerHTML is
    // easier, but it will remove event handlers of items already there.
    function elementizeString(htmlString) {
        var elementNode = 1,
            firstNode;
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
        // Templates stores pre-compiled mustache templates.  We pull the
        // uncompiled out of the page, and then compile them.
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
        // removeMe removes the widget from the page.
        this.remove = function () {
            if (!reference) {
                return false;
            }
            this.removeAllEvents();
            reference.parentNode.removeChild(reference);
            reference = null;
        };
        // addEvent adds an event handler to the widget.
        this.addEvent = function (event, fn) {
            if (!reference) {
                return false;
            }
            reference.addEventListener(event, fn, false);
        };
        // removeEvent removes the specified event handler from the widget.
        this.removeEvent = function (event, fn) {
            if (!reference) {
                return false;
            }
            reference.removeEventListener(event, fn, false);
        };
        // removeAllEvents removes every event handler for the widget.  This is
        // accomplished by cloning the node and overwriting the existing one.
        this.removeAllEvents = function () {
            var newNode;
            if (!reference) {
                return false;
            }
            newNode = reference.cloneNode(true);
            reference.parentNode.replaceChild(newNode, reference);
            reference = newNode;
        };
    };
    
}(parent.document, parent.Hogan));