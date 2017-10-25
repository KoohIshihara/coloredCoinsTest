var bitcoin = require('bitcoinjs-lib');
key = bitcoin.ECKey.makeRandom();
console.log('secret key:['+key+']');
address = key.pub.getAddress().toString();
console.log('new bitcoin address: ['+address+']');