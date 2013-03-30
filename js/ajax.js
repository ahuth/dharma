/*jslint vars: true, browser: true */
/*global dharma */

// ajax handles all ajax requests.  Args are provided to this module as an object,
// but this module provides the url.  We do that so that requesting modules don't
// need to know anything about where the data is coming from or how.
dharma.ajax = (function (me, window, rsvp, core) {
	"use strict";
    
    // Send a get request and return a promise object.  This promise object will
    // **eventually** hold the response text.
    function get(url, parameters) {
        
        var done = 4, ok = 200;
    
        if (typeof parameters === "string") {
            url += "?" + parameters;
        }
        
        var XHR = new XMLHttpRequest(),
            promise = new rsvp.Promise(),
            timeout;
        
        XHR.open("get", url, true);
        XHR.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        XHR.onreadystatechange = function () {
            if (XHR.readyState === done) {
                window.clearTimeout(timeout);
                if (XHR.status === ok && XHR.response !== null) {
					promise.resolve(XHR.responseText);
                } else {
                    promise.reject(XHR);
                }
            }
        };
        
        // If we don't get a response back in 4 seconds, abort the request and
        // reject the promise object.
        timeout = setTimeout(function () {
            XHR.abort();
            promise.reject(XHR);
        }, 4000);
        
        XHR.send();
        
        return promise;
    }
	
	// Listen for any requests for ajax.  If we get one, make the request and
	// respond with a completion or failure message.  For both of these, we
	// include the args we originally got, so that requesting modules can
	// identifiy if it was their request that failed/suceeded.
	core.subscribe("request-data", me, function (args) {
		var item, parameters = "";
		for (item in args) {
			if (args.hasOwnProperty(item)) {
				parameters = parameters === "" ? item + "=" + args[item] : parameters + "&" + item + "=" + args[item];
			}
		}
		get("php/dharmaservice.php", parameters).then(function (value) {
			var response = JSON.parse(value);
			core.publish("request-data-complete", args, response);
		}, function () {
			core.publish("request-data-failed", args);
		});
	});
    
}("ajax", parent.window, parent.RSVP, dharma.core));