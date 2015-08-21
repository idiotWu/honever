module.exports = function () {
    var ignore = /:hover/;
    var foreach = Function.prototype.call.bind(Array.prototype.forEach);

    foreach(document.styleSheets, function(sheet) {
        if (!sheet.cssRules) return;
        var recoup = 0;

        foreach(sheet.cssRules, function(rule, index) {
            var cssText = rule.cssText;
            var selectorText = rule.selectorText;

            if (!selectorText) return;

            var newSelector = selectorText.split(',').filter(function(str) {
                return !ignore.test(str);
            }).join(',');

            if (newSelector === selectorText) return;

            try {
                sheet.deleteRule(index);
                sheet.insertRule(cssText.replace(selectorText, newSelector), index);
            } catch (e) {}
        });
    });
};
