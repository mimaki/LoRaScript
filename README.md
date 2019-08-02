# TLG79 series LoRaScript

## Methods

### onInit()

- 初期化時に呼び出されるコールバック関数

### onLoRaTx(dat)

- LoRaパケット受信時に呼び出されるコールバック関数
- datには受信パケットデータを含むJSONオブジェクトが渡される

### function onLoRaWANRx(message)

- LoRaデータパケット受信時に呼び出されるコールバック関数
- messageには連想配列オブジェクト(?)が渡される

#### messageのメンバ

|Field|型|概要|
|:-:|:-:|:--|
|time|string|受信時刻|
|devaddr|string|デバイスアドレス|
|deveui|string|DevEUI|
|gatewayeui|string|GatewayのEUI|
|rssi|integer| |
|lsnr|integer| |
|size|unsigned integer|データ長(バイト数)|
|data|string|データ(HEX文字列)|
|b64_data|string|Base64エンコードされたデータ|
|freq|float|通信周波数|
|datr|string|　|
|port|unsigned integer|　|
|uplink_count|unsigned integer|　|
|gateway_list|string|\"\<gatewayeui\>;\<rssi\>;\<lsnr\>\"の形式|


```json
message: {"time":"2019-08-02T17:10:31.626784+09:00","devaddr":"12345678","deveui":"1122334455667788","gatewayeui":"000b78fffea0016a","rssi":-120,"lsnr":-13.5,"size":40,"data":"09abcdef000000000000000000000000e1fac74209abcdef000000000000000000000000e1fac742","b64_data":"CavN7wAAAAAAAAAAAAAAAOH6x0IJq83vAAAAAAAAAAAAAAAA4frHQg==","freq":927.2,"datr":"SF10BW125","port":5,"uplink_count":3,"gateway_list":"000b78fffea0016a;-120;-13.500000"}
```

### debug_print(message)

- LOGパネルにメッセージを表示する

## JSON形式

|Field|型|必須|概要|
|:-:|:-:|:-:|:--|
|time|string|　|　|
|tmst|unsigned integer|○|　|
|freq|unsigned float|○|　|
|chan|unsigned integer|○|　|
|rfch|unsigned integer|○|　|
|stat|signed integer|○|　|
|modu|string|○|　|
|datr|string|○|　|
|codr|string|○*|　|
|ipol|boolean|○|　|
|size|unsigned integer|　|　|
|data|string|　|　|
|ncrc|bool|　|　|

### 受信パケットサンプル

```JSON
{
    "time":"2013-03-31T16:21:17.528002Z", "tmst":3512348611,
    "chan":2,
    "rfch":0,
    "freq":866.349812,
    "stat":1,
    "modu":"LORA",
    "datr":"SF7BW125",
    "codr":"4/6",
    "rssi":-35,
    "lsnr":5.1,
    "size":32, "data":"-DS4CGaDCdG+48eJNM3Vai-zDpsR71Pn9CPA9uCON84"
}
```

### 送信パケットサンプル

```JSON
{
    "imme":true,
    "freq":864.123456,
    "rfch":0,
    "powe":14,
    "modu":"LORA",
    "datr":"SF11BW125",
    "codr":"4/6",
    "ipol":false,
    "size":32,
    "data":"H3P3N2i9qc4yt7rK7ldqoeCVJGBybzPY5h1Dd7P7p8v"
}
```
