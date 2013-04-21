/*jslint vars: true, browser: true , plusplus: true*/
/*global dharma */

// datastore maintains a cache of data retrieved from the server.  When the app
// needs data, it first checks the cache.  If the data isn't present there, then
// we make an ajax request.
dharma.datastore = (function (name, core) {
	"use strict";
	
	var cache = {}, pending = {}, pendingNoBroadcast = {},
		cacheSize = 0, maxCacheSize = 50;
	
	// isCached determines if the cache contains the given key.
	function isCached(key) {
		return cache.hasOwnProperty(key);
	}
	
	// isPending determines if we have made a request for the given key but have
	// not received the response, yet.
	function isPending(key) {
		return pending.hasOwnProperty(key);
	}
	
	// isPendingNoBroadcast determines if we have made a request for the given key,
	// have not received the response, and don't want to broadcast its completion.
	function isPendingNoBroadcast(key) {
		return pendingNoBroadcast.hasOwnProperty(key);
	}
	
	// makeKey constructs a string key from an args object that we can use to
	// identify our cached objects.
	function makeKey(args) {
		return args.what + "-" + args.type + "-" + args.group;
	}
	
	// reduceCachedObjects removes 1 object from the cache by looping over the
	// cache keys, deleting the first one, and exiting the function.  The deleted
	// object could be any, and isn't necessarily the first one.
	function reduceCachedObjects() {
		var item;
		for (item in cache) {
			if (cache.hasOwnProperty(item)) {
				delete cache[item];
				return;
			}
		}
	}
	
	// Retrieve data from the cache or the server, and then broadcast the data.
	core.subscribe("request-data", name, function (args) {
		var key = makeKey(args),
			value;
		if (isCached(key)) {
			// Return the data from the cache.
			value = cache[key];
			if (!value) {
				core.publish("no-data", args);
				return;
			}
			core.publish("here's-data", value);
			return;
		}
		if (isPending(key)) {
			// Disregard the request.  When the pending ajax request completes,
			// the data will be sent out and cached.
			return;
		}
		// Make an ajax request for the data.  If we're over our max cache size,
		// delete something from the cache.
		if (cacheSize >= maxCacheSize) {
			reduceCachedObjects();
		} else {
			cacheSize++;
		}
		core.publish("request-server-data", args);
		pending[key] = true;
	});
	
	// Download data from the server (if it's not in the cache).  Do NOT broadcast
	// the data.
	core.subscribe("cache-data", name, function (args) {
		var key = makeKey(args),
			value;
		if (isCached(key) || isPending(key) || isPendingNoBroadcast(key)) {
			return;
		}
		// Make an ajax request for the data.  If we're over our max cache size,
		// delete something from the cache.
		if (cacheSize >= maxCacheSize) {
			reduceCachedObjects();
		} else {
			cacheSize++;
		}
		core.publish("request-server-data", args);
		pendingNoBroadcast[key] = true;
	});
	
	core.subscribe("here's-server-data", name, function (response) {
		var key = makeKey({
			type: response.type,
			group: response.group,
			what: response.what
		});
		// Add the server response to the cache, and remove it from the pending
		// list.
		cache[key] = response;
		if (isPendingNoBroadcast(key)) {
			delete pendingNoBroadcast[key];
			return;
		}
		delete pending[key];
		// Send out the response.
		core.publish("here's-data", response);
	});
	
	core.subscribe("no-server-data", name, function (args) {
		var key = makeKey({
			type: args.type,
			group: args.group,
			what: args.what
		});
		// Store unfulfilled server responses in the cache as 'false' and remove
		// it from the pending list.
		if (isPendingNoBroadcast(key)) {
			delete pendingNoBroadcast[key];
			return;
		}
		cache[key] = false;
		delete pending[key];
		// Send a notification that no data was retrieved.
		core.publish("no-data", args);
	});
	
}("datastore", dharma.core));