/*jslint vars: true, browser: true */

var dharma = dharma || {};

// hotswap swaps out the entired contents of our "content" node.  It also makes
// any required ajax requests.
dharma.hotswap = (function (ajax, render) {
	"use strict";
	
	function showMain(level) {
		render.clearInner("content");
		render.renderInto("karma", "content", {});
		render.renderInto("quality", "content", {});
		render.renderInto("spending", "content", {});
		render.renderInto("production", "content", {});
	}
	
	return {
		showMain: showMain
	};
	
}(dharma.ajax, dharma.render));