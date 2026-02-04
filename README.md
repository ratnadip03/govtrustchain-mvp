# GovTrustChain MVP

A visually engaging, minimal MVP web application for blockchain-inspired government trust scores. Built with React (Vite), Tailwind CSS, and Framer Motion, designed for Firebase Hosting deployment.

## Features

- 🔐 **Firebase Authentication** - Google Sign-In only
- 📊 **Real-time Trust Scores** - Animated trust score tracking (0-100)
- 💬 **Citizen Feedback** - Submit feedback on government projects
- 🎨 **Smooth Animations** - Framer Motion powered micro-animations
- 🎯 **Admin Demo Panel** - Hidden route for trust score manipulation
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Firebase** - Authentication, Firestore, Hosting
- **React Router** - Navigation

## Project Structure

```
govt-trustchain-mvp/
├── src/
│   ├── components/          # Reusable components
│   │   ├── AnimatedNumber.jsx
│   │   ├── ProjectCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/             # React context
│   │   └── AuthContext.jsx
│   ├── firebase/            # Firebase configuration
│   │   ├── config.js
│   │   └── firestore.js
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── CitizenDashboard.jsx
│   │   ├── SubmitFeedbackPage.jsx
│   │   └── AdminDemoPage.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── firebase.json            # Firebase hosting config
├── .firebaserc              # Firebase project config
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** with **Google Sign-In**
3. Create a **Firestore Database** (start in test mode for MVP)
4. Copy your Firebase config from Project Settings > General > Your apps
5. Update `src/firebase/config.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. Initialize Firestore Data

After setting up Firestore, add sample projects to the `projects` collection:

**Collection: `projects`**

Document 1:
```json
{
  "name": "Smart City Infrastructure",
  "department": "Urban Development",
  "trustScore": 80,
  "status": "On-time",
  "lastUpdated": [timestamp]
}
```

Document 2:
```json
{
  "name": "Digital Healthcare Initiative",
  "department": "Health & Welfare",
  "trustScore": 80,
  "status": "On-time",
  "lastUpdated": [timestamp]
}
```

Document 3:
```json
{
  "name": "Renewable Energy Program",
  "department": "Energy & Environment",
  "trustScore": 80,
  "status": "On-time",
  "lastUpdated": [timestamp]
}
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

### 5. Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## Deployment to Firebase Hosting

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase Hosting

```bash
firebase init hosting
```

When prompted:
- Select your Firebase project
- Set public directory to: `dist`
- Configure as single-page app: **Yes**
- Set up automatic builds: **No** (for MVP)

### 4. Update .firebaserc

Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID.

### 5. Deploy

```bash
npm run build
firebase deploy
```

Your app will be live at: `https://your-project-id.web.app`

## Trust Score Logic

- **Initial Score:** 80
- **Milestone Complete:** +5 points
- **Project Delayed:** -10 points
- **Verified Feedback:** +5 points
- **Score Range:** 0-100 (automatically clamped)

## Routes

- `/` - Landing page (public)
- `/login` - Login page (public)
- `/dashboard` - Citizen dashboard (protected)
- `/submit-feedback` - Submit feedback form (protected)
- `/admin-demo` - Admin control panel (protected, hidden route)

## Important Notes

⚠️ **Demo Mode**: This is an MVP for hackathon demonstration. Real blockchain integration would be implemented in production.

⚠️ **No Document Storage**: Image uploads store metadata only. Actual file storage is not implemented in MVP.

⚠️ **Firestore Security**: For production, implement proper Firestore security rules. The MVP uses test mode.

## Firestore Collections

### `projects`
- `name` (string)
- `department` (string)
- `trustScore` (number, 0-100)
- `status` (string: "On-time" | "Delayed")
- `lastUpdated` (timestamp)

### `feedback`
- `userId` (string)
- `userEmail` (string)
- `userName` (string)
- `projectId` (string)
- `projectName` (string)
- `feedback` (string)
- `hasImage` (boolean)
- `imageFileName` (string | null)
- `verified` (boolean)
- `createdAt` (timestamp)

### `users`
- `displayName` (string)
- `email` (string)
- `photoURL` (string | null)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Development

- **Start dev server:** `npm run dev`
- **Build:** `npm run build`
- **Preview build:** `npm run preview`
- **Lint:** `npm run lint`

## License

This project is created for hackathon demonstration purposes.
