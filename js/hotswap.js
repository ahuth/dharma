/*jslint vars: true, browser: true */

var dharma = dharma || {};

// hotswap swaps out the entired contents of our "content" node.  It also makes
// any required ajax requests.
dharma.hotswap = (function (ajax, render) {
	"use strict";
	
    // showMain clears the contents of #content, then makes an ajax request for
    // each widget we want on the page.  I make each request seperately, so that
    // if one (or more) of them fails, the rest will still load correctly.
	function showMain(level) {
        
		render.clearInner("content");
		
		ajax.get("php/dharmaservice.php", "type=overview&what=karma&group=jenkintown").then(function (value) {
			var response = JSON.parse(value);
			render.renderIntoOrdered("karma", "content", {"value": response.karma.value, "change": response.karma.change});
		}, function (value) {
            render.renderIntoOrdered("fail", "content", {id: "karma", order: "1"});
        });
        
        ajax.get("php/dharmaservice.php", "type=overview&what=quality&group=jenkintown").then(function (value) {
            var response = JSON.parse(value),
                turnbacks = response.quality.turnbacks,
                scrap = response.quality.scrap;
            render.renderIntoOrdered("quality", "content", {"turnbacks": turnbacks, "scrap": scrap});
        }, function (value) {
            render.renderIntoOrdered("fail", "content", {id: "quality", order: "2"});
        });
        
        ajax.get("php/dharmaservice.php", "type=overview&what=spending&group=jenkintown").then(function (value) {
            render.renderIntoOrdered("spending", "content", {});
        }, function (value) {
            render.renderIntoOrdered("fail", "content", {id: "spending", order: "3"});
        });
        
        ajax.get("php/dharmaservice.php", "type=overview&what=production&group=jenkintown").then(function (value) {
            render.renderIntoOrdered("production", "content", {});
        }, function (value) {
            render.renderIntoOrdered("fail", "content", {id: "production", order: "4"});
        });
	}
	
	return {
		showMain: showMain
	};
	
}(dharma.ajax, dharma.render));