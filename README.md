<div align="center">

<img src="logo-mark.png" alt="Tank Care Buddy" width="96" height="96">

# Tank Care Buddy — Website

**The marketing site, privacy policy, support page, and FAQ for the Tank Care Buddy iPhone app.**

Live at **[tankcarebuddy.com](https://tankcarebuddy.com)**

</div>

---

## What this is

A small, hand-written static website. Four pages, no framework, no build step,
no dependencies. It is served directly by GitHub Pages from the `main` branch.

| Page | Purpose |
|---|---|
| `index.html` | Home — what the app does, screenshot carousel, download call to action |
| `faq.html` | Common questions about the app and the beta |
| `support.html` | How to get help, contact details |
| `privacy.html` | Privacy policy and terms of service — **linked from the App Store listing** |

`privacy.html` is a legal document that Apple requires and links to publicly.
Treat any change to it carefully, and make sure it still matches what the app
actually does.

---

## Repository layout

| Path | Contents |
|---|---|
| `*.html` | The four pages |
| `style.css` | All styling for the whole site |
| `shared.js` | Shared behavior — navigation, footer, small interactions |
| `waitlist.js` | Email signup modal, submits to Formspree |
| `screenshots/` | App screenshots shown in the home page carousel |
| `logo-mark*.png`, `favicon*`, `icon-96.png` | Brand and icon files |
| `CNAME` | Tells GitHub Pages to serve the site at tankcarebuddy.com |
| `sitemap.xml` | Sitemap for search engines |
| `docs/changelogs/` | PDF record of website releases |

---

## Working on it

There is nothing to install and nothing to compile. Edit the files and open them
in a browser.

To preview the whole site locally with working paths:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Pushing to `main` publishes to tankcarebuddy.com automatically, usually within a
minute or two.

### Cache busting

`shared.js` and `waitlist.js` carry a `?v=` version stamp in each HTML file, for
example `shared.js?v=20260702a`. **Bump the stamp whenever you change one of
those files**, or returning visitors and the GitHub Pages CDN will keep serving
the old cached copy.

Note that `style.css` currently has **no** version stamp, so CSS changes can take
longer to appear for repeat visitors. Adding one is a known improvement.

---

## Analytics

The site uses Google Analytics 4 (measurement ID `G-FH8DGRPN60`) on all four
pages, with a `click_join_beta` conversion event on the download call to action.

A measurement ID is not a secret and is safe to keep in the repository.

---

## Related

The iPhone app itself lives in a separate repository:
**[jtsmith7234-rgb/tank-care-buddy](https://github.com/jtsmith7234-rgb/tank-care-buddy)**

---

## License

**Proprietary. Copyright (c) 2026 James Timothy Smith. All rights reserved.**

This source is publicly viewable because GitHub Pages requires it, but it is
**not** open source. You may read it. You may not copy it, reuse it, or
republish it at another address. See [LICENSE](LICENSE) for the full terms.

Permission requests: **support@tankcarebuddy.com**
