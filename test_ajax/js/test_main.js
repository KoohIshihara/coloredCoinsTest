// main.js
var bitcoin = require('bitcoinjs-lib');
var getAddress = require('./getAdress.js');

console.log(bitcoin);

window.onload = function () {
  $("#libtest").click(function() {
    console.log(getAddress());
  });
};