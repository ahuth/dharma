/*jslint vars: true, browser: true */

var dharma = dharma || {};

// templates contains the compiled hogan templates.  The un-compiled templates
// are stored directly in the DOM as <script> elements with type="template/mustache".
// Because the browser doesn't recognize that type, it ignores them.  Despite that,
// we can still retrieve everything within the <script> tags with innerHTML.
dharma.templates = (function (document, hogan) {
	"use strict";
    
    var karma      = hogan.compile(document.getElementById("karma-template").innerHTML),
		quality    = hogan.compile(document.getElementById("quality-template").innerHTML),
		spending   = hogan.compile(document.getElementById("spending-template").innerHTML),
		production = hogan.compile(document.getElementById("production-template").innerHTML),
        fail       = hogan.compile(document.getElementById("fail-template").innerHTML);
    
	// Module API.
    return {
        karma: karma,
		quality: quality,
		spending: spending,
		production: production,
        fail: fail
    };
    
}(parent.document, parent.Hogan));