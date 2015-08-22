export default () => {
    let ignore = /:hover/;

    [...document.styleSheets].forEach((sheet) => {
        if (!sheet.cssRules) return;
        let recoup = 0;

        // make a copy of origin css rules
        [...sheet.cssRules].forEach((rule, idx) => {
            let { cssText, selectorText } = rule;

            if (!ignore.test(selectorText)) return;

            let newSelector = selectorText.split(',')
                .filter((str) => !ignore.test(str))
                .join(',');

            let index = idx - recoup;
            sheet.deleteRule(index);

            try {
                sheet.insertRule(cssText.replace(selectorText, newSelector), index);
            } catch(e) {
                // empty selector or other reason will cause insert error
                // add up error count to fix insert/delete index
                recoup++;
            }
        });
    });
};
