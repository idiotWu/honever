export default () => {
    let ignore = /:hover/;
    let foreach = Function.prototype.call.bind(Array.prototype.forEach);

    foreach(document.styleSheets, (sheet) => {
        if (!sheet.cssRules) return;

        foreach(sheet.cssRules, (rule, index) => {
            let { cssText, selectorText } = rule;

            if (!selectorText) return;

            let newSelector = selectorText.split(',')
                .filter((str) => !ignore.test(str))
                .join(',');

            if (newSelector === selectorText) return;

            try {
                sheet.deleteRule(index);
                sheet.insertRule(
                    cssText.replace(selectorText, newSelector),
                    index
                );
            } catch(e) {}
        });
    });
};
