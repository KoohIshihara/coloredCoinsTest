var bitcoin = require('bitcoinjs-lib');
var request = require('request');

function postToApi(api_endpoint, json_data, callback) {
    console.log(api_endpoint+': ', JSON.stringify(json_data));
    request.post({
        url: 'http://testnet.api.coloredcoins.org:80/v3/'+api_endpoint,
        headers: {'Content-Type': 'application/json'},
        form: json_data
    }, 
    function (error, response, body) {
        if (error) {
            return callback(error);
        }
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        console.log('Status: ', response.statusCode);
        console.log('Body: ', JSON.stringify(body));
        return callback(null, body);
    });
};

var signedTxHex= '01000000010c872c4acd1e726bc13b6b3360645cab0a365e91c0f0ace5c8fe7dff0144daa5010000006a47304402202435e1bef91ae43cc993d803059d829cbb6a455a8d9ba2bc604a059a15e15d8c02204300ae6292acbac43ac593b5fcd4c6477fb0d0984bb568ed019e2967da12418b0121038cd70452bc373d2a132c16e2060efe2a162ba5beabfe65ebd771e226a7fdb309ffffffff0200000000000000003d6a3b43430201a2be80a85fa4325b6544be7b7bfa4f26a938c6549dfef52d41f2f2201a1fe1c5c94ec650495eb9df6c23f9c96d2f3737efb94311201210836f1309000000001976a91463f409ae53107596ed32d7cd8285d4f3c7978d8b88ac00000000';
var transaction = {
    'txHex': signedTxHex
}

postToApi('broadcast', transaction, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});