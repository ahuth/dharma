/*jslint vars: true, browser: true */

// All of our modules will fall under the dharma object, so that we don't put
// stuff into the global namespace.  Because we define this object here, be sure
// to include this file before any of our modules.
var dharma = {};

// core implemenets a mediator allowing modules to communicate indirectly.
// They do this by subscribing to channels, reacting to messages published on
// channels, or publishing messages to channels.  Doing this means modules don't
// have to know anything about any others.
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
	
	// subscribe creates a new channel (if necessary), adds the caller as a key
	// in the channels[topic] object, and sets the function to that key's value.
	function subscribe(topic, caller, fn) {
		if (!channels.hasOwnProperty(topic)) {
			channels[topic] = {};
		}
		channels[topic][caller] = fn;
	}
	
	// unsubscribe removes a function/caller from the list of channels, and (if
	// necessary) removes the channel if no one is listening for it.
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
    
    // enqueue pulls a function out of the channels object in a format that we
    // can use with setTimeout.  This allows us to add it to the end of the event
    // stack and NOT block anything that needs to happen in the mean time.
    function enqueue(topic, item, args) {
        return function () {
            channels[topic][item].apply(null, args);
        };
    }
	
	// publish calls all the functions stored for a particular topic.  Any
	// arguments provided beyond 'topic' are passed along to the store function
	// as parameters.
	function publish(topic) {
		var item, args = [].slice.call(arguments, 1);
		if (channels.hasOwnProperty(topic)) {
			for (item in channels[topic]) {
                if (channels[topic].hasOwnProperty(item)) {
                    setTimeout(enqueue(topic, item, args), 1);
                }
            }
		}
	}
	
    // Core module API.
	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		publish: publish
	};
	
}());