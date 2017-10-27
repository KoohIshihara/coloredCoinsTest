function getHolder(api_endpoint, param) {
  //var data = { jsonrpc: "2.0", method: "hdwallet.getPrivateSeed", id:1 };
  var data = { jsonrpc: "2.0", method: "hdwallet.getPrivateSeed", id:1 };
  var url = 'http://testnet.api.coloredcoins.org:80/v3/' + api_endpoint + '/' + param;
  $.ajax(
  {
    url:url,
    type:'GET',
    data:JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json'
  })
  .done(function(data, textStatus, jqXHR ){
    console.log(data);
    console.log("getHolder() done.");
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log("failed");
    console.log(textStatus);
  });;
}
