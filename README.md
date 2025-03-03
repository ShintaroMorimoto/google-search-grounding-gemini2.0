# google-search-grounding-gemini2.0

Google 検索によるグラウンディングの UI 参照実装

# TODO

- 回答をストリーミングで表示させる
- Google 検索オン/オフ
- マークダウン対応
- lib が細かすぎる。もっと抽象化してファイルをまとめ

## クイックスタート

- `.env.template`を`.env`にリネーム。アクセストークンを取得して `.env` に入れる

```sh
gcloud auth login
```

```sh
gcloud auth print-access-token
```

- プロジェクト ID を `.env`に入れる

- 起動

```sh
npm ci && npm run dev
```

アクセストークンの期限は〇分なので、401 エラーになったらそれかも

## 参考 URL

### Grounding With Google Search

- [Gemini 2.0 公式ドキュメント](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding-with-search)

### HonoX

- [リポジトリ](https://github.com/honojs/honox)

### Tailwind + Shadcn/ui

- [Shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4)
