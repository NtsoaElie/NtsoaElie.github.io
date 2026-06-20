# Portfolio — "Silver Wolf LV.999 · Maxxing"

A modular, data-driven developer portfolio. No build step, no dependencies.

Themed after the *Silver Wolf LV.999 — "Maxxing"* trailer: game-UI
stat bars, achievement pop-ups on scroll, "+999" crit numbers on click,
CRT/scanline distortion, and a hidden **DEV MODE** easter egg
(type the Konami code: `↑ ↑ ↓ ↓ ← → ← → B A`).

## Project structure

Concerns are separated so each file does one thing:

```
portfolio/
├── index.html            # the shell (structure only — rarely touched)
├── css/
│   ├── tokens.css        # ← theme knobs: colors, fonts, spacing (one source of truth)
│   ├── base.css          # reset + ambient background
│   ├── layout.css        # nav, sections, hero, footer
│   ├── components.css     # buttons, cards, terminal, stats, toasts…
│   ├── animations.css    # @keyframes + scroll-reveal + DEV MODE
│   └── responsive.css    # device breakpoints (tablet / mobile / phone)
└── js/
    ├── data.js           # ← YOUR CONTENT lives here (edit this)
    ├── render.js         # builds the page from data.js
    └── effects.js        # boot sequence, typewriter, interactions
```

## Edit your content

Open **`js/data.js`** — it's the only file you need to touch. The site is
**bilingual (EN / FR)**, so the content lives in two parallel trees under
`i18n.en` and `i18n.fr`. To change a section, edit the matching block in
both trees (or in just one, if you don't care about the other language).

| Want to change…    | Edit in `js/data.js`                          |
|--------------------|-----------------------------------------------|
| Name / handle      | `brand`, plus `hero.name` in each lang        |
| Taglines           | `i18n.<lang>.hero.taglines`                   |
| Bio                | `i18n.<lang>.about.lines`                     |
| Skills             | `i18n.<lang>.skills.groups`                   |
| Projects           | `i18n.<lang>.projects.items` (add an object)  |
| Contact links      | `i18n.<lang>.contact.links`                   |
| Default language   | `defaultLang` at the top (`"en"` or `"fr"`)   |

Adding a project = adding one object to the `items` array — the card builds
itself. Same for skills and links.

## Switching languages

A small **`[ FR ]` / `[ EN ]`** button sits in the nav (between the brand
and the menu). It toggles the locale, re-renders every section, restarts
the typewriter in the new language, and remembers the choice in
`localStorage` (`portfolio.lang`) for the next visit.

### Change the look

All colors, fonts, and spacing are CSS variables in **`css/tokens.css`**.
Change a value once and it updates everywhere.

## View it locally

Because the page is split into separate files, serving it is the most reliable
way to view it (some browsers restrict `file://` access between files):

```sh
python3 -m http.server 8080   # then visit http://localhost:8080
```

Opening `index.html` directly (double-click) also works in most browsers —
the project uses classic scripts and relative paths, with no module/CORS
requirements. Fonts need an internet connection.

## Deploy (all free)

- **GitHub Pages**: push this folder, enable Pages on the repo.
- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder.

## Serve from your Go API (optional)

Since this lives in your Go workspace, you can host it from Go:

```go
http.Handle("/", http.FileServer(http.Dir("portfolio")))
http.ListenAndServe(":8080", nil)
```
