/*jslint vars: true, browser: true , plusplus: true*/
/*global dharma */

dharma.ajax = (function (window, rsvp) {
    "use strict";
    
    // Send a get request and return a promise object.  This promise object will
    // **eventually** hold the response text.
    function get(url, parameters, timeoutIn) {
        
        var done = 4, ok = 200;
        
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
    
    return {
		get: get
	};
    
}(parent.window, parent.RSVP));