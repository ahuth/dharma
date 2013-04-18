/*jslint vars: true, browser: true , plusplus: true*/
/*global dharma */

dharma.ajax = (function (window, rsvp, core) {
	"use strict";
	
	// constructParamsString creates an ajax get request string from an object
	// of arguments we want to send.
	function constructParamsString(args) {
		var item, parameters = "";
		for (item in args) {
			if (args.hasOwnProperty(item)) {
				if (parameters === "") {
					parameters = item + "=" + args[item];
				} else {
					parameters += "&" + item + "=" + args[item];
				}
			}
		}
		return parameters;
	}
	
	// Send a get request and return a promise object.  This promise object will
	// **eventually** hold the response text.
	function get(url, parameters, timeoutIn) {
		
		var done = 4, ok = 200;
		
		// If a timeout wasn't specified, set it to 4000 milliseconds.
		timeoutIn = timeoutIn || 4000;
		
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
		
		// If the response times out, reject the promise.
		timeout = setTimeout(function () {
			XHR.abort();
			promise.reject(XHR);
		}, timeoutIn);
		
		XHR.send();
		
		return promise;
	}
	
	core.subscribe("request-data", name, function (args) {
		if (!args) {
			return;
		}
		var params = constructParamsString(args),
			request = get("/dharma/php/dharmaservice.php", params, 4000);
		
		request.then(function (value) {
			if (!value) {
				core.publish("no-data", args);
				return;
			}
			core.publish("here's-data", JSON.parse(value));
		}, function () {
			core.publish("no-data", args);
		});
	});
	
}(parent.window, parent.RSVP, dharma.core));