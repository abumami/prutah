var https = require('https');

export function convertCurrency(amount, fromCurrency, toCurrency, cb) {
    var apiKey = 'db1626a5da31614dd5d7';

    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    var query = fromCurrency + '_' + toCurrency;

    var url = 'https://free.currconv.com/api/v7/convert?q='
        + query + '&compact=ultra&apiKey=' + apiKey;

    //https://free.currconv.com/api/v7/convert?q=XAG_USD&compact=ultra&apiKey=db1626a5da31614dd5d7

    https.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            try {
                var jsonObj = JSON.parse(body);

                var val = jsonObj[query];
                if (val) {
                    var total = val * amount;
                    cb(null, Math.round(total * 100) / 100);
                } else {
                    var err = new Error("Value not found for " + query);
                    console.log(err);
                    cb(err);
                }
            } catch (e) {
                console.log("Parse error: ", e);
                cb(e);
            }
        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
        cb(e);
    });
}

//uncomment to test
/*
convertCurrency(10, 'USD', 'PHP', function(err, amount) {
  console.log(amount);
});
*/