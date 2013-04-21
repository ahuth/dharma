/*jslint vars: true, browser: true , plusplus: true*/
/*global dharma */

// ajax handles making Ajax requests to the server.
dharma.ajax = (function (name, window, rsvp, core) {
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
	function get(url, parameters, timeoutTime) {
		
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
				if (timeout) {
					window.clearTimeout(timeout);
				}
				if (XHR.status === ok && XHR.response !== null) {
					promise.resolve(XHR.responseText);
				} else {
					promise.reject(XHR);
				}
			}
		};
		
		// If we specified a timeoutTime, and the request takes longer than that
		// time, reject the promise.
		if (timeoutTime) {
			timeout = setTimeout(function () {
				XHR.abort();
				promise.reject(XHR);
			}, timeoutTime);
		}
		
		XHR.send();
		
		return promise;
	}
	
	core.subscribe("request-server-data", name, function (args) {
		if (!args) {
			return;
		}
		var params = constructParamsString(args),
			request = get("/dharma/php/dharmaservice.php", params, 4000);
		
		request.then(function (value) {
			if (!value || value === "") {
				core.publish("no-server-data", args);
				return;
			}
			core.publish("here's-server-data", JSON.parse(value));
		}, function () {
			core.publish("no-server-data", args);
		});
	});
	
}("ajax", parent.window, parent.RSVP, dharma.core));