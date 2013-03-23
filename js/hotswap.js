/*jslint vars: true, browser: true */

var dharma = dharma || {};

// hotswap swaps out the entired contents of our "content" node.  It also makes
// any required ajax requests.
dharma.hotswap = (function (ajax, render) {
	"use strict";
	
	function showMain(level) {
		render.clearInner("content");
		
		ajax.get("php/dharmaservice.php", "type=overview&what=karma&group=jenkintown").then(function (value) {
			var response = JSON.parse(value);
			render.renderIntoInOrder("karma", "content", {"value": response.karma.value, "change": response.karma.change});
		});
        
        ajax.get("php/dharmaservice.php", "type=overview&what=quality&group=jenkintown").then(function (value) {
            render.renderIntoInOrder("quality", "content", {});
        });
        
        ajax.get("php/dharmaservice.php", "type=overview&what=spending&group=jenkintown").then(function (value) {
            render.renderIntoInOrder("spending", "content", {});
        });
        
        ajax.get("php/dharmaservice.php", "type=overview&what=production&group=jenkintown").then(function (value) {
            render.renderIntoInOrder("production", "content", {});
        });
	}
	
	return {
		showMain: showMain
	};
	
}(dharma.ajax, dharma.render));