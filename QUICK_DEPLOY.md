# ⚡ Quick Deploy to Vercel (5 Minutes)

## What You Need
- GitHub account (free)
- Your Skill Radar code

## Step-by-Step

### 1️⃣ Create GitHub Account (if you don't have one)
- Go to: https://github.com/signup
- Fill in email, password, username
- Verify email
- Done ✅

### 2️⃣ Upload Code to GitHub
Open PowerShell in your project folder and run:

```powershell
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Skill Radar - Initial commit"

# Create main branch
git branch -M main

# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/skill-radar.git

# Push to GitHub
git push -u origin main
```

After running these commands, your code is on GitHub! ✅

### 3️⃣ Deploy to Vercel
1. Go to: https://vercel.com/new
2. Click "Continue with GitHub" 
3. Authorize Vercel
4. Find and select `skill-radar` repository
5. Click "Import"
6. **Add Environment Variables:**
   - Click "Edit" under Environment Variables
   - Add these:
   ```
   NEXTAUTH_SECRET = (copy from your .env.local)
   NEXTAUTH_URL = https://skill-radar.vercel.app
   ```
   - Optional:
   ```
   RESEND_API_KEY = (your API key if you set up Resend)
   ```
7. Click "Deploy"
8. Wait 2-3 minutes...
9. **Done!** 🎉

### 4️⃣ Your Live URL
After deployment completes, Vercel shows:
```
https://skill-radar-XXXXX.vercel.app
```

Share this link with anyone! It's live on the internet! 🌐

---

## What to Do Next

### Update Environment Variables Later
If you need to change variables:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Edit and save
5. Vercel auto-redeploys

### Update Your Website Code
1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```
3. Vercel auto-deploys in 1-2 minutes! ✨

### Add Custom Domain
In Vercel Dashboard:
1. Settings → Domains
2. Add your domain (example: skillradar.com)
3. Follow DNS instructions
4. Wait 24-48 hours

---

## Common Issues

**"GitHub not connecting?"**
- Make sure you authorized Vercel in GitHub
- Go to https://github.com/settings/applications and check

**"Deployment failed?"**
- Check build logs in Vercel
- Make sure `npm run build` works locally first
- Check environment variables are correct

**"Website down after update?"**
- Check Vercel deployment status
- Redeploy: Go to Deployments → Redeploy

---

## Verify Everything Works

After deployment:
1. Go to your live URL
2. Check homepage loads ✅
3. Try navigating to opportunities ✅
4. Registration should work ✅

---

## Simple Deployment Summary

```
Local Development → GitHub → Vercel Deploy → Live Website
```

That's it! Your Skill Radar is now PUBLIC! 🚀

---

✉️ Questions? Check Vercel docs: https://vercel.com/docs
