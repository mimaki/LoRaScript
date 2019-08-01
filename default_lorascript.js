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

function onLoRaRx (data) {
  debug_print("on Recv data");
}
