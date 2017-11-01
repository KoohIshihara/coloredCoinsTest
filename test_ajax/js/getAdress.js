// address.js
var bitcoin = require('bitcoinjs-lib');

var getAddress = function() {
  var key = bitcoin.ECKey.makeRandom();
  var address = key.pub.getAddress(bitcoin.networks.testnet).toString();
  var wif = key.toWIF();
  console.log('new TESTNET address: ['+address+']');
  console.log('Private Key of new address (WIF format): ['+wif+']');
  var result = {wif:wif, address: address};
  return result;
}

module.exports = getAddress;