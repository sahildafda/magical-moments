# 🚀 Deployment Guide

Complete guide for deploying your romantic surprise website to various hosting platforms.

## Table of Contents
1. [Netlify (Recommended)](#netlify)
2. [Vercel](#vercel)
3. [GitHub Pages](#github-pages)
4. [Traditional Hosting](#traditional-hosting)

---

## Netlify (Recommended) 🌟

Netlify is the easiest and most reliable option for React apps.

### Method 1: Git-based Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/romantic-surprise.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add custom domain
   - Update DNS records as instructed

### Method 2: Drag & Drop

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com/drop](https://netlify.com/drop)
   - Drag the `dist` folder
   - Done!

### Important: Redirects for SPA

The `public/_redirects` file is already included. It ensures all routes work correctly.

---

## Vercel 🔷

Another excellent option with great performance.

### Method 1: CLI Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Link to account
   - Configure project
   - Deploy!

### Method 2: Git Integration

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

---

## GitHub Pages 📄

Good for free hosting, requires extra setup for React Router.

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/romantic-surprise",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/romantic-surprise/',  // Your repo name
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository settings
   - Pages section
   - Source: gh-pages branch
   - Save

**Note:** GitHub Pages has limitations with React Router. Consider Netlify or Vercel for better experience.

---

## Traditional Hosting 🌐

For cPanel, FTP, or traditional web hosting.

### Step 1: Build

```bash
npm run build
```

### Step 2: Upload

Upload **contents** of `dist/` folder (not the folder itself) to your web host:
- cPanel: File Manager → public_html
- FTP: Connect and upload to root directory

### Step 3: Configure .htaccess (Apache)

Create `.htaccess` in the root:

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

### For Nginx

Add to nginx config:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Post-Deployment Checklist ✅

After deploying, verify:

- [ ] All routes work (try different couple URLs)
- [ ] Images load correctly
- [ ] Music player appears (if using music)
- [ ] Animations work smoothly
- [ ] Mobile responsiveness
- [ ] Timeline displays properly
- [ ] Gallery modal opens
- [ ] Confetti effect triggers

---

## Custom Domain Setup 🌍

### Netlify
1. Domain settings → Add custom domain
2. Update DNS records:
   ```
   A Record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```

### Vercel
1. Project settings → Domains
2. Add domain
3. Update DNS:
   ```
   A Record: @ → 76.76.21.21
   CNAME: www → cname.vercel-dns.com
   ```

### Cloudflare (Recommended)
Use Cloudflare for:
- Free SSL certificate
- CDN (faster loading)
- DDoS protection
- Analytics

---

## Performance Optimization 🚀

### Before Deployment

1. **Optimize Images**
   ```bash
   # Use online tools or:
   npm install -g sharp-cli
   sharp -i input.jpg -o output.jpg -q 80
   ```

2. **Check Bundle Size**
   ```bash
   npm run build
   # Check dist folder size
   ```

3. **Lazy Load Images**
   Add loading="lazy" to img tags

### After Deployment

1. **Test Performance**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)

2. **Enable Gzip** (Netlify/Vercel do this automatically)

3. **Use CDN** (Cloudflare or built-in)

---

## Troubleshooting 🔧

### Issue: Routes return 404 on refresh

**Solution:** 
- Netlify: Check `_redirects` file exists
- Vercel: Auto-handled, no action needed
- Apache: Add `.htaccess`
- Nginx: Update config

### Issue: Images not loading

**Solution:**
- Check image paths in JSON
- Verify images uploaded correctly
- Use absolute URLs for testing

### Issue: Slow loading

**Solution:**
- Compress images
- Use external CDN for images
- Enable Cloudflare

### Issue: Music not playing

**Solution:**
- Ensure MP3 uploaded
- Check file path
- Remember: Auto-play is blocked by browsers

---

## Security Best Practices 🔒

1. **Don't commit sensitive data**
   - Use `.gitignore` for private files
   - Store API keys in environment variables

2. **HTTPS only**
   - Most hosts provide free SSL
   - Netlify/Vercel: Automatic
   - Let's Encrypt: Free SSL

3. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

---

## Environment Variables 🔐

If you need to store sensitive data:

1. **Create `.env` file** (not committed to Git)
   ```
   VITE_API_KEY=your_key_here
   ```

2. **Access in code**
   ```javascript
   const apiKey = import.meta.env.VITE_API_KEY;
   ```

3. **Set on hosting platform**
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment variables

---

## Monitoring & Analytics 📊

### Google Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Netlify Analytics
- Built-in, privacy-friendly
- No code changes needed
- Paid add-on

---

## Backup Strategy 💾

1. **Keep Git repository updated**
2. **Export builds regularly**
3. **Document custom changes**
4. **Store original photos separately**

---

## Cost Estimate 💰

### Free Options
- **Netlify**: 100GB bandwidth/month (free)
- **Vercel**: 100GB bandwidth/month (free)
- **GitHub Pages**: Free (with limitations)

### Paid Options
- **Custom domain**: $10-15/year
- **Netlify Pro**: $19/month (if needed)
- **Vercel Pro**: $20/month (if needed)

**Most users won't need paid plans!**

---

## Final Tips 🎯

1. **Test before sharing**
   - Try on different devices
   - Check all links
   - Verify all content displays

2. **Use short URLs**
   - bit.ly or similar
   - Easier to share

3. **Track views**
   - Use analytics
   - See when they opened it

4. **Backup everything**
   - Keep original files
   - Export before making changes

---

**Ready to deploy? Choose a platform and follow the steps above!**

Need help? Check the main README.md or open an issue on GitHub.

Happy deploying! 🚀❤️
