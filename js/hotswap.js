/*jslint vars: true, browser: true */

var dharma = dharma || {};

// hotswap swaps out the entired contents of our "content" node.  It also makes
// any required ajax requests.
dharma.hotswap = (function (ajax, render, svgcharts) {
    "use strict";
    
    // showMain clears the contents of #content, then makes an ajax request for
    // each widget we want on the page.  Each request is made seperately, so that
    // a failure of one won't cause the others to fail.
    function showMain(level) {
    
        render.clearInner("content");
        
        // Request the karma data.  The first function passed to 'then' is
        // executed if the request is successful.  The second is executed if the
        // request fails.
        ajax.get("php/dharmaservice.php", "type=overview&what=karma&group=" + level).then(function (value) {
            var response = JSON.parse(value),
                data = {
                    value: response.karma.value,
                    change: response.karma.change
                };
            render.renderInto("karma", "content", data);
        }, function (value) {
            render.renderInto("fail", "content", {id: "karma"});
        });
        
		// Request the quality data.
        ajax.get("php/dharmaservice.php", "type=overview&what=quality&group=" + level).then(function (value) {
            var response = JSON.parse(value),
                data = {
                    turnbacks: response.quality.turnbacks,
                    scrap: response.quality.scrap
                };
            render.renderInto("quality", "content", data);
        }, function (value) {
            render.renderInto("fail", "content", {id: "quality"});
        });
        
		// Request the spending data.
        ajax.get("php/dharmaservice.php", "type=overview&what=spending&group=" + level).then(function (value) {
            var response = JSON.parse(value),
                data = {
                    yesterday: response.spending.yesterday,
                    qtd: response.spending.qtd,
                    people: response.spending.people,
                    supplies: response.spending.supplies,
                    tools: response.spending.tools,
                    utilities: response.spending.utilities,
                    maintenance: response.spending.maintenance,
                    other: response.spending.other
                };
            render.renderInto("spending", "content", data);
        }, function (value) {
            render.renderInto("fail", "content", {id: "spending"});
        });
        
		// Request the production data.
        ajax.get("php/dharmaservice.php", "type=overview&what=production&group=" + level).then(function (value) {
			var response = JSON.parse(value);
            render.renderInto("production", "content", {});
            svgcharts.drawBarChart('total-prod-chart', response.production.total, {bar_width: 20, bar_spacing: 46});
            svgcharts.drawBarChart('nuts-prod-chart', response.production.nuts, {bar_width: 20, bar_spacing: 46});
            svgcharts.drawBarChart('bolts-prod-chart', response.production.bolts, {bar_width: 20, bar_spacing: 46});
        }, function (value) {
            render.renderInto("fail", "content", {id: "production"});
        });
    }
    
    return {
        showMain: showMain
    };

}(dharma.ajax, dharma.render, dharma.svgcharts));