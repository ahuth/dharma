/*jslint vars: true, browser: true */

var dharma = dharma || {};

// hotswap swaps out the entired contents of our "content" node.  It also makes
// any required ajax requests.
dharma.hotswap = (function (ajax, templates, render) {
	"use strict";
	
	var sections = {};
	
	sections.main = {
		karma: {
			template: templates.karma
		},
		quality: {
			template: templates.quality
		},
		spending: {
			template: templates.spending
		},
		production: {
			template: templates.production
		}
	};
	
	function showMain(level) {
		
		var section = sections.main,
			widget;
		
		render.clearInner("content");
		render.renderInto(section.karma.template, "content", {});
		render.renderInto(section.quality.template, "content", {});
		render.renderInto(section.spending.template, "content", {});
		//render.renderInto(section.production.template, "content", {});
	}
	
	return {
		showMain: showMain
	};
	
}(dharma.ajax, dharma.templates, dharma.render));