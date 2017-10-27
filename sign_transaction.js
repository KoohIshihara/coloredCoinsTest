// sign_transaction.js
var bitcoin = require('bitcoinjs-lib');

function signTx (unsignedTx, wif) {
    var privateKey = bitcoin.ECKey.fromWIF(wif)
    var tx = bitcoin.Transaction.fromHex(unsignedTx)
    var insLength = tx.ins.length
    for (var i = 0; i < insLength; i++) {
        tx.sign(i, privateKey)
    }
    return tx.toHex()
}

var key = 'L2PLo7LbQ3aRJaXvgwB4FLq6ZWqu1HVkPnN17kozq8RwGdhmdryX';
// e.g. var key = 'KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn';
var txHex = '01000000010c872c4acd1e726bc13b6b3360645cab0a365e91c0f0ace5c8fe7dff0144daa50100000000ffffffff0200000000000000003d6a3b43430201a2be80a85fa4325b6544be7b7bfa4f26a938c6549dfef52d41f2f2201a1fe1c5c94ec650495eb9df6c23f9c96d2f3737efb94311201210836f1309000000001976a91463f409ae53107596ed32d7cd8285d4f3c7978d8b88ac00000000';
// e.g. txHex = '0100000001e0cd69ce93aded7a8d51063ed5f7bb5c9cdcc885a93fa629574dedb2cd5b48ad0100000000ffffffff020000000000000000086a06434301050110b8820100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000'

var signedTxHex = signTx(txHex, key);
console.log("signedTxHex: ["+signedTxHex+"]");