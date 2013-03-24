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
			render.renderIntoOrdered("karma", "content", {"value": response.karma.value, "change": response.karma.change});
		}, function (value) {
            render.renderIntoOrdered("fail", "content", {id: "karma", order: "1"});
        });
        
        ajax.get("php/dharmaservice.php", "type=overview&what=quality&group=jenkintown").then(function (value) {
            render.renderIntoOrdered("quality", "content", {});
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