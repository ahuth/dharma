/*jslint vars: true, browser: true , plusplus: true*/
/*global dharma */

dharma.datastore = (function (name, core) {
	"use strict";
	
	var cache = {}, pending = {}, cacheSize = 0;
	
	function isCached(key) {
		return cache.hasOwnProperty(key);
	}
	
	function isPending(key) {
		return pending.hasOwnProperty(key);
	}
	
	function makeKey(args) {
		return args.what + "-" + args.type + "-" + args.group;
	}
	
	core.subscribe("request-data", name, function (args) {
		var key = makeKey(args);
		if (isCached(key)) {
			// Return the data from the cache.
			return;
		}
		if (isPending(key)) {
			// Disregard the request.
			return;
		}
		// Make an ajax request for the data.
	});
	
}("datastore", dharma.core));