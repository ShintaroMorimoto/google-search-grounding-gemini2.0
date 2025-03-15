# Google 検索によるグラウンディングの UI 参照実装

## Web アプリ概要

![UI のイメージ](/image.png)

- ChatGPT のような一般的な生成 AI チャットと同じイメージです
- データの永続化はしません。

## クイックスタート

1. `.env.template`を`.env`にリネーム
2. アクセストークンを取得して`.env`にセット

```sh
gcloud auth login
```

```sh
gcloud auth print-access-token
```

3. プロジェクト ID を`.env`にセット

4. 起動

```sh
npm ci && npm run dev
```

## 関連 URL

### Grounding With Google Search

- [Gemini 2.0 公式ドキュメント](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding-with-search)
- [Grounding 公式ドキュメント](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/ground-with-google-search)
- [実装時の Tips などを紹介している記事](https://zenn.dev/mrmtsntr/articles/4273b26eddfa6f)

### HonoX

- [リポジトリ](https://github.com/honojs/honox)

### Tailwind + Shadcn/ui

- [Shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4)
