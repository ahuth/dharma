/*jslint vars: true, browser: true */
/*global dharma */

dharma.render = (function (me, document, hogan, core) {
	"use strict";
    
	var templates = {
		karma: hogan.compile(document.getElementById("karma-template").innerHTML),
		quality: hogan.compile(document.getElementById("quality-template").innerHTML),
		spending: hogan.compile(document.getElementById("spending-template").innerHTML),
		production: hogan.compile(document.getElementById("production-template").innerHTML),
		fail: hogan.compile(document.getElementById("fail-template").innerHTML)
	};
    
    var content = document.getElementById("content");
    
    // Assuming that obj is an object with only one key-value pair, get that key
    // and return it.  If obj has more than one key, whichever one comes up first
    // will get returned.
    function getOnlyKey(obj) {
        var item;
        if (typeof obj !== "object") {
            return false;
        }
        for (item in obj) {
            if (obj.hasOwnProperty(item)) {
                return item;
            }
        }
    }
    
    core.subscribe("clear-content", me, function () {
        content.innerHTML = "";
    });
    
    core.subscribe("request-data-complete", me, function (data) {
        var item = getOnlyKey(data);
        if (!item) {
            return;
        }
        content.innerHTML += templates[item].render(data[item]);
        core.publish("template-rendered", item);
    });
    
    core.subscribe("request-data-failed", me, function (args) {
        var group = args.what;
        content.innerHTML += templates.fail.render({id: group});
    });
	
}("render", parent.document, parent.Hogan, dharma.core));