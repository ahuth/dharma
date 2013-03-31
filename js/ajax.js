/*jslint vars: true, browser: true */
/*global dharma */

dharma.ajax = (function (window, XMLHttpRequest, RSVP) {
    "use strict";
    
    var done = 4, ok = 200;
    
    function makeGetString(args) {
        var item, parameters = "";
        for (item in args) {
            if (args.hasOwnProperty(item)) {
                if (parameters === "") {
                    parameters = "?" + item + "=" + args[item];
                } else {
                    parameters += "&" + item + "=" + args[item];
                }
            }
        }
        return parameters;
    }
    
    // Send a get request and return a promise object.  This promise object will
    // **eventually** hold the response text.
    function get(args) {
        
        var XHR = new XMLHttpRequest(),
            promise = new RSVP.Promise(),
            url = "php/dharmaservice.php" + makeGetString(args),
            timeout;
        
        XHR.open("get", url, true);
        XHR.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        XHR.onreadystatechange = function () {
            if (XHR.readyState === done) {
                window.clearTimeout(timeout);
                if (XHR.status === ok && XHR.responseText !== null) {
                    promise.resolve(JSON.parse(XHR.responseText));
                } else {
                    promise.reject(args);
                }
            }
        };
        
        // If we don't get a response back in 4 seconds, abort the request and
        // reject the promise object.
        timeout = setTimeout(function () {
            XHR.abort();
            promise.reject(args);
        }, 4000);
        
        XHR.send();
        
        return promise;
    }
    
    // API of this module.
    return {
        get: get
    };

}(parent.window, parent.XMLHttpRequest, parent.RSVP));