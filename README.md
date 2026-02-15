<<<<<<< HEAD
# Skill Radar - Professional Opportunities Platform

A modern, fully-functional platform for discovering and managing hackathons, competitions, internships, jobs, scholarships, and courses.

## 🚀 Features

### Core Platform
- **Home Page**: Hero section, statistics, featured opportunities, category browsing
- **Opportunities Page**: Advanced filtering, search, and sorting
- **Opportunity Details**: Full information pages with registration deadlines
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Authentication & User Management ✨ NEW
- **Email/Password Login**: Secure credential-based authentication
- **Google OAuth Login**: One-click sign-in with Google (fully integrated!)
- **Sign Up Page**: User registration with form validation
- **User Profile**: Display logged-in user info in navbar
- **Logout**: Secure session termination
- **NextAuth.js**: Industry-standard authentication framework

### User Interface
- Professional navbar with auth state management
- Beautiful gradient backgrounds and modern components
- Form validation with error messages
- Loading states for async operations
- Mobile-responsive menu

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Images**: Next.js Image Optimization
- **Build Tool**: Turbopack

## 📋 Quick Start

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production
```bash
npm run build
npm run start
```

## 🔐 Authentication

### Demo Login Credentials
- **Email**: `demo@example.com`
- **Password**: `password123` (or any password > 6 characters)

### Google OAuth ✅ Working Now!
The **Google login button is fully integrated and functional**!
- Click "Google" button on login page
- Sign in with your Google account
- User profile displays in navbar
- Seamless logout

**Note**: Currently using demo credentials. See `GOOGLE_OAUTH_SETUP.md` to use your own Google OAuth app.

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout with auth provider
│   ├── page.tsx                      # Home page
│   ├── login/page.tsx               # Login page with Google OAuth
│   ├── signup/page.tsx              # Sign up page
│   ├── opportunities/page.tsx       # Opportunities listing
│   ├── opportunity/[id]/page.tsx    # Individual opportunity details
│   └── api/auth/[...nextauth]/      # NextAuth API routes
├── components/
│   ├── Navbar.tsx                   # Navigation with auth state
│   ├── Footer.tsx                   # Footer
│   └── OpportunityCard.tsx          # Opportunity card
├── context/
│   └── SearchContext.tsx            # Search state
├── data/
│   └── opportunities.ts             # Sample data
├── lib/
│   └── auth.config.ts              # NextAuth config
└── providers/
    └── AuthProvider.tsx            # Session provider
```

## 🎯 Key Features

### Search & Filter
- Search opportunities by title, description, or company
- Filter by category (Hackathons, Competitions, Internships, Jobs, etc.)
- Filter by type (Online, Offline, Hybrid)
- Sort by newest or upcoming deadline

### Opportunity Information
- Prize pool and participant count
- Required skills display
- Registration deadline with urgency indicator
- Certificate information
- Company details
- Action buttons

### User Authentication
- ✅ Session persistence
- ✅ User profile in navbar
- ✅ Secure logout
- ✅ Google OAuth integration
- ✅ Demo credentials for testing

## 🔧 Configuration

### Environment Variables
The `.env.local` file is pre-configured for demo mode:
```env
NEXTAUTH_SECRET=skill-radar-demo-secret-key-2026
GOOGLE_CLIENT_ID=demo-client-id-for-testing
GOOGLE_CLIENT_SECRET=demo-client-secret-for-testing
NEXTAUTH_URL=http://localhost:3000
```

### Custom Google OAuth Setup
1. See `GOOGLE_OAUTH_SETUP.md` for detailed instructions
2. Get credentials from [Google Cloud Console](https://console.cloud.google.com/)
3. Update `.env.local` with your credentials
4. Restart dev server

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
1. Build: `npm run build`
2. Start: `npm run start`
3. Set environment variables in your platform

## 📝 Production Checklist

- [ ] Update `NEXTAUTH_URL` to your domain
- [ ] Use a strong `NEXTAUTH_SECRET`
- [ ] Configure real Google OAuth credentials
- [ ] Enable HTTPS
- [ ] Set production environment variables
- [ ] Test all authentication flows
- [ ] Set up monitoring and logging

## 🤝 Customization

The app is fully customizable:
- Add more opportunity categories
- Connect to a real database
- Add payment integration
- Create admin dashboard
- Add notifications
- Build community features

## 📚 Documentation

- **Google OAuth Setup**: See `GOOGLE_OAUTH_SETUP.md`
- **Getting Started**: See Quick Start section above
- **NextAuth Docs**: https://next-auth.js.org/

## 🐛 Troubleshooting

### Google OAuth Not Working
- Check that `GOOGLE_CLIENT_ID` is set in `.env.local`
- Ensure `NEXTAUTH_URL` matches your domain
- Verify redirect URI in Google Console

### Build Errors
```bash
npm run build
```

### Clear Cache
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 📄 License

MIT

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

**Happy discovering opportunities with Skill Radar!** 🎯
=======
NEXTAUTH_SECRET = skill-radar-demo-secret-key-2026
NEXTAUTH_URL = https://skill-radar.vercel.app
>>>>>>> 6cfe237414d9bbf2452d47fe69551856c9c37404
