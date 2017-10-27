// issue.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');

/*
key = bitcoin.ECKey.makeRandom();
new_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
*/

adress = 'mpdTY6AteyXopN6wVH7KzpRvqaCiaDNekT';

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

var asset = {
    issueAddress: adress,
    amount: 100,
    fee: 5000,
    metadata: {
    assetName: "Kooh Ticket",        
    issuer: "Kooh", 
    description: "Kooh's surper special miracle peformance",
    urls: [
      {name: 'Wired Article',url: 'http://www.wired.com/2015/08/lexus-hoverboard/', mimeType: 'text/html', dataHash: '66111ceeed2b7bb977dc2354e870a655a91f2c6909347bf53d3d7918b5743fc'},
      {name: 'utube promo',url: 'https://youtu.be/q_BYvUlDviM',  mimeType: 'text/html', dataHash: '15b7c49342a7b74dfbc98506930f84ff55cc0839a8960a991b5103a44aeb20a'}
              ],
    userData :{
      meta: [
        {key: 'Weight', value: 1234, type: 'Number'},
        {key: 'Model',  value: "Magneto", type: 'String'},
        {key: 'In Stock', value: true, type: 'Boolean'}
             ],
      price: 1234567,
      "technical specification": 'In a weak applied field, a superconductor expels nearly all magnetic flux. It does this by setting up electric currents near its surface. The magnetic field of these surface currents cancels the applied magnetic field within the bulk of the superconductor. As the field expulsion, or cancellation, does not change with time, the currents producing this effect (called persistent currents) do not decay with time. Therefore the conductivity can be thought of as infinite: a superconductor. Near the surface, within a distance called the London penetration depth, the magnetic field is not completely cancelled. Each superconducting material has its own characteristic penetration depth. Any perfect conductor will prevent any change to magnetic flux passing through its surface due to ordinary electromagnetic induction at zero resistance. The Meissner effect is distinct from this: when an ordinary conductor is cooled so that it makes the transition to a superconducting state in the presence of a constant applied magnetic field, the magnetic flux is expelled during the transition. This effect cannot be explained by infinite conductivity alone. Its explanation is more complex and was first given in the London equations by the brothers Fritz and Heinz London. It should thus be noted that the placement and subsequent levitation of a magnet above an already superconducting material does not demonstrate the Meissner effect, while an initially stationary magnet later being repelled by a superconductor as it is cooled through its critical temperature does.'
    } 
  }
};

postToApi('issue', asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});

/*
issue:  {"issueAddress":"mpdTY6AteyXopN6wVH7KzpRvqaCiaDNekT","amount":1,"fee":5000}
Status:  200
Body:  {"txHex":"0100000001346995d6f703baeee797ec5e4ef7a65d9b067c797960bb5046634c5ae08ff54c0100000000ffffffff020000000000000000086a064343020501106ffbdb11000000001976a91463f409ae53107596ed32d7cd8285d4f3c7978d8b88ac00000000","assetId":"La9vagEzp673sBJC772Nu8wGVs81QWNCHv6gsM","coloredOutputIndexes":[1]}
*/


/*
issue:  {"issueAddress":"mpdTY6AteyXopN6wVH7KzpRvqaCiaDNekT","amount":100,"fee":5000,"metadata":{"assetName":"Kooh Ticket","issuer":"Kooh","description":"Kooh's surper special miracle peformance","urls":[{"name":"Wired Article","url":"http://www.wired.com/2015/08/lexus-hoverboard/","mimeType":"text/html","dataHash":"66111ceeed2b7bb977dc2354e870a655a91f2c6909347bf53d3d7918b5743fc"},{"name":"utube promo","url":"https://youtu.be/q_BYvUlDviM","mimeType":"text/html","dataHash":"15b7c49342a7b74dfbc98506930f84ff55cc0839a8960a991b5103a44aeb20a"}],"userData":{"meta":[{"key":"Weight","value":1234,"type":"Number"},{"key":"Model","value":"Magneto","type":"String"},{"key":"In Stock","value":true,"type":"Boolean"}],"price":1234567,"technical specification":"In a weak applied field, a superconductor expels nearly all magnetic flux. It does this by setting up electric currents near its surface. The magnetic field of these surface currents cancels the applied magnetic field within the bulk of the superconductor. As the field expulsion, or cancellation, does not change with time, the currents producing this effect (called persistent currents) do not decay with time. Therefore the conductivity can be thought of as infinite: a superconductor. Near the surface, within a distance called the London penetration depth, the magnetic field is not completely cancelled. Each superconducting material has its own characteristic penetration depth. Any perfect conductor will prevent any change to magnetic flux passing through its surface due to ordinary electromagnetic induction at zero resistance. The Meissner effect is distinct from this: when an ordinary conductor is cooled so that it makes the transition to a superconducting state in the presence of a constant applied magnetic field, the magnetic flux is expelled during the transition. This effect cannot be explained by infinite conductivity alone. Its explanation is more complex and was first given in the London equations by the brothers Fritz and Heinz London. It should thus be noted that the placement and subsequent levitation of a magnet above an already superconducting material does not demonstrate the Meissner effect, while an initially stationary magnet later being repelled by a superconductor as it is cooled through its critical temperature does."}}}
Status:  500
Body:  {"explanation":"address mpdTY6AteyXopN6wVH7KzpRvqaCiaDNekT does not have any unused outputs","code":20003,"status":500,"name":"NotEnoughFundsError","message":"Not enough satoshi to cover transaction","type":"issuance"}
*/



