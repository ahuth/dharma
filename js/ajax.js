/*jslint vars: true, browser: true */

var dharma = dharma || {};

dharma.ajax = (function (XMLHttpRequest, RSVP) {
    "use strict";
    
    var done = 4, ok = 200;
    
    // Send a post request and return a promise object.  This promise object will
    // **eventually** hold the response text.
    function post(url, parameters) {
    
        parameters = parameters || '';
        
        var XHR = new XMLHttpRequest(),
            promise = new RSVP.Promise();
        
        XHR.open('post', url, true);
        XHR.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        XHR.onreadystatechange = function () {
            if (XHR.readyState === done) {
				if (XHR.status === ok) {
					promise.resolve(XHR.responseText);
				} else {
					promise.reject(XHR);
				}
            }
        };
        XHR.send(parameters);
        
        return promise;
    }
    
    // Send a get request and return a promise object.
    function get(url, parameters) {
        
        if (typeof parameters === 'string') {
            url += "?" + parameters;
        }
        
        var XHR = new XMLHttpRequest(),
            promise = new RSVP.Promise();
        
        XHR.open('get', url, true);
        XHR.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        XHR.onreadystatechange = function () {
            if (XHR.readyState === done) {
				if (XHR.status === ok) {
					promise.resolve(XHR.responseText);
				} else {
					promise.reject(XHR);
				}
            }
        };
        XHR.send();
        
        return promise;
    }
    
    // API of this module.
    return {
        post: post,
        get: get
    };

}(parent.XMLHttpRequest, parent.RSVP));