# 📧 Registration Email System - Setup Guide

## Overview
The Skill Radar platform now sends real confirmation emails when users register for opportunities. This guide explains how to set up and use the email functionality.

## How It Works

### User Flow
1. User clicks "🚀 Register Now" on an opportunity detail page
2. User fills in form (Full Name, Email, Phone)
3. Clicking "✨ Register" submits the data to the `/api/register` endpoint
4. API sends a professional HTML email with a confirmation link
5. Success modal shows with email confirmation message
6. User receives email from Skill Radar with registration details

### Email Features
- ✅ Professional HTML email template
- ✅ Registration confirmation with opportunity details
- ✅ Unique confirmation link for each registration
- ✅ Branded as "Skill Radar" 
- ✅ Contact information in footer

## Setup Instructions

### 1. Email Service Configuration

#### Option A: Use Gmail (Recommended for Testing)
1. Go to your Google Account: https://myaccount.google.com
2. Enable 2-Step Verification
3. Generate an App Password at: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the generated password (16 characters)

#### Option B: Use a Custom Email Service
- SendGrid: https://sendgrid.com
- Mailgun: https://www.mailgun.com
- AWS SES: https://aws.amazon.com/ses/

### 2. Configure Environment Variables

Edit `.env.local` in the project root:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Example with Gmail:
EMAIL_USER=noreply.skillradar@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  (16-char app password)
```

### 3. Restart the Development Server

```bash
npm run dev
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── register/
│   │       └── route.ts          # Email sending API endpoint
│   ├── opportunity/
│   │   └── [id]/
│   │       └── page.tsx          # Updated with API call
│   ├── registration-confirmed/
│   │   └── page.tsx              # Confirmation page after email click
│   └── ...
```

## API Endpoint Details

### POST `/api/register`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "opportunityTitle": "AI/ML Hackathon 2026",
  "opportunityId": "1"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Registration successful! Confirmation email sent.",
  "confirmationLink": "http://localhost:3000/registration-confirmed?token=xxx&email=john@example.com"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message explaining what went wrong",
  "details": "Additional error details"
}
```

## Email Template Customization

Edit `src/app/api/register/route.ts` to customize:
- Email subject line
- Email HTML template
- Sender name (currently "Skill Radar")
- Footer content
- Logo/branding

### Current Email Subject:
```
✨ Registration Confirmed - {opportunityTitle} | Skill Radar
```

### Current Email Sender:
```
"Skill Radar" <noreply.skillradar@gmail.com>
```

## Testing

### 1. Test with Demo Credentials
Use the pre-configured test account:
- **Email:** noreply.skillradar@gmail.com
- **Password:** skillradar123456789

### 2. Test Emails
Create a test email account (Gmail, Outlook, etc.) and use that in the registration form to see emails in your inbox.

### 3. Check Email Headers
When testing, verify these headers in received emails:
- From: "Skill Radar" <noreply.skillradar@gmail.com>
- Subject: ✨ Registration Confirmed - [Opportunity] | Skill Radar
- Contains confirmation link to `/registration-confirmed`

## Email Sending Flow

```
User Submits Form
    ↓
POST /api/register
    ↓
Validate Data
    ↓
Create Confirmation Token
    ↓
Generate HTML Email Template
    ↓
Send via SMTP (Gmail/SendGrid/etc)
    ↓
Return Success Response
    ↓
Show Success Modal
    ↓
Auto-close Modal (3 seconds)
```

## Troubleshooting

### Email Not Sending

**Problem:** API returns error about credentials
- **Solution:** Check that EMAIL_USER and EMAIL_PASSWORD are correctly set in `.env.local`
- **Gmail Note:** You must use an App-Specific Password, not your regular Gmail password

**Problem:** SMTP Connection Error
- **Solution:** Enable "Less secure app access" (Gmail) or check SMTP settings for your email service

**Problem:** Email goes to Spam
- **Solution:** Add SPF and DKIM records to your domain (for production)

### Modal Not Closing
- Check browser console (F12) for errors
- Ensure the API endpoint is responding correctly
- Check network tab to see API response

## Production Deployment

For production, update:

```env
# .env.production
EMAIL_USER=official-email@yourdomain.com
EMAIL_PASSWORD=production-app-password
NEXTAUTH_URL=https://yourdomain.com
```

### Important Security Notes
- Never commit `.env.local` with real credentials
- Use environment-specific variables for different environments
- Implement rate limiting on the `/api/register` endpoint
- Add CAPTCHA to prevent spam registrations
- Validate email addresses before sending

## Advanced Customization

### Change Email Template

Edit the `emailContent` variable in `src/app/api/register/route.ts`:

```tsx
const emailContent = `
// Your custom HTML email template here
`;
```

### Add Database Storage

To track registrations, add to the API endpoint before sending email:

```tsx
// Add to the API route (after validation):
const registration = await db.registrations.create({
  fullName,
  email,
  phone,
  opportunityId,
  registeredAt: new Date(),
  confirmationToken,
});
```

### Send Different Email to Admin

Add an additional email send for admin notifications:

```tsx
// Admin notification email
await transporter.sendMail({
  from: '"Skill Radar Notifications" <noreply.skillradar@gmail.com>',
  to: 'admin@skillradar.com',
  subject: `New Registration - ${opportunityTitle}`,
  html: `<p>New registration from ${fullName} (${email})</p>`,
});
```

## Support

For issues or questions:
1. Check the error message in browser console
2. Review API response in Network tab
3. Verify `.env.local` configuration
4. Test with a simple email service first (Gmail recommended)

---

💡 **Skill Radar** - Professional Opportunities Platform
Version 1.0 | February 2026
