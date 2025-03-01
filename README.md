# google-search-grounding-gemini2.0

Google 検索によるグラウンディングの UI 参照実装

# TODO

- 型定義ファイルを目的に応じて分ける
- lib が細かすぎる。もっと抽象化してファイルをまとめる
- 回答をストリーミングで表示させる
- Google 検索オン/オフ
- マークダウン対応
- 型を切り出す
- 引用として表示される番号の順番が逆になってたりおかしい

## クイックスタート

- `.env.template`を`.env`にリネーム。プロジェクト ID を入れる

- Vertex AI ユーザーの権限をつけたサービスアカウントを作成。キーを取得して、`.env`に入れる
  ※ここ、不要かも。gemini.ts で使ってないわ

- アクセストークンを取得して `.env` に入れる

```sh
gcloud auth login
```

```sh
gcloud auth print-access-token
```

```sh
npm ci && npm run dev
```

## 参考 URL

### Grounding With Google Search

- [Gemini 2.0 公式ドキュメント](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding-with

### HonoX

- [リポジトリ](https://github.com/honojs/honox)

### Tailwind + Shadcn/ui

- [Shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4)
