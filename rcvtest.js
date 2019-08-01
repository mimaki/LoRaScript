//you can call send_lorawan_pkt(deveui,data,port) to send data to node through local lorawan server
//callback prototype 
//- function onInit() {}
//- function onLoRaWANRx(message){ }
//- function onLoRaRx (data) {}
//you can call debug_print(msg) to print log
//you can call send_pkt(data) to forward data
function onInit() {
  debug_print("on init");  
}

function dump(bin, len) {
  var x, y, hex;
//  debug_print('ofst: +0 +1 +2 +3 +4 +5 +6 +7 +8 +9 +A +B +C +D +E +F');

  y = 0;
  while (y < len) {
    hex = ('000' + y.toString(16)).substr(-4) + ':';
    x = 0;
    while (x<16) {
      hex += (' ' + ('0' + bin[y+x].toString(16)).substr(-2));
      x++;
      if (y+x >= len) break;
    }
    debug_print(hex);

    y += 16;
  }  
}

function onLoRaWANRx(message) {
  debug_print("onLoRaWANRx " + message);
  try {
    debug_print("message.time ", message.time);
    debug_print("message.data ", message.data);
  }
  catch(e) {
    debug_print("Exception " + e);
  }
}

function onLoRaRx(data) {
  debug_print("on Recv data");
  debug_print("data " + data);

  try {
    var rcv = JSON.parse(data);
    var base64str = rcv.data;
    // debug_print("base64str " + base64str);

    var buf = new Buffer(base64str, 'base64');
    debug_print("receive size " + buf.length);
    dump(buf, buf.length);
  }
  catch(e) {
    debug_print("Exception " + e);
  }
  finally {
    // debug_print("onLoRaRx finally");
  }
}
