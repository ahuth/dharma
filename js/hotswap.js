/*jslint vars: true, browser: true */

var dharma = dharma || {};

// hotswap swaps out the entired contents of our "content" node.  It also makes
// any required ajax requests.
dharma.hotswap = (function (ajax, templates, render) {
	"use strict";
	
	function showMain(level) {
		render.clearInner("content");
		render.renderInto(templates.karma, "content", {});
		render.renderInto(templates.quality, "content", {});
		render.renderInto(templates.spending, "content", {});
		//render.renderInto(templates.production, "content", {});
	}
	
	return {
		showMain: showMain
	};
	
}(dharma.ajax, dharma.templates, dharma.render));