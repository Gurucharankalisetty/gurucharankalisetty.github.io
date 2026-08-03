# Kalisetty Guru Charan — Portfolio

A handcrafted, dark-theme personal portfolio built with plain HTML5, CSS3 and JavaScript (no frameworks). Signature element: a live "SQL query" hero that runs `SELECT * FROM analysts WHERE name = '...'` and returns your profile as a result row.

---

## 1. Folder structure

```
portfolio/
├── index.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    │   └── profile.jpg
    └── resume/
        └── Gurucharan's Resume.pdf
```

---

## 2. Running it locally

No build step needed — it's static. Easiest options:

- Open `index.html` directly in a browser, **or**
- Run a local server (recommended, avoids some browser file:// quirks):
  ```bash
  cd portfolio
  python3 -m http.server 8000
  # visit http://localhost:8000
  ```

---

## 3. EmailJS setup (contact form)

The contact form is wired for [EmailJS](https://www.emailjs.com) so messages arrive straight to your inbox without a backend. Until you configure it, submitting the form falls back to opening the visitor's email app with a pre-filled message — so it always works, but EmailJS makes it seamless.

**Steps:**

1. Create a free account at emailjs.com.
2. Add an **Email Service** (e.g. Gmail) — note the **Service ID**.
3. Create an **Email Template** with variables `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}` — note the **Template ID**.
4. Go to **Account → General** and copy your **Public Key**.
5. Open `js/script.js` and replace the placeholders near the top of the "Contact form" section:
   ```js
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   ```
6. Save, redeploy — done. The EmailJS SDK is already loaded via CDN in `index.html`.

---

## 4. Deploying to GitHub Pages

1. Push the `portfolio` folder contents to a GitHub repository (e.g. `Gurucharankalisetty/portfolio`).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose branch `main` (or `master`) and folder `/ (root)`.
5. Save. Your site will be live at:
   `https://gurucharankalisetty.github.io/portfolio/`
   (or `https://gurucharankalisetty.github.io/` if the repo is named `<username>.github.io`).
6. Update `robots.txt`, `sitemap.xml`, and the `canonical`/`og:url` tags in `index.html` with this real URL.

---

## 5. Deploying to Vercel

1. Push the project to a GitHub repo (see above).
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Framework preset: choose **Other** (it's static HTML, no build command needed).
4. Leave build/output settings blank and click **Deploy**.
5. Vercel gives you a URL like `https://portfolio-yourname.vercel.app`. Add a custom domain under **Project → Settings → Domains** if you have one.
6. Update `robots.txt`, `sitemap.xml`, and the `canonical`/`og:url` tags in `index.html` with your final domain.

---

## 6. Replacing your profile photo

1. Export a new photo — ideally a **3:4 portrait crop**, at least 900×1200px, well-lit, plain/blurred background.
2. Save it as `assets/images/profile.jpg` (same filename, or update the `src` in `index.html`'s `.hero-photo` `<img>` tag).
3. Keep file size under ~200KB where possible (use JPEG quality 80–90) so the hero loads fast.

---

## 7. Replacing your resume PDF

1. Export your updated resume as a PDF.
2. Replace the file at `assets/resume/Gurucharan's Resume.pdf`, keeping the **exact same filename** — every download button in the site already points to this path.
3. If you rename the file, update the `href="assets/resume/..."` attributes in `index.html` (there are two: nav bar button and Resume section button).

---

## 8. Adding future projects

Duplicate a `<article class="project-card">` block inside the `#projects` section in `index.html`:

```html
<article class="project-card" data-reveal>
  <div class="project-card-top">
    <div class="project-icon"><!-- pick any icon svg from the file --></div>
    <div class="project-badges">
      <span class="badge">Tech</span><span class="badge">Stack</span>
    </div>
  </div>
  <h3 class="project-title">Project Name</h3>
  <p class="project-desc">One or two sentence summary.</p>
  <ul class="project-features">
    <li>Key detail one</li>
    <li>Key detail two</li>
  </ul>
  <div class="project-actions">
    <a href="YOUR_REPO_URL" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost">View on GitHub</a>
  </div>
</article>
```

No JavaScript changes needed — scroll-reveal and hover effects apply automatically via the `data-reveal` attribute and `.project-card` class.

---

## 9. Adding future certifications

Duplicate a `.cert-card` block inside `#certifications`:

```html
<div class="cert-card" data-reveal>
  <div class="cert-icon"><!-- reuse the certificate icon svg --></div>
  <h3 class="cert-name">Certificate Name</h3>
  <p class="cert-org">Issuing Organisation</p>
</div>
```

If you have a shareable certificate URL, wrap the card in an `<a href="...">` (see the `.profile-card` pattern in `#profiles` for reference) to make it clickable.

---

## 10. Notes on content accuracy

Every project, skill, certification and education entry on this site was pulled directly from the resume provided — nothing was invented. When you update your resume, mirror those changes here so the site and resume always agree.
