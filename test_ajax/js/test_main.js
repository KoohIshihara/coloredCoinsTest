// main.js
var bitcoin = require('bitcoinjs-lib');
var getAddress = require('./getAdress.js');

console.log(bitcoin);

window.onload = function () {
  $("#getAdress").click(function() {
    console.log(getAddress());
  });
};