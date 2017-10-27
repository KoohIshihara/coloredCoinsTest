// transfer.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');


var issuance_address = 'mpdTY6AteyXopN6wVH7KzpRvqaCiaDNekT';

var key = bitcoin.ECKey.makeRandom();
var to_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
var wif = key.toWIF();
console.log('new TESTNET address: ['+to_address+']');
console.log('Private Key of new address (WIF format): ['+wif+']');

var send_asset = {
    'from': [issuance_address],   
    'fee': 5000,
    'to': [{
      'address': to_address,
      'amount': 5,
      'assetId': 'La4GAS3p2cDPZRxY642ZVfSHUFNATQovtwVdqV'
    }]
};

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

postToApi('sendasset', send_asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});
