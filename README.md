# JapanWeather(全国天気)

日本地図の上に、全国13都市(旭川・札幌・青森・仙台・東京・新潟・名古屋・大阪・広島・高知・福岡・鹿児島・那覇)の現在の天気・気温・湿度を表示するWebアプリです。
公開URL: https://japanweather.vercel.app/

職業訓練校で作った HTML + TypeScript 版を、ポートフォリオ用に Next.js(App Router)+ TypeScript で作り直しました。

## 使っている技術

- Next.js(App Router)/ React / TypeScript
- Tailwind CSS
- OpenWeatherMap API(現在の天気 `/data/2.5/weather`、無料プラン)
- Vercel(ホスティング)

## 構成

```
app/
  api/weather/route.ts   13都市の天気をまとめて取得する Route Handler(サーバー側)
  page.tsx               データを取得して、13枚のカードを地図の上に並べる
  layout.tsx             フォント・背景・タイトルなど全体の枠
components/
  WeatherCard.tsx        1都市分の表示
lib/
  cities.ts              13都市の情報(名前・緯度経度・地図上の位置・色)
  types.ts               /api/weather が返すデータの型
  weatherStyle.ts        気温・湿度・天気から色や画像を決める関数
public/                  地図画像(chizu.png)と天気・気温・湿度のアイコン
legacy/                  移行前のコード(参照用)
```

## 処理の流れ

```
ブラウザ ── /api/weather ──→ Route Handler ──(APIキー付き)──→ OpenWeatherMap
                              └ キーはここ(サーバー)にしかない
```

1. ページを開くと、`useEffect` が `/api/weather` を1回だけ呼ぶ。
2. Route Handler が、環境変数のキーを使って13都市分を同時に取得し、画面に必要な項目だけを返す。
3. 結果を `useState` に入れると React が画面を描き直し、各 `WeatherCard` に天気が表示される。

## 設計判断・苦労した点の記録

### APIキーをサーバー側に置いた

- 旧版はブラウザから OpenWeatherMap を直接呼んでおり、キーがコードに直書きされていた(Git の履歴にも残っている)。
- Next.js 版では Route Handler を中継役にして、キーはサーバー側の環境変数 `OPENWEATHER_API_KEY` だけに置く。ブラウザは `/api/weather` だけを呼ぶ。
- 環境変数の名前に `NEXT_PUBLIC_` を付けると、ブラウザ側のコードに埋め込まれて公開されてしまう。付けないことで、サーバーだけで読めるようにした。
- エラー文やログには、キーを含む URL を出さない(都市の id とステータスだけにする)。
- 手元は `.env.local`(`.gitignore` の `.env*` で除外)、Vercel は管理画面の Environment Variables で設定する。

### 13都市を1回の呼び出しにまとめ、一部の失敗も許す

- 旧版はブラウザから13回 API を呼んでいた。新版は Route Handler の中で `Promise.allSettled` を使い、13都市を同時に取得して1回の応答で返す。
- `Promise.all` では1都市の失敗で全体が失敗してしまう。`allSettled` なら、成功した都市は表示し、失敗した都市だけ「取得できませんでした」と出せる。
- 応答には、成功した都市(`weathers`)、失敗した都市の id(`failedIds`)、取得時刻(`updatedAt`)を入れる。API の巨大な JSON から、画面に使う5項目だけに絞って返す。

### 都市の指定は都市名ではなく緯度経度にした

- 緯度経度(`lat` / `lon`)なら、狙った場所を確実に取得できる。

- 画面に出す都市名は `cities.ts` の日本語名を使う。API が返す `name` は最寄りの観測地点の名前で、意図した名前とは限らないため。

### 都市の情報を `cities.ts` に1か所にまとめた

- 旧版は、位置・色(index.html)、API に渡す名前(main.ts)、表示名(`<h1>`)が散らばっており、同じ構造の HTML を13回コピペしていた。
- 配列にまとめて `map` で `WeatherCard` を並べることで、都市の追加や位置の変更が1か所で済む。

### 長い if / else if を「しきい値の表」にした

- 旧版は、気温の色、気温アイコン、湿度アイコンを約60行の if / else if で書いていた。
- `{ max: 10, className: ... }` の配列と `find` で、「上から見て最初に当てはまる行」を返す形にした。段階を足すときは、表に1行足すだけで済む。

### Tailwind は動的にクラス名を組み立てられない

- Tailwind はソースコード中の完成した文字列(`top-[250px]` など)を探してCSSを作る。`` `top-[${top}px]` `` のように組み立てると、CSS が作られない。
- 都市ごとに違う位置は `style={{ top, left }}` で渡し、色のクラス名は `cities.ts` に丸ごと書いた。

### 画面の改善点

- 読み込み中・取得失敗時の表示(カード単位と全体)。
- 天気アイコンの代替テキストを、「旭川の天気:曇りがち」のように具体的にした(旧版は全都市「天気マーク」)。
- 画面上部にタイトル、データの取得元(OpenWeatherMap へのリンク)、更新時刻を表示した。

### 詰まったところと解決

**Vercel で 404(`404 NOT_FOUND`)になった**
- ビルドは成功しているのに、Next.js の画面が配信されなかった。
- 原因は、このプロジェクトがもともとフレームワークなしの静的サイトで、Vercel の Framework Preset が「Other」のままだったこと。
- `main`(旧版)に影響しないよう、ダッシュボードの設定は変えず、`nextjs` ブランチに `vercel.json`(`{ "framework": "nextjs" }`)を置いて解消した。

**Preview デプロイで確認するとき**
- Vercel は、Preview 環境では Production とは別に環境変数を設定する必要がある。今回は、キーが1つだけなので、同じ値を両方の環境に入れた(Production と Preview の両方にチェックを入れて登録)。
- 環境変数を追加・変更しても、再デプロイするまで反映されない。

**Production だけ「天気データを取得できませんでした」と出た**
- Preview 用に環境変数を編集したとき、ブランチの指定(`gitBranch`)が残り、変数が「Preview の `nextjs` ブランチだけ」の設定になっていた。Production に変数がないため、`/api/weather` が 500 を返していた。
- `/api/weather` の応答を直接開いて切り分けた(500 なら変数がない、200 で `failedIds` が埋まっていればキーが拒否されている、など)。
- 変数を削除して、Production と Preview の両方・ブランチ指定なしで作り直し、再デプロイして解消した。
- Route Handler が「キー未設定は 500」「外部 API の失敗は 200 + `failedIds`」と返し分けていたので、原因の見当をつけやすかった。

## 移行の進め方(ブランチ運用)

- 旧版は Vercel で公開中だったため、`main` を触らずに `nextjs` ブランチで作り直した。
- 比べながら移行するため、旧コードは `legacy/` に置いた(`git mv` なので履歴は追える)。`legacy/` は型チェックと lint の対象から外している。
- 完成後に `main` にマージした。
- `legacy/` は旧版のコード(参照用)として残している。旧版に直書きされていた API キーは、新版のデプロイ後に OpenWeatherMap 側で削除済み(無効)。

## 開発

```
npm install
npm run dev
```

http://localhost:3000 を開く。

天気を取得するには、プロジェクト直下の `.env.local` に OpenWeatherMap のAPIキーを設定する。

```
OPENWEATHER_API_KEY=ここにAPIキー
```

`.env.local` はコミットしない(`.gitignore` で除外済み)。
