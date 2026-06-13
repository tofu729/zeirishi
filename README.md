# 架空税理士事務所 LP

ポートフォリオ掲載を想定した、依存ライブラリなしの静的ランディングページです。

## ファイル構成

```text
tax-office-lp/
├─ index.html
├─ README.md
└─ assets/
   ├─ css/
   │  └─ style.css
   ├─ js/
   │  └─ main.js
   └─ images/
      ├─ hero-office.webp  # Web表示用
      └─ hero-office.png   # 編集用オリジナル
```

## 実装内容

- セマンティックHTMLと基本的なアクセシビリティ対応
- PC / タブレット / スマートフォンのレスポンシブ対応
- モバイルナビゲーション
- Intersection Observerによるスクロール表示・数値アニメーション
- `prefers-reduced-motion`対応
- FAQアコーディオン
- CSSカスタムプロパティによるテーマ管理
- WebP画像による転送量の最適化

`index.html`をブラウザで開くだけで確認できます。
