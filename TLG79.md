# Kiwitec LoRa Gateway - TLG79

## 接続

- LAN接続
- IPアドレスはDHCPで自動取得出来る
- サーバアドレス`10.42.43.1`

## ログイン - 管理画面

LoRaScriptの登録が可能な管理画面

- URL: 10.42.43.1
- user: admin
- password: admin

## ログイン - ユーザ画面

LoRaデバイス登録、パケット参照が可能

- URL: 10.42.43.1:8080
- user: admin
- password: admin

### LoRaデバイス登録

- OTAA (ABTは未対応)
- DevEUI, AppEUI, AppKey を登録 (16進入力 '-' なし)
- DevAddrは自動生成される
