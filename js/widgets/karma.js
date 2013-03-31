/*jslint vars: true, browser: true, nomen: true */
/*global dharma */

dharma.karma = (function (me, document, hogan, ajax, core) {
    "use strict";
    
    var templates = {
        success: hogan.compile(document.getElementById("karma-template").innerHTML),
        failure: hogan.compile(document.getElementById("fail-template").innerHTML)
    };
    
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
        // TODO - remove event listeners.
        removeFrom(content);
    });
    
    core.subscribe("show-overview", me, function (_group) {
        ajax.get({type: "overview", what: me, group: _group}).then(function (value) {
            if (!value.hasOwnProperty(me)) {
                renderInto(templates.failure, content, {id: me});
                return;
            }
            renderInto(templates.success, content, value[me]);
            // TODO - add event listeners.
        }, function () {
            renderInto(templates.failure, content, {id: me});
        });
    });
    
}("karma", parent.document, parent.Hogan, dharma.ajax, dharma.core));