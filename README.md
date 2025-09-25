# 🌐 Company Profile Website

Company profile website built with **Next.js** — fast, modern, and fully static.  
No CMS, everything is **hand-crafted** for performance and maintainability.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## ✨ Features

- ⚡ **Static Pages** – fully generated at build time for blazing-fast speed
- 🎨 **Custom UI/UX** – including a fully custom **carousel** (no third-party slider)
- 🌍 **Multi-language Support** – seamless locale routing & translations
- 🔍 **SEO Optimized** – meta tags, Open Graph, sitemap, robots.txt, canonical & hreflang setup
- 🏗️ **On-page SEO & Semantic Structure** – accessible headings, internal linking, and ARIA support
- 📱 **Responsive Design** – mobile-first and optimized across devices
- 🎬 **Smooth Animations** – powered by **Framer Motion** for an engaging user experience
- 🗂️ **Clean Expert-Level Folder Structure** – scalable and maintainable architecture for enterprise-grade projects

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) – React framework for production
- [TypeScript](https://www.typescriptlang.org/) – type-safe development
- [SCSS](https://sass-lang.com/) – modular and scalable styling with theming support
- [next-intl](https://next-intl-docs.vercel.app/) – internationalization support
- [Framer Motion](https://www.framer.com/motion/) – animation library for React

---

## 🚀 Deployment

- Optimized for [Vercel](https://vercel.com/) (default)
- Works on any static hosting provider

### Standalone Build

- Change output to standalone on NextConfig:

  ```js
  const nextConfig: NextConfig = {
    output: "standalone",
    ...
  };
  ```

- `npm run build`
- `cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/` for standalone output
- `PORT=3000 HOSTNAME=localhost node .next/standalone/server.js`
- Used folder:
  ```
  .next/standalone/           <-- root folder di cPanel
  ├─ server.js                <-- entry point server
  ├─ node_modules/            <-- dependency minimal dari build standalone
  ├─ public/                  <-- copy dari project/public
  └─ .next/                   <-- copy .next/static dari build
      └─ static/              <-- semua JS/CSS/images hasil build
  ```

## How npm and Next.js Resolve Project Root & Assets

```
+-------------------+
|      Run npm      |
|    in folder X    |
+-------------------+
           |
           v
+-------------------------------+
|  Is there a package.json CWD? |
+-------------------------------+
        |                   |
       Yes                  No
        |                   |
        v                   v
+-------------------+   +---------------------------+
|   Run the script  |   |   Move to parent folder   |
| from package.json |   |   CWD = parent folder     | <───┐
+-------------------+   +---------------------------+     |
        |                             |                   |
        |                             v                   |
        |              +------------------------------+   | (Repeat moving up parent folders until root)
        |              | Is there a package.json CWD? |   |                     |
        |              +------------------------------+   |                     v
        |                       |          |              |       +----------------------------+
        |                      Yes         No ────────────┘       |   Not found → npm error    |
        |                       |                                 |   missing script: <name>   |
        |                       v                                 +----------------------------+
        |            +-------------------+
        |            |  Run the script   |
        |            | from package.json |
        |            +-------------------+
        |                       |
        |                       v
        |       +--------------------------------+
        └─────> | Load node_modules from package |
                | json folder as root module     |
                +--------------------------------+

--------------------------------------------------------------------------------------------------------------

Next.js build/start resolution:

1️⃣ Build (`next build`) di root project
   - Generate `.next/` di root
   - Paths absolut untuk public/, pages/app, _next/static disimpan di metadata
   - Root = folder package.json + node_modules + .next

2️⃣ Start (`next start`) dari folder mana pun:
   - Runtime **Next.js server dijalankan dari node_modules/next/dist/server**
   - Runtime membaca `.next/metadata` → tahu lokasi:
       - public/
       - _next/static/
       - pages/app
   - CWD saat start **tidak penting**
   - Semua request (page + static) ditangani oleh **server internal Next** di node_modules

3️⃣ Standalone mode (optional):
   - Server runtime dipindah dari node_modules → `.next/standalone/server.js`
   - Perlu copy public/ + .next/static supaya semua asset bisa diakses
   - Bisa deploy di shared hosting/cPanel tanpa Next.js terinstall

```

## ASCII/Unicode connector

| Symbol | Name                           | Usage |
| ------ | ------------------------------ | ----- |
| `└`    | Bottom-left corner             | └──>  |
| `┘`    | Bottom-right corner            | <──┘  |
| `├`    | Vertical with right horizontal | ├──>  |
| `┤`    | Vertical with left horizontal  | <──┤  |
| `┬`    | Top with horizontal            | ┬──>  |
| `┴`    | Bottom with horizontal         | ┴──>  |
| `│`    | Vertical line                  | │     |
| `─`    | Horizontal line                | ───   |
| `┌`    | Top-left corner                | ┌──>  |
| `┐`    | Top-right corner               | <──┐  |
