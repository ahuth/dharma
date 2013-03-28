/*jslint vars: true, browser: true */

// All of our modules will fall under the dharma object, so that we don't put
// stuff into the global namespace.  Because we define this object here, be sure
// to include this file before any of our modules.
var dharma = {};

// core implemenets a mediator allowing modules to communicate indirectly.
// They do this by subscribing to channels, reacting to messages published on
// channels, or publishing messages to channels.
dharma.core = (function () {
	"use strict";

	// channels contains our active subscriptions.  The key is the name of the
	// channel, and the value is an array of functions to execute if that channel
	// receives a message.
	var channels = {};
	
	// subscribe creates a new channel (if necessary) and adds a function its
	// array.
	function subscribe(topic, fn) {
		if (!channels.hasOwnProperty(topic)) {
			channels[topic] = [];
		}
		channels[topic].push(fn);
	}
	
	// unsubscribe removes a function from a channels array, and (if necessary)
	// removes the channel itself.
	function unsubscribe(topic, victim) {
		var i;
		if (!channels.hasOwnProperty(topic)) {
			return false;
		}
		for (i = 0; i < channels[topic].length; i += 1) {
			if (channels[topic][i] === victim) {
				if (channels[topic].length > 1) {
					channels[topic].splice(i, 1);
				} else {
					delete channels[topic];
					return;
				}
			}
		}
	}
	
	// publish calls all the functions stored for a particular channel.
	function publish(topic, msgs) {
		var i;
		if (channels.hasOwnProperty(topic)) {
			for (i = 0; i < channels[topic].length; i += 1) {
				channels[topic][i](msgs);
			}
		}
	}
	
	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		publish: publish
	};
	
}());