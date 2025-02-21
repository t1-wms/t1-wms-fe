# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})

src/
├── app/                       # 앱 설정
│   ├── App.tsx               # 메인 레이아웃
│   └── router.tsx            # 라우터 설정
│
├── pages/                     # 페이지 컴포넌트
│   ├── home/
│   │   └── Home.tsx
│   │
│   └── outbound/             # 출고 관련 페이지
│       ├── ui/               # 페이지별 UI 컴포넌트
│       │   ├── scan.tsx
│       │   ├── PickingLocation.tsx
│       │   └── ItemScan.tsx
│       └── outbound.tsx     
│
└── shared/                    # 공통 요소
    ├── types/                # 공통 타입 정의
    │   ├── location.ts
    │   ├── scan.ts
    │   └── picking.ts
    │
    ├── ui/                   # 공통 UI 컴포넌트
    │   ├── navigation/
    │   │   ├── NavigationBar.tsx
    │   │   └── NavigationItems.tsx
    │   │
    │   └── scan-button/
    │       ├── ScanButton.tsx
    │       └── types.ts
    │
    └── hooks/                # 공통 훅
        └── usescan.ts
```
