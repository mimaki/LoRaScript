//you can call send_lorawan_pkt(deveui,data,port) to send data to node through local lorawan server
//callback prototype 
//- function onInit() {}
//- function onLoRaWANRx(message){ }
//- function onLoRaRx (data) {}
//you can call debug_print(msg) to print log
//you can call send_pkt(data) to forward data
function onInit() {
  debug_print("on init");
  setInterval(onInterval, 60000);   // 60sec
}

function onInterval() {
  debug_print("on interval");
}

const DATATYPES = [
  'unknown',
  'Acceleration',
  'Gyro',
  'Geo-magetic',
  'Temperature',
  'Humidity',
  'Air-pressure',
  'Illuminance',
  '',
  'GPS(GGA)',
  'GPS(VTG)'
];
DATATYPES[0x32] = 'Battery';
DATATYPES[0xff] = 'Custom';

const https = require('https');
// https://maker.ifttt.com/trigger/plato/with/key/bu9hN2X6p-vMdbxqCmAEcpeEGd2bwckakT7lTxQKe4F
const IFTTT_HOST = 'maker.ifttt.com';
const IFTTT_EVENT = 'plato';
const IFTTT_KEY = 'mm1ZpCyvXwZn8Cj0eUqt9Sm5XK15Idf5lKf6yY84Xrf';
const IFTTT_PATH = '/trigger/' + IFTTT_EVENT + '/with/key/' + IFTTT_KEY;

function ifttt(devid, dtype, values) {
  var postData = {
    "value1": devid,
    "value2": dtype,
    "value3": JSON.stringify(values)
  };
  var postDataStr = JSON.stringify(postData);
  var options = {
    host: IFTTT_HOST,
    port: 443,
    path: IFTTT_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postDataStr.length
    }
  }
  var req = https.request(options, (res) => {
    debug_print('STATUS: ' + res.statusCode);
    debug_print('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      debug_print('BODY: ' + chunk);
    });
  });
  req.on('error', (e) => {
    debug_print('problem with request: ' + e.message);
  });
  req.write(postDataStr);
  req.end();
}

// function dump(bin, len) {
//   var x, y, hex;
// //  debug_print('ofst: +0 +1 +2 +3 +4 +5 +6 +7 +8 +9 +A +B +C +D +E +F');

//   y = 0;
//   while (y < len) {
//     hex = ('000' + y.toString(16)).substr(-4) + ':';
//     x = 0;
//     while (x<16) {
//       hex += (' ' + ('0' + bin[y+x].toString(16)).substr(-2));
//       x++;
//       if (y+x >= len) break;
//     }
//     debug_print(hex);

//     y += 16;
//   }  
// }

function dump(bin, len) {
  var x, hex = '';

  x = 0;
  while (x < len) {
    hex += (('0' + bin[x].toString(16)).substr(-2) + ' ');
    x++;
  }
  debug_print(hex);
}

function onLoRaWANRx(message) {
  debug_print("onLoRaWANRx");
  debug_print("message: " + JSON.stringify(message));
  var json = JSON.stringify(message);
  var rcv = JSON.parse(json);
  rcv = message;

  debug_print("devaddr:" + rcv.devaddr + ", deveui:" + rcv.deveui + ", size:" + rcv.size + ", data:" + rcv.data);

  var i;
  var buf = new Buffer(rcv.b64_data, 'base64');
//   var devid = [];
//   for (i=; i<3; i++) {
//     devid[i] = buf[i+1];
//   }
  var dtype = buf[0];
  var devid = rcv.data.substr(2, 6);
  debug_print("devid=" + devid + ', dtype=' + dtype);

  var val = [];
  switch (dtype) {
  case 0x01:    // Acceleration
  case 0x02:    // Gyro
  case 0x03:    // Geo-magnetic
    val[0] = buf.readFloatLE(4);
    val[1] = buf.readFloatLE(8);
    val[2] = buf.readFloatLE(12);
    break;
  case 0x04:    // Temperature
  case 0x05:    // Humidity
  case 0x06:    // Air-pressure
  case 0x07:    // Illuminance
    val[0] = buf.readFloatLE(4);
    break;
  case 0x09:    // GPS(GGA)
  case 0x0a:    // GPS(VTG)
    val[0] = buf.readFloatLE(4);
    val[1] = buf.readFloatLE(8);
    val[2] = buf.readFloatLE(12);
    val[3] = buf.readFloatLE(16);
    break;
  case 0x32:
    val[0] = buf[4];
    val[1] = buf[5];
    break;
  }
  for (i = 0; i < val.length; i++) {
    debug_print("val[" + i + "] = " + val[i]);
  }

  ifttt(devid, DATATYPES[dtype], val);

//   try {
//     debug_print("message.time ", message.time);
//     debug_print("message.data ", message.data);
//   }
//   catch(e) {
//     debug_print("Exception " + e);
//   }
}

function onLoRaRx(data) {
  debug_print("onLoRaRx");
//   debug_print("data " + data);

//   try {
//     var rcv = JSON.parse(data);
//     var base64str = rcv.data;
//     // debug_print("base64str " + base64str);

//     var buf = new Buffer(base64str, 'base64');
//     debug_print("receive size=" + buf.length);
//     dump(buf, buf.length);
//   }
//   catch(e) {
//     debug_print("Exception " + e);
//   }
//   finally {
//     // debug_print("onLoRaRx finally");
//   }
}
