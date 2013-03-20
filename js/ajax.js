/*jslint vars: true, browser: true */

var dharma = dharma || {};

dharma.ajax = (function (XMLHttpRequest, RSVP) {
    "use strict";
    
    var done = 4, ok = 200;
	
	// Format a date to YYYMMDD.  We append this to the end of our Get request
	// so that the browser only caches the response for one day.
	function formatDate(currentDate) {
		var currentDay   = currentDate.getDate(),
			currentMonth = currentDate.getMonth() + 1,
			currentYear  = currentDate.getFullYear();
		
		return currentYear + currentMonth + currentDay;
	}
    
    // Send a get request and return a promise object.  This promise object will
    // **eventually** hold the response text.
    function get(url, parameters) {
		
		var today = new Date();
        
        if (typeof parameters === "string") {
            url += "?" + parameters + "&date=" + formatDate(today);
        }
        
        var XHR = new XMLHttpRequest(),
            promise = new RSVP.Promise();
        
        XHR.open("get", url, true);
        XHR.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
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
        get: get
    };

}(parent.XMLHttpRequest, parent.RSVP));