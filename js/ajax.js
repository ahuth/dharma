/*jslint vars: true, browser: true */

var dharma = dharma || {};

dharma.ajax = (function (window, XMLHttpRequest, RSVP, errors) {
    "use strict";
    
    var done = 4, ok = 200;
    
    // Send a get request and return a promise object.  This promise object will
    // **eventually** hold the response text.
    function get(url, parameters) {
    
        if (typeof parameters === "string") {
            url += "?" + parameters;
        }
        
        var XHR = new XMLHttpRequest(),
            promise = new RSVP.Promise(),
            timeout;
        
        XHR.open("get", url, true);
        XHR.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        XHR.onreadystatechange = function () {
            if (XHR.readyState === done) {
                if (XHR.status === ok) {
                    window.clearTimeout(timeout);
                    if (XHR.responseText === null || XHR.responseText === 'null') {
                        errors.log("ajax", "get", "Null XMLHttpRequest response");
                        promise.reject(XHR);
                    } else {
                        promise.resolve(XHR.responseText);
                    }
                } else {
                    errors.log("ajax", "get", "XMLHttpRequest status = " + XHR.status);
                    promise.reject(XHR);
                }
            }
        };
        
        // If we don't get a response back in 4 seconds, abort the request and
        // reject the promise object.
        timeout = setTimeout(function () {
            XHR.abort();
            errors.log("ajax", "get", "XMLHttpRequest timed out");
            promise.reject(XHR);
        }, 4000);
        
        XHR.send();
        
        return promise;
    }
    
    // API of this module.
    return {
        get: get
    };

}(parent.window, parent.XMLHttpRequest, parent.RSVP, dharma.errors));