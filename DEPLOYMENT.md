# 🚀 Deploy Skill Radar to Production

## Recommended: Deploy to Vercel (FREE & EASIEST)

Vercel is made by the Next.js creators - perfect for your app!

### Step 1: Prepare Your Project

1. Make sure all code is saved and committed to Git
2. Build locally to verify everything works:
   ```bash
   npm run build
   ```

### Step 2: Push to GitHub

1. Create GitHub account: https://github.com/signup
2. Create new repository: https://github.com/new
3. Name it: `skill-radar`
4. In your project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Skill Radar v1"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/skill-radar.git
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Login with GitHub
3. Import `skill-radar` repository
4. Click "Import"
5. **Environment Variables:** Add these:
   ```
   NEXTAUTH_SECRET=your-secret-here
   NEXTAUTH_URL=https://your-domain.vercel.app
   RESEND_API_KEY=re_XXXXXXXXXXXX  (optional - for emails)
   ```
6. Click "Deploy"
7. **Done!** Your app is live! 🎉

### Step 4: Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel will guide you)

---

## Alternative: Deploy to Other Platforms

### Netlify
1. Push to GitHub (same as step 2)
2. Go to: https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Add environment variables
6. Deploy

### AWS/Azure/DigitalOcean
- More complex but powerful options
- Better for large-scale applications

---

## Production Checklist

### Before Deploying:

- [ ] Update `.env.production` with real credentials
- [ ] Add valid `NEXTAUTH_SECRET` (use something secure)
- [ ] Add `RESEND_API_KEY` for real emails
- [ ] Set correct `NEXTAUTH_URL` to your domain
- [ ] Test build: `npm run build`
- [ ] Test locally: `npm run dev`

### Environment Variables Needed:

```env
# Required
NEXTAUTH_SECRET=generate-random-string-here
NEXTAUTH_URL=https://yourdomain.com

# Optional but Recommended
RESEND_API_KEY=re_XXXXXXXXXXXXXXXX
```

### Generate NEXTAUTH_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Deployment Steps Summary

```bash
# 1. Build for production
npm run build

# 2. Test production build
npm run start

# 3. Initialize Git
git init
git add .
git commit -m "Initial commit"

# 4. Push to GitHub
git push origin main

# 5. Deploy to Vercel
# Go to vercel.com/new and select your repository
```

---

## After Deployment

### Check Your Live Site
- URL: `https://your-app-name.vercel.app`
- Or your custom domain

### Monitor Performance
- Vercel Dashboard shows:
  - Visit analytics
  - Performance metrics
  - Edge function logs
  - Deployment history

### Update Your App Later
```bash
# Make changes locally
git add .
git commit -m "Update features"
git push origin main

# Vercel auto-deploys! ✨
```

---

## Email Setup for Production

### Resend Configuration:
1. Already set up? Use same API key
2. New setup: Go to https://resend.com
3. Get API key
4. Add to Vercel environment variables

### Custom Domain for Emails (Optional):
1. In Resend: Add your domain
2. Follow DNS setup instructions
3. Emails will be sent from `noreply@yourdomain.com`

---

## Custom Domain Setup (Optional)

### Buy Domain
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### Point Domain to Vercel
1. In Vercel: Settings → Domains
2. Add your domain name
3. Update DNS records to point to Vercel
4. Wait 24-48 hours for propagation

---

## Troubleshooting

**Build Failed?**
- Check console output for errors
- Run `npm run build` locally to debug
- Check `.env.production` variables

**App Running Slow?**
- Check Vercel Analytics
- Optimize images
- Review database queries

**Emails Not Sending?**
- Verify RESEND_API_KEY is set
- Check spam folder
- Check Resend dashboard for failures

---

## Next Steps

### To Deploy Right Now:
1. ✅ Make sure code is ready
2. ✅ Create GitHub account
3. ✅ Push code to GitHub
4. ✅ Deploy to Vercel
5. ✅ Share your live link!

### Example Live URLs After Deploy:
```
https://skill-radar.vercel.app
https://skill-radar.com (with custom domain)
```

---

## Production Features Enabled

When you deploy, you automatically get:
- ✅ Global CDN (fast worldwide)
- ✅ Automatic HTTPS/SSL
- ✅ Automatic deployments on `git push`
- ✅ Analytics dashboard
- ✅ Performance monitoring
- ✅ Environmental variables management
- ✅ Serverless functions (for API routes)

---

🎉 **Your Skill Radar will be live for the world to see!**

Questions? Check deployment logs in Vercel dashboard or run `npm run build` locally first to debug.
