# Your Local Partners

A local-vendor marketplace prototype (browse → store → basket → checkout, plus
a Vendor Dashboard). Built with React + Vite.

## Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Put it on GitHub and make it live (GitHub Pages)

**1. Create a new repo on GitHub**
Go to github.com → New repository → name it whatever you like (e.g.
`your-local-partners`) → leave it empty (no README/gitignore) → Create.

**2. Update one line before pushing**
Open `vite.config.js` and change `base: "/your-local-partners/"` so the path
matches your repo's actual name exactly (case-sensitive). Skip this step only
if your repo name really is `your-local-partners`.

**3. Push this project to the new repo**
From inside this folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

**4. Turn on GitHub Pages**
In your repo on GitHub: **Settings → Pages → Build and deployment → Source →
GitHub Actions**. That's it — no need to pick a branch or folder.

**5. Let the workflow run**
This repo already includes `.github/workflows/deploy.yml`. Pushing to `main`
automatically builds the app and publishes it. Watch progress under the
**Actions** tab. First run takes ~1–2 minutes.

**6. Visit your site**
Once the workflow finishes, it'll be live at:

```
https://<your-username>.github.io/<your-repo>/
```

## Making changes later

Edit `src/App.jsx` (this is the same component from the chat prototype), then:

```bash
git add .
git commit -m "Update store list"
git push
```

The GitHub Action redeploys automatically on every push to `main`.

## Notes

- This is a front-end-only prototype — cart, orders, and vendor edits reset on
  page reload since there's no database or backend yet.
- The map view is a stylized mock, not live map tiles — see
  `RealMapIntegration.md` (if you have it from the chat) for how to swap in a
  real Leaflet or Google Maps view once you're ready to deploy with a backend.
- If you'd rather deploy on Vercel or Netlify instead of GitHub Pages, both
  auto-detect Vite projects — just connect the repo and accept the defaults
  (no `vite.config.js` base-path edit needed for those, only for GitHub Pages
  project sites).
