# aisafetyuae.github.io
# AI Safety UAE — Website

Static website for [aisafety.ae](https://aisafety.ae), the AI safety community and enterprise services platform for the UAE. Built with plain HTML, Tailwind CSS (CDN), and vanilla JavaScript. No build step, no framework, no dependencies to install.

---

## Project Structure

```
/
├── index.html
├── about.html
├── services.html
├── events.html
├── contact.html
├── codeOfConduct.html
├── header.html              ← shared header, loaded dynamically
├── footer.html              ← shared footer, loaded dynamically
│
├── css/
│   └── main.css             ← custom styles, RTL rules, leadership layout
│
├── js/
│   ├── en.js                ← all English strings
│   ├── ar.js                ← all Arabic strings
│   ├── translation.js       ← i18n engine
│   ├── load-component.js    ← injects header + footer into every page
│   └── nav-highlight.js     ← highlights the active nav link
│
└── images/
    ├── AISafetyUAELogo.png
    ├── about-bg.jpg
    ├── favicon.png
    ├── Wes.png
    ├── Nai.png
    ├── Grace.png
    ├── Yasser.png
    ├── Nikitha.png
    ├── Omar.png
    ├── Fatma.png
    ├── Yusra.png
    └── Events/
        ├── Sept2025.jpg
        ├── Oct2025.jpg
        ├── Nov2025.JPG
        └── Jan2026.JPG
```

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero, feature cards, services overview, initiatives, FAQ, credentials |
| About | `about.html` | Mission, vision, why it matters, full leadership team |
| Services | `services.html` | 4 enterprise service cards — training, advanced programme, model audit, governance framework |
| Events | `events.html` | Past event photos, embedded Luma calendar, subscribe CTA |
| Contact | `contact.html` | Contact form and community info |
| Code of Conduct | `codeOfConduct.html` | Full community CoC with scoped sections |

---

## How Header & Footer Work

Header and footer are stored as standalone HTML fragments (`header.html`, `footer.html`) and injected into every page at runtime by `load-component.js`:

```js
fetch('header.html').then(...) → document.getElementById('header').innerHTML = data
fetch('footer.html').then(...) → document.getElementById('footer').innerHTML = data
```

After each injection, a custom event is fired (`headerLoaded`, `footerLoaded`) so the translation engine knows to re-run translations on the newly injected content.

Every page must have these two placeholder divs:
```html
<div id="header"></div>
...
<div id="footer"></div>
```

And these three scripts at the bottom of `<body>`:
```html
<script src="js/load-component.js"></script>
<script src="js/nav-highlight.js"></script>
```

---

## Bilingual Support (English / Arabic)

The site uses a custom i18n engine with no external dependencies.

### How it works

1. Every translatable element gets a `data-i18n="key"` attribute:
   ```html
   <h1 data-i18n="about.hero.h1">About us</h1>
   ```
2. On page load, `translation.js` reads the saved language from `localStorage` and replaces the `textContent` of every `[data-i18n]` element with the matching string from `en.js` or `ar.js`.
3. Switching language calls `setLanguage('ar')` or `setLanguage('en')`, which saves the preference and re-renders the whole page including header and footer.
4. Arabic activates `dir="rtl"` on `<html>` and the `lang-ar` class on `<body>`, which triggers RTL layout rules in `main.css`.

### Script load order (in every page `<head>`)

```html
<script src="js/en.js" defer></script>
<script src="js/ar.js" defer></script>
<script src="js/translation.js" defer></script>
```

> **Note:** Some pages (events, codeOfConduct) use a `translations/en/en.js` and `translations/ar/ar.js` path depending on how the server is structured. Make sure paths are consistent with your deployment.

### Adding a new translatable string

1. Add the `data-i18n="your.key"` attribute to the element in HTML.
2. Add the key to `js/en.js`:
   ```js
   "your.key": "Your English text",
   ```
3. Add the Arabic translation to `js/ar.js`:
   ```js
   "your.key": "النص العربي",
   ```

### Special attribute variants

| Attribute | Use case |
|---|---|
| `data-i18n="key"` | Sets `textContent` |
| `data-i18n-placeholder="key"` | Sets `placeholder` on inputs |
| `data-i18n-aria="key"` | Sets `aria-label` |

---

## Styles

All custom styles live in `css/main.css`. Tailwind CSS is loaded via CDN and handles utility classes.

Key sections in `main.css`:

- **Typography & base** — font family (Inter / Noto Kufi Arabic), background
- **Leadership layout** — `.wrapper`, `.left-title`, `.right`, `.members`, `.member` grid used on the About page
- **Services** — `.text-maroon`, `.bg-maroon` colour tokens (`#9e2e2e`)
- **RTL overrides** — all `[dir="rtl"]` rules for flipping layout, borders, text alignment when Arabic is active
- **Animations** — `.fade-in-up` scroll animation

### Brand colour

The site uses a single brand accent colour throughout:

```
Maroon: #9e2e2e
```

Used on CTA buttons, links, and service card accents.

---

## Events — Luma Integration

Upcoming events are embedded via the Luma calendar iframe:

```html
<iframe
  src="https://lu.ma/embed/calendar/cal-H9hmjiGq8HlhL4J/events"
  width="100%"
  height="600"
  frameborder="0"
></iframe>
```

The subscribe CTA links to: [https://luma.com/ai-safety-uae](https://luma.com/ai-safety-uae)

To update the embed, go to: Luma Dashboard → Calendar Settings → Embed → copy the new iframe `src`.

---

## Deployment

The site is fully static — no server-side code. Drop all files onto any web server or static host (Netlify, Vercel, GitHub Pages, AWS S3, etc.).

**Important:** `header.html` and `footer.html` must be in the same directory as the page files. The `fetch('header.html')` call is relative, so if pages are in subdirectories the paths will break. Keep everything flat in the root.

### Checklist before deploying a new page

- [ ] `<div id="header"></div>` and `<div id="footer"></div>` present
- [ ] Three script tags at bottom of `<body>`: `load-component.js`, `nav-highlight.js`
- [ ] Three script tags in `<head>`: `en.js`, `ar.js`, `translation.js` (in that order, with `defer`)
- [ ] All new text has `data-i18n="key"` attributes
- [ ] Keys added to both `en.js` and `ar.js`
- [ ] `data-page="pagename"` on the nav link in `header.html` for active highlighting

---

## Adding a New Page

1. Copy any existing page as a template.
2. Update the `<title>` and `<meta name="description">`.
3. Add your content with `data-i18n` keys.
4. Add the keys to `en.js` and `ar.js`.
5. Add a nav link in `header.html` with the correct `data-page` attribute.
6. Add a link in `footer.html` if needed.

---

## Community

- Website: [aisafety.ae](https://aisafety.ae)
- LinkedIn: [AI Safety UAE Group](https://www.linkedin.com/groups/11862005/)
- Instagram: [@aisafetyuae](https://www.instagram.com/aisafetyuae)
- Events: [luma.com/ai-safety-uae](https://luma.com/ai-safety-uae)
- Contact: [conduct@aisafety.ae](mailto:conduct@aisafety.ae)

