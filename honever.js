module.exports = function() {
    var ignore = /:hover/;
    var toArray = Function.prototype.call.bind(Array.prototype.slice);

    toArray(document.styleSheets).forEach(function(sheet) {
        if (!sheet.cssRules) return;
        var recoup = 0;

        toArray(sheet.cssRules).forEach(function(rule, idx) {
            var cssText = rule.cssText;
            var selectorText = rule.selectorText;

            if (!ignore.test(selectorText)) return;

            var newSelector = selectorText.split(',')
                .filter(function(str) {
                    return !ignore.test(str);
                })
                .join(',');

            var index = idx - recoup;
            sheet.deleteRule(index);

            try {
                sheet.insertRule(cssText.replace(selectorText, newSelector), index);
            } catch (e) {
                recoup++;
            }
        });
    });
};
