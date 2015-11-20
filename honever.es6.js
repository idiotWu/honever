export default () => {
    let HOVER_PATTERN = /:hover/;

    [...document.styleSheets].forEach((sheet) => {
        if (!sheet.cssRules) return;
        let recoup = 0;

        // make a copy of origin css rules
        [...sheet.cssRules].forEach((rule, idx) => {
            let { cssText, selectorText } = rule;

            if (!HOVER_PATTERN.test(selectorText)) return;

            let newSelector = selectorText.split(',')
                .filter((str) => !HOVER_PATTERN.test(str))
                .join(',');

            if (newSelector) {
                rule.selectorText = newSelector;
            } else {
                // empty selector will cause error
                // add up error count to fix insert/delete index
                sheet.deleteRule(idx - recoup);
                recoup++;
            }
        });
    });
};
