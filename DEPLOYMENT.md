# Deployment Guide - GovTrustChain MVP

## Quick Deployment Checklist

### Pre-Deployment

- [ ] Firebase project created
- [ ] Authentication enabled (Google Sign-In)
- [ ] Firestore database created
- [ ] Sample projects added to Firestore
- [ ] Firebase config updated in `src/firebase/config.js`
- [ ] `.firebaserc` updated with project ID

### Step-by-Step Deployment

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication.

#### 3. Initialize Firebase Hosting

```bash
firebase init hosting
```

**Configuration Options:**
- **Select Firebase project:** Choose your project
- **What do you want to use as your public directory?** → `dist`
- **Configure as a single-page app?** → `Yes`
- **Set up automatic builds and deploys with GitHub?** → `No` (for MVP)

#### 4. Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

#### 5. Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

Or deploy everything:

```bash
firebase deploy
```

#### 6. Verify Deployment

Visit your deployed app:
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

## Firebase Configuration Files

### `firebase.json`
Already configured for single-page app routing.

### `.firebaserc`
Update with your Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

## Firestore Setup

### 1. Create Collections

In Firebase Console > Firestore Database:

1. **Create Collection:** `projects`
2. **Create Collection:** `feedback`
3. **Create Collection:** `users`

### 2. Add Sample Projects

Add documents to `projects` collection:

**Document 1:**
- Field: `name` → Value: `Smart City Infrastructure`
- Field: `department` → Value: `Urban Development`
- Field: `trustScore` → Value: `80` (number)
- Field: `status` → Value: `On-time`
- Field: `lastUpdated` → Value: `[Current Timestamp]`

**Document 2:**
- Field: `name` → Value: `Digital Healthcare Initiative`
- Field: `department` → Value: `Health & Welfare`
- Field: `trustScore` → Value: `80` (number)
- Field: `status` → Value: `On-time`
- Field: `lastUpdated` → Value: `[Current Timestamp]`

**Document 3:**
- Field: `name` → Value: `Renewable Energy Program`
- Field: `department` → Value: `Energy & Environment`
- Field: `trustScore` → Value: `80` (number)
- Field: `status` → Value: `On-time`
- Field: `lastUpdated` → Value: `[Current Timestamp]`

### 3. Firestore Security Rules (For Production)

For MVP/demo, test mode is fine. For production, use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects: Read-only for all, write for admins
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Feedback: Users can create, read own
    match /feedback/{feedbackId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
                      (resource.data.userId == request.auth.uid || 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Users: Read/write own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Authentication Setup

### Enable Google Sign-In

1. Go to Firebase Console > Authentication
2. Click "Get Started"
3. Enable "Google" sign-in provider
4. Add your project's support email
5. Save

### Authorized Domains

Firebase automatically adds:
- `localhost` (for development)
- Your Firebase hosting domain

For custom domains, add them in Authentication > Settings > Authorized domains.

## Troubleshooting

### Build Errors

- **Error: Cannot find module**
  - Run `npm install` to ensure all dependencies are installed

- **Error: Firebase config missing**
  - Verify `src/firebase/config.js` has correct credentials

### Deployment Errors

- **Error: Project not found**
  - Check `.firebaserc` has correct project ID
  - Run `firebase use --add` to select project

- **Error: Permission denied**
  - Ensure you're logged in: `firebase login`
  - Verify you have hosting permissions for the project

### Runtime Errors

- **Authentication not working**
  - Verify Google Sign-In is enabled in Firebase Console
  - Check authorized domains include your hosting URL

- **Firestore errors**
  - Verify Firestore is created and in test mode (for MVP)
  - Check collections exist with correct field names

## Post-Deployment

### Test Checklist

- [ ] Landing page loads correctly
- [ ] Project cards display with animations
- [ ] Google Sign-In works
- [ ] Dashboard loads after login
- [ ] Can submit feedback
- [ ] Admin demo page accessible at `/admin-demo`
- [ ] Trust scores update in real-time

### Performance Optimization

The build is already optimized, but you can:
- Enable Firebase Hosting CDN caching
- Add custom domain in Firebase Console
- Set up custom 404 page if needed

## Custom Domain (Optional)

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

## Continuous Deployment (Future)

For automated deployments:

1. Connect GitHub repository
2. Enable GitHub Actions or Firebase CI/CD
3. Configure build commands: `npm install && npm run build`
4. Set deploy directory: `dist`

## Support

For Firebase-specific issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
