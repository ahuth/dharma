/*jslint vars: true, browser: true */

var dharma = dharma || {};

// hotswap swaps out the entired contents of our "content" node.  It also makes
// any required ajax requests.
dharma.hotswap = (function (ajax, render) {
	"use strict";
	
    // showMain clears the contents of #content, then makes an ajax request for
    // each widget we want on the page.  Each request is made seperately, so that
    // a failure of one won't cause the others to fail.
	function showMain(level) {
        
		render.clearInner("content");
		
        // Request the karma data.  The first function passed to 'then' is
        // executed if the request is successful.  The second is executed if the
        // request fails.
		ajax.get("php/dharmaservice.php", "type=overview&what=karma&group=jenkintown").then(function (value) {
			var response = JSON.parse(value);
			render.renderInto("karma", "content", {"value": response.karma.value, "change": response.karma.change});
		}, function (value) {
            render.renderInto("fail", "content", {id: "karma"});
        });
        
        // Request the quality data.  The first function passed to 'then' is
        // executed if the request is successful.  The second is executed if the
        // request fails.
        ajax.get("php/dharmaservice.php", "type=overview&what=quality&group=jenkintown").then(function (value) {
            var response = JSON.parse(value),
                turnbacks = response.quality.turnbacks,
                scrap = response.quality.scrap;
            render.renderInto("quality", "content", {"turnbacks": turnbacks, "scrap": scrap});
        }, function (value) {
            render.renderInto("fail", "content", {id: "quality"});
        });
        
        // Request the spending data.  The first function passed to 'then' is
        // executed if the request is successful.  The second is executed if the
        // request fails.
        ajax.get("php/dharmaservice.php", "type=overview&what=spending&group=jenkintown").then(function (value) {
            render.renderInto("spending", "content", {});
        }, function (value) {
            render.renderInto("fail", "content", {id: "spending"});
        });
        
        // Request the production data.  The first function passed to 'then' is
        // executed if the request is successful.  The second is executed if the
        // request fails.
        ajax.get("php/dharmaservice.php", "type=overview&what=production&group=jenkintown").then(function (value) {
            render.renderInto("production", "content", {});
        }, function (value) {
            render.renderInto("fail", "content", {id: "production"});
        });
	}
	
	return {
		showMain: showMain
	};
	
}(dharma.ajax, dharma.render));