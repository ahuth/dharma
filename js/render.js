/*jslint vars: true, browser: true */

var dharma = dharma || {};

// render contains low-level (interacts directly with the DOM) functions that
// add or clear HTML elements from the page.
dharma.render = (function (document, errors, templates) {
    "use strict";
    
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
    
    // Module API.
    return {
        clearInner: clearInner,
        renderInto: renderInto
    };

}(parent.document, dharma.errors, dharma.templates));