module.exports = function() {
    var HOVER_PATTERN = /:hover/i;
    var toArray = Function.prototype.call.bind(Array.prototype.slice);

    toArray(document.styleSheets).forEach(function(sheet) {
        if (!sheet.cssRules) return;
        var recoup = 0;

        toArray(sheet.cssRules).forEach(function(rule, idx) {
            var cssText = rule.cssText;
            var selectorText = rule.selectorText;

            if (!HOVER_PATTERN.test(selectorText)) return;

            var newSelector = selectorText.split(',')
                .filter(function(str) {
                    return !HOVER_PATTERN.test(str);
                })
                .join(',');

            if (newSelector) {
                rule.selectorText = newSelector;
            } else {
                sheet.deleteRule(idx - recoup);
                recoup++;
            }
        });
    });
};
