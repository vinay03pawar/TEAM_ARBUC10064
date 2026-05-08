# Deployment Guide

This guide explains how to deploy MindCare to various platforms.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Build Output

After running `npm run build`, you'll get a `dist` folder containing:
- `index.html` - Single HTML file with all assets inlined
- This single file can be served from any web server!

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Via Netlify Drop**
   - Build the project: `npm run build`
   - Go to https://app.netlify.com/drop
   - Drag and drop the `dist` folder
   - Done! Your app is live

2. **Via Git**
   - Push your code to GitHub
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   npm run build
   vercel --prod
   ```

Or use the Vercel dashboard:
- Import your Git repository
- Build command: `npm run build`
- Output directory: `dist`

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/mindcare-app"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Self-Hosting

After building (`npm run build`), you can serve the `dist/index.html` file with any web server:

**Python:**
```bash
cd dist
python -m http.server 8000
```

**Node.js (using serve):**
```bash
npm install -g serve
serve dist
```

**Apache/Nginx:**
- Copy contents of `dist` to your web root
- Configure your web server to serve `index.html`

### Option 5: Cloudflare Pages

1. Push your code to GitHub
2. Go to https://pages.cloudflare.com
3. Create a new project
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Deploy!

## Environment Variables

**Important:** This app doesn't use environment variables for the API key. Users enter their Groq API key directly in the Settings tab, and it's stored in their browser's localStorage.

This approach is more secure because:
- API keys stay with the user
- No server-side exposure
- Each user uses their own key
- No shared API quota

## Post-Deployment Checklist

✅ Test all features:
- Mood tracking and saving
- Analytics charts rendering
- AI chat (with valid API key)
- Settings save/load
- Mobile responsiveness

✅ Verify localStorage works:
- Add mood entries
- Refresh page
- Check if data persists

✅ Test on multiple devices:
- Desktop browsers
- Mobile browsers
- Different screen sizes

✅ Performance check:
- Page load speed
- Chart rendering speed
- AI response time

## Custom Domain

### Netlify
1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS (provided by Netlify)

### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records

### Cloudflare Pages
1. Go to Custom domains
2. Add your domain
3. DNS configured automatically if using Cloudflare

## SSL/HTTPS

All recommended platforms (Netlify, Vercel, Cloudflare Pages, GitHub Pages) provide free SSL certificates automatically.

## Performance Optimization Tips

1. **Already Optimized:**
   - Single HTML file (no extra requests)
   - CSS and JS inlined
   - Tree-shaking enabled
   - Minified code

2. **CDN Benefits:**
   - Netlify, Vercel, and Cloudflare all use global CDNs
   - Fast load times worldwide
   - Automatic caching

3. **Lighthouse Score:**
   - Should achieve 90+ on Performance
   - 100 on Accessibility
   - 100 on Best Practices
   - 100 on SEO

## Monitoring

While this is a client-side app, you can add analytics:

### Google Analytics
Add to `index.html` before `</head>`:
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

### Privacy Note
Since this is a mental health app, be very careful with analytics. Consider:
- Not tracking specific mood entries
- Using privacy-focused alternatives like Plausible or Fathom
- Being transparent with users about any tracking

## Troubleshooting Deployment

**Build fails:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`
- Check Node version: `node -v` (should be 16+)

**App loads but features don't work:**
- Check browser console for errors
- Verify localStorage is enabled in browser
- Test with API key in Settings

**Charts not rendering:**
- Verify recharts is installed
- Check if data exists (add mood entries)
- Clear browser cache

## Security Considerations

1. **API Keys:**
   - Stored only in user's localStorage
   - Never exposed in code
   - Only sent to Groq AI

2. **User Data:**
   - All data client-side
   - No server/database
   - Privacy by design

3. **HTTPS:**
   - Always use HTTPS (required for localStorage security)
   - All recommended platforms provide this

## Updates

To update your deployed app:

```bash
# Make changes to code
git add .
git commit -m "Update feature"
git push

# For manual deployments
npm run build
# Then redeploy dist folder
```

Most platforms auto-deploy on git push!

---

Need help? Check the main README.md or platform documentation.
