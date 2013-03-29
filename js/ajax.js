/*jslint vars: true, browser: true */
/*global dharma */

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
                if (XHR.status === ok) {
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
    
}("ajax", parent.window, parent.RSVP, dharma.core));