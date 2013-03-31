/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.spending = (function (me, document, accounting, hogan, ajax, core) {
    "use strict";
    
    // Hogan templates are stored in the DOM under script tags with type = "text/
    // mustache".  The browser doesn't recognize that, so ignores it.  We pull them
    // out here and pre-compile them.
    var templates = {
        success: hogan.compile(document.getElementById("spending-template").innerHTML),
        failure: hogan.compile(document.getElementById("fail-template").innerHTML)
    };
    
    // The default place we render into and remove items from is a div with an
    // id of "content".
    var content = document.getElementById("content");
    
    function renderInto(template, into, data) {
        into.innerHTML += template.render(data);
    }
    
    function removeFrom(from) {
        var node = document.getElementById(me);
        if (node === null) {
            return;
        }
        from.removeChild(node);
    }
    
    core.subscribe("clear-content", me, function () {
        removeFrom(content);
    });
    
    core.subscribe("show-overview", me, function (_group) {
        ajax.get({type: "overview", what: me, group: _group}).then(function (value) {
            var data;
            if (!value.hasOwnProperty(me)) {
                renderInto(templates.failure, content, {id: me});
                return;
            }
            data = {
                yesterday: accounting.formatMoney(value[me].yesterday, "$", 0),
                qtd: accounting.formatMoney(value[me].qtd, "$", 0),
                people: accounting.formatMoney(value[me].people, "$", 0),
                supplies: accounting.formatMoney(value[me].supplies, "$", 0),
                tools: accounting.formatMoney(value[me].tools, "$", 0),
                utilities: accounting.formatMoney(value[me].utilities, "$", 0),
                maintenance: accounting.formatMoney(value[me].maintenance, "$", 0),
                other: accounting.formatMoney(value[me].other, "$", 0)
            };
            renderInto(templates.success, content, data);
        }, function () {
            renderInto(templates.failure, content, {id: me});
        });
    });
    
}("spending", parent.document, parent.accounting, parent.Hogan, dharma.ajax, dharma.core));