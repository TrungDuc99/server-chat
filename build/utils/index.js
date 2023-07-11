"use strict";
var that = (module.exports = {
    checkMissingParams: function (arrCheck, arrQuery) {
        /*
                Check missing params
                arrCheck - params can check [LOGIN, FK100, ...]
                arrQuery - params nhan duoc tu reques [LOGIN, FK100, QV101 ...]
      
                return
                {flag: false, code: `Missing ${element}`}
                {flag: true, code: 'is Okay'}
            */
        console.log('[2021]:::checkMissingParams::::', arrCheck, arrQuery);
        for (var i = 0; i < arrCheck.length; i++) {
            var element = arrCheck[i];
            if (!arrQuery.includes(element)) {
                return { flag: false, code: "Missing ".concat(element) };
            }
        }
        return { flag: true, code: 'is Okay' };
    },
});
// https://docs.mongodb.com/manual/crud/
// https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
// https://binance-docs.github.io/apidocs/spot/en/#change-log
// https://www.npmjs.com/package/jsonwebtoken
