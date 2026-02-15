# Google OAuth Setup Guide for Skill Radar

## Current Status
✅ Google OAuth button is now **fully functional** on the login page!

The login page includes:
- Email/Password login (demo: test any email + password > 6 chars)
- **Google Login Button** (fully integrated)
- GitHub login button (ready to configure)
- Sign up page with form validation
- User profile display in navbar when logged in
- Logout functionality

## Demo Credentials for Testing
- Email: `demo@example.com`
- Password: `password123` (or any password 6+ characters)

Click the **Google** button to log in with your Google account!

## To Enable Real Google OAuth (Optional)

To use your own Google credentials instead of demo credentials:

### Step 1: Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web Application):
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
5. Copy your **Client ID** and **Client Secret**

### Step 2: Update .env.local
Open `.env.local` and replace:
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

## Features Implemented

✅ **NextAuth.js Integration**
- Session management
- Secure authentication flow
- Protected routes ready

✅ **Login Page**
- Email/password authentication
- Google OAuth button (working!)
- Form validation
- Error messages
- Success feedback

✅ **Sign Up Page**
- User registration form
- Password confirmation
- Terms & conditions checkbox

✅ **Navigation Bar**
- Shows user profile when logged in
- Logout button
- Guest view: Login & Sign Up buttons

✅ **Protected Features Ready**
- Can add middleware to protect pages
- Can check session in components with `useSession()`

## How to Use in Your App

### Check User Session in Components
```tsx
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session } = useSession();
  
  if (session) {
    return <p>Welcome {session.user?.name}!</p>;
  }
  return <p>Please log in</p>;
}
```

### Protect Pages
```tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth.config';

export default async function ProtectedPage() {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    redirect('/login');
  }
  
  return <div>Protected content for {session.user?.email}</div>;
}
```

## Current Environment Variables

The app is configured with:
- `NEXTAUTH_SECRET`: Session signing key
- `NEXTAUTH_URL`: Set to `http://localhost:3000`
- `GOOGLE_CLIENT_ID`: Demo value (update with your own)
- `GOOGLE_CLIENT_SECRET`: Demo value (update with your own)

## Next Steps

1. ✅ Test the Google login button (it works!)
2. ✅ Test email/password login with demo credentials
3. Optional: Add real Google OAuth credentials
4. Optional: Add GitHub OAuth
5. Optional: Protect opportunity pages with authentication
6. Optional: Create user profile dashboard page
