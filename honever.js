function honever() {
    var ignore = /:hover/;
    var foreach = Function.prototype.call.bind(Array.prototype.forEach);

    foreach(document.styleSheets, function(sheet) {
        if (!sheet.cssRules) return;
        var recoup = 0;

        foreach(sheet.cssRules, function(rule, idx) {
            console.log(idx, sheet.cssRules.length)
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

module.exports = honever;