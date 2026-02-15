# 📧 Setup Real Email Sending - Quick Guide

## Option 1: Use Resend (EASIEST - 2 minute setup)

### Step 1: Create Free Resend Account
1. Go to: https://resend.com
2. Click "Sign Up" 
3. Sign up with your email or GitHub
4. Verify your email

### Step 2: Get API Key
1. Go to Dashboard: https://resend.com/api-keys
2. Click "Create API Key"
3. Copy the key (starts with `re_`)

### Step 3: Add to Your Project
1. Open `.env.local` file in your project
2. Find this line:
   ```
   # RESEND_API_KEY=your-resend-api-key-here
   ```
3. Replace with:
   ```
   RESEND_API_KEY=re_XXXXXXXXXXXXXXXX
   ```
   (Paste your actual key from step 2)

4. Save the file

### Step 4: Restart Server
In your terminal:
```bash
npm run dev
```

### Step 5: Test It!
1. Go to http://localhost:3000/opportunity/1
2. Click "🚀 Register Now"
3. Fill in form with REAL EMAIL ADDRESS
4. Click "✨ Register"
5. **Check your Gmail inbox** - email should arrive in 30 seconds!

---

## Option 2: Use Gmail SMTP (Advanced)

If you want to use your own Gmail account instead of Resend:

### Step 1: Enable Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Login if needed
3. Select "Mail" and "Windows Computer"
4. Google will generate a 16-character password
5. Copy it

### Step 2: Update .env.local
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

### Step 3: Restart Server
```bash
npm run dev
```

---

## Troubleshooting

**Email not arriving?**
- ✅ Check SPAM folder first
- ✅ Make sure you used a REAL email address in the form
- ✅ Resend API key is correct (starts with `re_`)
- ✅ Restart server after adding API key
- ✅ Check browser console for errors (F12)

**Test with this email:**
If you don't have Resend account yet, you can use test domain `test@resend.dev` in the form to verify the system works.

---

## How to Verify Emails Are Being Sent

### Check Server Logs
Watch the terminal where `npm run dev` is running. You should see:
```
Registration saved to registration-2026-02-15...json
Email sent via Resend: { id: 'xxx...' }
Registration processed for test@gmail.com: resend
```

### Check Registrations Folder
Emails are also saved locally at:
```
/registrations/registration-YYYY-MM-DD...json
```

---

## Email Template Preview

Emails sent will have:
- ✅ Professional Skill Radar branding
- ✅ Indigo/blue gradient header
- ✅ Registration confirmation details
- ✅ Unique confirmation link
- ✅ Call-to-action button

---

## Quick Checklist

- [ ] Created Resend account
- [ ] Got API key from https://resend.com/api-keys
- [ ] Pasted key into `.env.local`
- [ ] Restarted `npm run dev`
- [ ] Tested with real email address
- [ ] Checked inbox for confirmation email

---

⚡ **Most Common Issue:** Forgot to restart the dev server after updating `.env.local`

Just restart with: `npm run dev`

---

Need help? Check the server logs in the terminal where `npm run dev` is running!
