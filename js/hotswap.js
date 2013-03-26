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
            var response = JSON.parse(value),
                data = {
                    value: response.karma.value,
                    change: response.karma.change
                };
            render.renderInto("karma", "content", data);
        }, function (value) {
            render.renderInto("fail", "content", {id: "karma"});
        });
        
        // Request the quality data.  The first function passed to 'then' is
        // executed if the request is successful.  The second is executed if the
        // request fails.
        ajax.get("php/dharmaservice.php", "type=overview&what=quality&group=jenkintown").then(function (value) {
            var response = JSON.parse(value),
                data = {
                    turnbacks: response.quality.turnbacks,
                    scrap: response.quality.scrap
                };
            render.renderInto("quality", "content", data);
        }, function (value) {
            render.renderInto("fail", "content", {id: "quality"});
        });
        
        // Request the spending data.  The first function passed to 'then' is
        // executed if the request is successful.  The second is executed if the
        // request fails.
        ajax.get("php/dharmaservice.php", "type=overview&what=spending&group=jenkintown").then(function (value) {
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