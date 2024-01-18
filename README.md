<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-Nginx-269539.svg?logo=nginx&style=for-the-badge">
  <img src="https://img.shields.io/badge/-MySQL-4479A1.svg?logo=mysql&style=for-the-badge&logoColor=white">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

## プロジェクト名

Luck-bag

<!-- プロジェクトについて -->

## プロジェクトについて

手持ちの服の使い道が思い浮かばない<br>
ベーシックな服が好きな人向けのプロダクト<br>
新しい着こなし方が分かり、<br>
従来のものと違って手持ちの服とファッションの知識量に関係なく、<br>
ベーシックな着こなし方が分かる機能がある<br>

<!-- プロジェクトの概要を記載 -->

  <p align="left">
    <br />
    <!-- プロジェクト詳細にBacklogのWikiのリンク -->
    <a href="http://luck-bag.st.ie.u-ryukyu.ac.jp/"><strong>Luck-bagのサイト »</strong></a>
    <br />
    <br />

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Node.js              | 16.0       |
| React                | 18.2.0     |
| Nginx                | 1.25.3     |
| PostgreSQL           | 16.1       |

その他のパッケージのバージョンは package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

❯ tree -a -I "node_modules|.git|static" -L 2<br>
.<br>
├── .github<br>
│   └── workflows<br>
├── .gitignore<br>
├── README.md<br>
├── backend<br>
│   ├── .env.local<br>
│   ├── npmSetupBackend.sh<br>
│   ├── package-lock.json<br>
│   ├── package.json<br>
│   └── server.js<br>
├── compose.prod.yaml<br>
├── compose.yaml<br>
├── db<br>
│   ├── init.sql<br>
│   └── postgres-data<br>
├── docker_restart_local.sh<br>
├── frontend<br>
│   ├── .DS_Store<br>
│   ├── .env.local<br>
│   ├── README.md<br>
│   ├── npmSetup.sh<br>
│   ├── package-lock.json<br>
│   ├── package.json<br>
│   ├── public<br>
│   └── src<br>
└── nginx<br>
├── .conf<br>
├── default.conf<br>
└── default_prod.conf<br>

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

### コンテナの作成と起動

それぞれのディレクトリに.env.local ファイルを以下の環境変数例と[環境変数の一覧](#環境変数の一覧)を元に作成

#### /backend/.env.local

OPENAI_API_KEY=secretkey<br>
REACT_BASE_URL=localhost<br>
POSTGRES_DB=database_name<br>
POSTGRES_USER=database_user<br>
POSTGRES_PASSWORD=database_password<br>
SECRET_KEY=hash_secret_key<br>

#### /frontend/.env.local

REACT_APP_API_BASE_URL=localhost

.env.local ファイルを作成後、以下のコマンドで開発環境を構築

docker compose up -f compose.yaml -d --build

### 動作確認

http://localhost にアクセスできるか確認
アクセスできたら成功

### コンテナの停止

以下のコマンドでコンテナを停止することができます

docker compose down

### 環境変数の一覧

| 変数名                                 | 役割                                          | デフォルト値      | DEV 環境での値                           |
| -------------------------------------- | --------------------------------------------- | ----------------- | ---------------------------------------- |
| OPENAI_API_KEY                         | OpenAI の API キー(backend で使用)            | secretkey         | OpenAI の API ページで取得した値         |
| REACT_BASE_URL, REACT_APP_API_BASE_URL | URL 名（frontend,backend で使用）             | localhost         | 実際のサイト URL                         |
| POSTGRES_DB                            | PostgreSQL のデータベース名（backend で使用） | database_name     |                                          |
| POSTGRES_USER                          | PostgreSQL のユーザー名（backend で使用）     | database_user     |                                          |
| POSTGRES_PASSWORD                      | PostgreSQL のパスワード（backend で使用）     | database_password | 他者に推測されないランダムな値にすること |
| SECRET_KEY                             | ハッシュ化に用いるシークレットキー            | hash_secret_key   | 他者に推測されないランダムな値にすること |

### コマンド一覧

| 実行する処理                           | コマンド                     |
| -------------------------------------- | ---------------------------- |
| コンテナの起動                         | docker compose up -d --build |
| コンテナの停止                         | docker compose down          |
| コンテナの再起動（停止させて起動する） | ./docker_restart_local_sh    |

## トラブルシューティング

### .env.local: no such file or directory

.env.local ファイルがないので環境変数の一覧を参考に作成しましょう

### docker daemon is not running

Docker Desktop が起動できていないので起動させましょう

### Ports are not available: address already in use

別のコンテナもしくはローカル上ですでに使っているポートがある可能性があります
