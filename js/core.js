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
    
    // objectSize returns the number of keys in an object.
    function objectSize(obj) {
        var item,
            size = 0;
        if (typeof obj !== "object") {
            return 0;
        }
        for (item in obj) {
            if (obj.hasOwnProperty(item)) {
                size += 1;
            }
        }
        return size;
    }
	
	// subscribe creates a new channel (if necessary) and adds a function its
	// array.
	function subscribe(topic, caller, fn) {
		if (!channels.hasOwnProperty(topic)) {
			channels[topic] = {};
		}
		channels[topic][caller] = fn;
	}
	
	// unsubscribe removes a function from a channels array, and (if necessary)
	// removes the channel itself.
	function unsubscribe(topic, victim) {
		var item;
		if (!channels.hasOwnProperty(topic)) {
			return false;
		}
        for (item in channels[topic]) {
            if (channels[topic].hasOwnProperty(item)) {
                if (item === victim) {
                    if (objectSize(channels[topic]) > 1) {
                        delete channels[topic][item];
                    } else {
                        delete channels[topic];
                    }
                }
            }
        }
	}
	
	// publish calls all the functions stored for a particular channel.
	function publish(topic, msgs) {
		var item;
		if (channels.hasOwnProperty(topic)) {
			for (item in channels[topic]) {
                if (channels[topic].hasOwnProperty(item)) {
                    channels[topic][item](msgs);
                }
            }
		}
	}
	
	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		publish: publish
	};
	
}());