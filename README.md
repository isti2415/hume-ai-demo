# Hume AI Demo

An intelligent web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and the **Hume AI React SDK**, showcasing the power of AI interaction along with **Next.js SEO best practices**.

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/) [![Hume AI](https://img.shields.io/badge/Hume%20AI-React%20SDK-purple)](https://dev.hume.ai/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#-license)

> **Repo:** [https://github.com/isti2415/hume-ai-demo](https://github.com/isti2415/hume-ai-demo)

---

## ✨ Key Features

* ⚡ **Next.js App Router** – modern file‑based routing, layouts, and server components.
* 🧠 **Hume AI React SDK Integration** – plug‑and‑play hooks/components to interact with Hume’s emotion/voice APIs.
* 🗣️ **Real‑time interactions (optional)** – prepared patterns for streaming/WS‑based UX where supported by Hume services.
* 🧩 **TypeScript‑first** – strict typing across components, hooks, and API clients.
* 🎨 **Tailwind CSS** – utility‑first styling for rapid, consistent UI.
* 🔍 **SEO Best Practices** – sensible defaults for metadata, Open Graph, and structured routing.
* 📱 **Responsive UI** – mobile‑first layout, keyboard accessible.
* 🧱 **Modular Architecture** – clear separation of `app/`, `components/`, `hooks/`, `lib/`.
* 🧹 **DX & Quality** – ESLint, optional Prettier, conventional scripts, and ready‑to‑extend testing setup.

---

## 🧱 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, PostCSS/Autoprefixer
* **AI:** Hume AI React SDK (client helpers & UI components)
* **State/Utilities:** React hooks, lightweight utilities in `lib/`
* **Package Manager:** Bun / npm / yarn (choose one; lockfile dictates default)
* **Linting/Formatting:** ESLint (Next.js rules), Prettier (optional)
* **Deployment:** Vercel, Netlify, Cloudflare Pages (static) or serverful (for streaming endpoints)

> Note: If you use real‑time/streaming features that require a server runtime, deploy to a platform that supports Node edge/serverless functions (e.g., **Vercel**). For purely static demos, you can export and host statically.

---

## 🗂️ Project Structure

```
hume-ai-demo/
│
├── app/                # App Router (pages, layouts, metadata)
├── components/         # Reusable UI elements (forms, chat panes, controls)
├── hooks/              # Custom React hooks (SDK wiring, UI state)
├── lib/                # API clients, utilities (e.g., Hume helpers)
├── public/             # Static assets (images, icons)
├── styles/             # Tailwind/global CSS
├── next.config.js      # Next.js config (can enable 'output: export' if static)
├── postcss.config.mjs  # PostCSS config
├── tailwind.config.ts  # Tailwind theme/tokens
├── tsconfig.json       # TS config
├── package.json        # Scripts & dependencies
└── bun.lockb / pnpm-lock.yaml / package-lock.json  # lockfile (one)
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```
# Hume API auth (examples — use the variables your SDK requires)
HUME_API_KEY="YOUR_HUME_API_KEY"
HUME_API_SECRET="YOUR_HUME_API_SECRET"
# Public keys must be prefixed with NEXT_PUBLIC_ if used on the client
NEXT_PUBLIC_APP_NAME="Hume AI Demo"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **Security:** Never commit `.env*` files. Only expose values with `NEXT_PUBLIC_` if they are truly safe for the browser.

---

## 🛠️ Getting Started

### 1) Clone

```bash
git clone https://github.com/isti2415/hume-ai-demo.git
cd hume-ai-demo
```

### 2) Install dependencies

Using **Bun** (recommended if a Bun lockfile is present):

```bash
bun install
```

Or with **npm**/**yarn**:

```bash
npm install
# or
yarn install
```

### 3) Run the dev server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Optional: Example Integration Pattern

> The following snippet shows a *pattern* for wiring the Hume SDK in a React component. Adjust to match your actual SDK APIs.

```tsx
// components/HumeDemo.tsx
import { useEffect, useState } from "react";
// import { useHumeClient } from "@humeai/react"; // example name

export default function HumeDemo() {
  const [result, setResult] = useState<string>("Ready");
  // const client = useHumeClient({ apiKey: process.env.NEXT_PUBLIC_HUME_KEY });

  useEffect(() => {
    async function run() {
      try {
        // const response = await client.emotions.analyzeText("Hello world!");
        // setResult(JSON.stringify(response, null, 2));
      } catch (err: any) {
        setResult(`Error: ${err?.message || String(err)}`);
      }
    }
    run();
  }, []);

  return (
    <pre className="whitespace-pre-wrap rounded-xl bg-zinc-950 p-4 text-zinc-100">
      {result}
    </pre>
  );
}
```

---

## 🔍 SEO Best Practices (Included)

* **`metadata`/`generateMetadata`** patterns in App Router
* Sensible defaults for **title**, **description**, **Open Graph** and **Twitter** cards
* Canonical URL helper and `robots` settings
* Semantic markup, accessible components, and responsive images

> Expand with sitemap generation, structured data (JSON‑LD), and per‑route metadata if needed.

---

## 📜 Scripts

> Commands are shown for **Bun** with npm equivalents.

| Task            | Bun                  | npm / yarn           |
| --------------- | -------------------- | -------------------- |
| Dev server      | `bun dev`            | `npm run dev`        |
| Type‑check      | `bun run type-check` | `npm run type-check` |
| Lint            | `bun run lint`       | `npm run lint`       |
| Build           | `bun run build`      | `npm run build`      |
| Export (static) | `bun run export`     | `npm run export`     |
| Preview/Start   | `bun run start`      | `npm run start`      |

> Add/adjust scripts in `package.json` as needed.

---

## 🏗️ Build & Export

**Static export** (for demos without server‑side streaming):

```bash
bun run build
bun run export
# outputs to ./out
```

**Serverful/Edge** (for real‑time features):

* Leave `next export` off, deploy with `next build`
* Use **Vercel** functions/edge runtime for SDK calls that require secrets/streaming

---

## 🚢 Deployment

* **Vercel** – best default for Next.js + serverless/edge
* **Netlify / Cloudflare Pages** – great for static exports
* **GitHub Pages** – publish `out/` to `gh-pages`
* **Any static host** – if the app is purely static

> Real‑time emotion/voice requires a server runtime. Keep keys server‑side and proxy from API routes.

---

## ✅ Quality & Testing

* **ESLint** with Next.js config
* **Type‑strict** TS config
* **Prettier** (optional)
* **Jest/RTL/Playwright** (optional) – scaffolding ready to add

---

## 🧰 Troubleshooting

* **401/403 from Hume API** → Check `.env.local` and server/API route usage; never expose secrets on the client.
* **CORS errors** → Route requests via Next.js **`app/api/*`** handlers.
* **Streaming not working** → Ensure deployment target supports Node/Edge streaming and that you’re not using `next export`.

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit with conventional messages
4. Open a Pull Request

---

## 🧾 License

Licensed under the **MIT License**. See `LICENSE` (add if not present).

---

**Made with ❤️ using Next.js, TypeScript, Tailwind CSS, and the Hume AI React SDK.**
