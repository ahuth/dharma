/*jslint vars: true, browser: true */

var dharma = dharma || {};

dharma.render = (function (document, templates) {
	"use strict";
    
    function renderTo() {
        document.getElementById("content").innerHTML = templates.karma.render({"karma-value": "87", "karma-change": "-5%"});
    }
    
    return {
        renderTo: renderTo
    };
    
}(parent.document, dharma.templates));