var bitcoin = require('bitcoinjs-lib');
var request = require('request');

function signTx (unsignedTx, wif) {
    var privateKey = bitcoin.ECKey.fromWIF(wif)
    var tx = bitcoin.Transaction.fromHex(unsignedTx)
    var insLength = tx.ins.length
    for (var i = 0; i < insLength; i++) {
        tx.sign(i, privateKey)
    }
    return tx.toHex()
}

var key = 'L2PLo7LbQ3aRJaXvgwB4FLq6ZWqu1HVkPnN17kozq8RwGdhmdryX'; //adress:mpdTY6AteyXopN6wVH7KzpRvqaCiaDNekT
var txHex = '0100000001194caf1de7ddc2f0819db51ec7dcd056bbce7ab0b71c2e13b154a7b3734b22ec0100000000ffffffff0358020000000000001976a914bb6465c26b444baaad8e1136049c43c237cac35488ac0000000000000000086a06434302150005a3591309000000001976a91463f409ae53107596ed32d7cd8285d4f3c7978d8b88ac00000000';

var signedTxHex = signTx(txHex, key);
console.log("signedTxHex: ["+signedTxHex+"]");

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

var transaction = {
    'txHex': signedTxHex
}

postToApi('broadcast', transaction, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});