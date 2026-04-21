# CLAUDE.md

## 概要
これは「ポーカーのパワーナンバーを覚えるためのスマホ向けWebアプリ」の開発プロジェクトである。

目的は以下：
- ハンド（例: Q8）に対するパワーナンバーを素早く記憶させる
- 語呂合わせと視覚情報で記憶を定着させる
- スマホで直感的に操作できるUIを提供する

---

## 技術要件
- フロントエンドのみで完結（バックエンドなし）
- GitHub Pagesで配信
- 推奨技術：
  - React + Vite
  - TypeScript
  - Tailwind CSS

---

## デザイン方針
- スマホファースト（縦: 1080x1920想定）
- ダークテーマ（黒 or ポーカーテーブルの緑）
- アクセントはゴールド（カジノ感）
- UIはシンプルにし、迷わせない

---

## 画面構成

### 1. トップ画面
- 詳細は docs/top.md を参照
- アプリのエントリーポイント。タイトルと開始ボタンを表示する画面。

---

### 2. クイズ画面
- 詳細は docs/quiz.md を参照
- ハンドに対するパワーナンバーを4択で回答する画面。

---

### 3. 回答画面
- 詳細は docs/answer.md を参照
- 正解表示と語呂合わせによる記憶定着を行う画面。

---

## データ設計

### ハンドデータ
```ts
type Hand = {
  id: string; // "Q8"
  ranks: [string, string]; // ["Q", "8"]
  type: string;
  power: {
    pair: number;
    offsuit: number;
    suited: number;
  };
  mnemonic: {
    text: string;
    image: string;
  };
};