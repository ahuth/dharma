/*jslint vars: true, browser: true */
/*global dharma */

// ajax handles all ajax requests.  Args are provided to this module as an object,
// but this module provides the url.  We do that so that requesting modules don't
// need to know anything about where the data is coming from or how.
dharma.ajax = (function (name, window, rsvp, core) {
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
                if (XHR.status === ok && XHR.response !== null) {
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
    
    core.subscribe("request-data", name, function (args) {
        get("/dharma/php/dharmaservice.php", constructParamsString(args)).then(function (value) {
            core.publish("here's-data", args, JSON.parse(value));
        }, function () {
            core.publish("no-data", args);
        });
    });
    
}("ajax", parent.window, parent.RSVP, dharma.core));