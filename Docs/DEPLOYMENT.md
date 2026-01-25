# Deployment Guide

This guide covers building and deploying the Papercraft Asset Pack Website to various hosting platforms.

---

## Table of Contents

- [Build Process](#build-process)
- [Hosting Options](#hosting-options)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [Cloudflare Pages](#cloudflare-pages)
  - [GitHub Pages](#github-pages)
  - [Manual/Static Hosting](#manualstatic-hosting)
- [Environment Variables](#environment-variables)
- [SPA Routing Configuration](#spa-routing-configuration)
- [Performance Optimization](#performance-optimization)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Post-Deployment Verification](#post-deployment-verification)
- [Rollback Procedures](#rollback-procedures)
- [Troubleshooting](#troubleshooting)

---

## Build Process

### Creating a Production Build

```bash
# Install dependencies (if not already done)
npm install

# Create production build
npm run build
```

### Build Output

The build creates a `dist/` directory:

```
dist/
├── index.html              # Entry HTML file
├── assets/
│   ├── index-[hash].js     # JavaScript bundle
│   ├── index-[hash].css    # CSS bundle
│   └── ... (any static assets)
└── ... (copied public/ files)
```

### Build Configuration

The build is configured in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Preview Production Build Locally

```bash
# Build first
npm run build

# Preview the build
npm run preview
```

This starts a local server at `http://localhost:4173` serving the `dist/` folder.

---

## Hosting Options

### Vercel (Recommended)

Vercel provides the best experience for Vite/React projects with automatic configuration.

#### Option A: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

#### Option B: CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (first time - will prompt for setup)
vercel

# Deploy to production
vercel --prod
```

#### Vercel Configuration File

Create `vercel.json` in project root for custom settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Netlify

#### Option A: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

#### Option B: CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build locally
npm run build

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Netlify Redirects (Required for SPA)

Create `public/_redirects`:

```
/*    /index.html   200
```

Or create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Cloudflare Pages

1. Push code to GitHub/GitLab
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click "Save and Deploy"

#### SPA Routing for Cloudflare Pages

Create `public/_routes.json`:

```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/assets/*"]
}
```

---

### GitHub Pages

#### Configure for SPA

1. Add base path to `vite.config.js` if deploying to subpath:

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

2. Create `public/404.html` (GitHub Pages SPA workaround):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Redirect to index.html with the path preserved
      const path = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;
      window.location.replace('/' + path + search + hash);
    </script>
  </head>
  <body>
    Redirecting...
  </body>
</html>
```

#### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Enable GitHub Pages in repository settings → Pages → Source: GitHub Actions

---

### Manual/Static Hosting

For any static file server (Apache, Nginx, S3, etc.):

1. Build the project:
```bash
npm run build
```

2. Upload the contents of `dist/` to your server

3. Configure your server for SPA routing (see section below)

---

## Environment Variables

### Setting Variables on Hosting Platforms

#### Vercel
- Dashboard → Project → Settings → Environment Variables
- Add each variable (e.g., `VITE_STRIPE_PUBLISHABLE_KEY`)

#### Netlify
- Dashboard → Site → Site configuration → Environment variables
- Add variables under "Build & deploy"

#### Cloudflare Pages
- Dashboard → Pages → Project → Settings → Environment variables

### Build-Time Variables

Remember: Vite embeds environment variables at build time, not runtime.

```javascript
// In your code
const apiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
```

Variables must be prefixed with `VITE_` to be accessible in client code.

---

## SPA Routing Configuration

Single Page Applications need server configuration to handle client-side routing.

### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### AWS S3 + CloudFront

1. Configure S3 bucket for static website hosting
2. Set index document: `index.html`
3. Set error document: `index.html`
4. In CloudFront, create custom error response:
   - HTTP Error Code: 403, 404
   - Response Page Path: `/index.html`
   - HTTP Response Code: 200

---

## Performance Optimization

### Build Optimizations

Vite automatically applies these optimizations:
- Code splitting
- Tree shaking
- Minification
- CSS purging (via Tailwind)
- Asset hashing for cache busting

### Recommended Headers

```
# Static assets (long cache)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# HTML (no cache)
/index.html
  Cache-Control: no-cache

# Service worker (if applicable)
/sw.js
  Cache-Control: no-cache
```

### Image Optimization

If adding images to `public/`:
1. Use WebP format where possible
2. Compress images before adding
3. Use appropriate dimensions (avoid oversized images)

### Font Loading

If using custom fonts:
1. Use `font-display: swap` to prevent FOIT
2. Preload critical fonts:
```html
<link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossorigin>
```

---

## Pre-Deployment Checklist

### Code Quality

- [ ] `npm run lint` passes with no errors
- [ ] `npm test` passes all tests
- [ ] No console.log statements in production code
- [ ] No hardcoded API keys or secrets

### Build Verification

- [ ] `npm run build` completes without errors
- [ ] `npm run preview` works locally
- [ ] All routes load correctly (`/`, `/pricing`, `/preview`)
- [ ] Assets load (images, fonts, icons)

### Functionality

- [ ] Navigation works on all pages
- [ ] Cart functionality works (Preview page)
- [ ] Sticker playground is interactive (Hero)
- [ ] Responsive design works on mobile
- [ ] Dark mode works (if enabled)

### Performance

- [ ] Lighthouse score > 90 for Performance
- [ ] Lighthouse score > 90 for Accessibility
- [ ] Lighthouse score > 90 for Best Practices
- [ ] Lighthouse score > 90 for SEO
- [ ] Bundle size is reasonable (~300KB gzipped)

### SEO & Meta

- [ ] Page titles are correct
- [ ] Meta descriptions are set
- [ ] Open Graph tags for social sharing
- [ ] Favicon is present

---

## Post-Deployment Verification

After deploying, verify:

1. **Site loads**: Visit the production URL
2. **All routes work**: Test `/`, `/pricing`, `/preview`
3. **No console errors**: Open DevTools and check console
4. **Assets load**: Images, fonts, and styles render correctly
5. **HTTPS works**: Site loads securely (lock icon)
6. **Forms/checkout**: Test any payment flows in production mode

### Smoke Test Script

```bash
# Check all routes return 200
curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/
curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/pricing
curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/preview

# Check assets load
curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/assets/index-*.js
```

---

## Rollback Procedures

### Vercel

1. Go to Dashboard → Project → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

### Netlify

1. Go to Dashboard → Site → Deploys
2. Find the last working deploy
3. Click "Publish deploy"

### Cloudflare Pages

1. Go to Dashboard → Pages → Project → Deployments
2. Find the last working deployment
3. Click "..." → "Rollback to this deployment"

### Manual Rollback

Keep a backup of the previous `dist/` folder:

```bash
# Before deploying new version
mv dist dist-backup-$(date +%Y%m%d)

# Build new version
npm run build

# If rollback needed
rm -rf dist
mv dist-backup-YYYYMMDD dist
```

---

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: Out of memory**
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Deploy Works but Site is Broken

**Blank page**
- Check browser console for JavaScript errors
- Verify `base` path in `vite.config.js` matches your hosting path

**404 on page refresh**
- SPA routing not configured
- Add `_redirects` file or server configuration

**Assets not loading**
- Check asset paths are relative
- Verify CDN/hosting is serving from correct directory

### Environment Variables Not Working

- Verify variable is prefixed with `VITE_`
- Variables are embedded at build time - rebuild after changing
- Check hosting platform has the variable set
- Remember: `import.meta.env.VITE_*` not `process.env.VITE_*`

---

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
