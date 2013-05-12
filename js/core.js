/*jslint vars: true, browser: true, plusplus: true */

// All of our modules will fall under the dharma object, so that we don't put
// stuff into the global namespace.  Because we define this object here, be sure
// to include this file before any of our modules.
var dharma = {};

// core implemenets a pub/sub system, allowing modules to communicate without
// being closely coupled.
dharma.core = (function () {
	"use strict";
	
	// subscriptions is a list of events and callback functions.  The name of
	// the event is the key, and the value is an array of callbacks.
	var subscriptions = {};
	
	// enqueue adds a function to the end of the event stack.  This allows anything
	// that's been waiting to run to execute first.
	function enqueue(fn, args) {
		setTimeout(function () {
			fn.apply(null, args);
		}, 1);
	}
	
	// subscribe adds a function to the list of callbacks for an event.
	function subscribe(event, callback) {
		if (typeof event !== "string" || typeof callback !== "function") {
			return;
		}
		if (!subscriptions.hasOwnProperty(event)) {
			subscriptions[event] = [];
		}
		subscriptions[event].push(callback);
	}

	// publish calls each callback function associated with an event.
	function publish(event) {
		if (!subscriptions.hasOwnProperty(event)) {
			return;
		}
		var item, args = [].slice.call(arguments, 1);
		for (item = 0; item < subscriptions[event].length; item++) {
			enqueue(subscriptions[event][item], args);
		}
	}

	return {
		subscribe: subscribe,
		publish: publish
	};
	
}());