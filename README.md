# TLG79 series LoRaScript

## Methods

### onInit()

- 初期化時に呼び出されるコールバック関数

### onLoRaTx(dat)

- LoRaパケット受信時に呼び出されるコールバック関数
- datには受信パケットデータを含むJSONオブジェクトが渡される

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

