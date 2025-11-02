# 🔥 Sizzle - Food Discovery & Recipe App

A Tinder-style food discovery app built with React Native (Expo) and Node.js. Swipe through recipes, track ingredients, and share your culinary creations!

## 📱 Features

- **Swipe Interface**: Tinder-style recipe discovery with like/pass gestures
- **User Profiles**: Dietary preferences, allergies, and food goals
- **Ingredient Tracking**: Scan receipts with OCR to track pantry items
- **Social Feed**: Share recipes and see what others are cooking
- **Personalized Recommendations**: AI-powered recipe suggestions
- **Video Integration**: Short-form recipe videos (TikTok/YouTube Shorts style)

## 🛠️ Tech Stack

### Frontend
- **React Native** with **Expo SDK 54**
- **React Navigation** (Stack & Bottom Tabs)
- **Firebase** (Authentication & Firestore)
- **Expo Camera** for receipt scanning
- **Gesture Handler & Reanimated** for swipe animations

### Backend
- **Node.js** with **Express**
- **Firebase Admin SDK**
- **Google Vision API** for OCR
- **Multer** for file uploads

## 📁 Project Structure

```
Sizzle/
├── frontend/                 # React Native mobile app
│   ├── src/
│   │   ├── screens/
│   │   │   ├── Auth/        # Login, Signup, ProfileSetup
│   │   │   └── Main/        # Swipe, Feed, Inventory, Profile
│   │   ├── navigation/      # Auth & Main navigators
│   │   └── data/            # Mock data
│   ├── App.js               # Main app component
│   ├── app.json             # Expo configuration
│   └── package.json
├── backend/                  # Node.js API server
│   ├── routes/              # API endpoints
│   │   ├── recipes.js
│   │   ├── users.js
│   │   ├── ocr.js
│   │   └── feed.js
│   ├── server.js            # Express server
│   └── package.json
└── config/
    └── firebase.js          # Firebase configuration

```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your phone (iOS/Android)
- Firebase project (for authentication & database)

### 1. Clone & Install

```bash
# Navigate to the project directory
cd Sizzle

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password)
4. Create a **Firestore Database**
5. Get your Firebase config from Project Settings
6. Update `config/firebase.js` with your credentials

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Backend Configuration

```bash
cd backend

# Create .env file from example
cp .env.example .env

# Edit .env with your credentials
# - Port number
# - Firebase service account path
# - Google Vision API key (for OCR)
```

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:3000`

### 5. Start the Frontend App

```bash
cd frontend
npm start
```

This will open Expo Dev Tools. You can:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app on your phone

## 📱 Using Expo Go

1. Download **Expo Go** from App Store (iOS) or Play Store (Android)
2. Run `npm start` in the frontend directory
3. Scan the QR code with your phone camera
4. App will load in Expo Go

## 🔐 Firebase Authentication

The app uses Firebase Authentication with email/password. To test:

1. **Sign Up**: Create a new account
2. **Profile Setup**: Choose dietary preferences, allergies, and food goals
3. **Auto-login**: Firebase handles auth state automatically

## 🧪 Testing with Mock Data

The app includes mock data for testing:
- **10 sample recipes** in `frontend/src/data/mockData.js`
- **5 sample posts** for the social feed
- **Mock OCR responses** from backend

## 📡 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes/recommendations` - Get personalized recipes
- `POST /api/recipes/search` - Search recipes

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update profile
- `GET /api/users/:userId/liked-recipes` - Get liked recipes
- `POST /api/users/:userId/like-recipe` - Like a recipe
- `GET /api/users/:userId/inventory` - Get inventory

### OCR
- `POST /api/ocr/scan-receipt` - Scan receipt image
- `POST /api/ocr/extract-text` - Extract text from image

### Feed
- `GET /api/feed` - Get social feed
- `POST /api/feed` - Create new post
- `POST /api/feed/:postId/like` - Like a post
- `POST /api/feed/:postId/comments` - Add comment

## 🎨 Key Screens

### 1. Swipe Screen (Discover)
- Tinder-style card interface
- Swipe right to like, left to pass
- Shows recipe image, name, tags, cook time, calories
- Action buttons for manual liking

### 2. Feed Screen
- Social posts from other users
- Like and comment on posts
- Video preview support
- Pull to refresh

### 3. Inventory Screen
- View pantry items
- Scan receipts with camera
- Manually add items
- Categorized ingredients

### 4. Profile Screen
- User info and stats
- Dietary preferences & allergies
- Food goal
- Settings & logout

## 🔮 Next Steps & Future Features

### Phase 1: Core Features
- [x] Connect to real Firebase Firestore
- [ ] Implement Google Vision API for OCR
- [ ] Add image upload for user posts
- [ ] Recipe detail screen with full instructions

### Phase 2: Social Features
- [ ] Follow/unfollow users
- [ ] Comment system on posts
- [ ] Share recipes externally
- [ ] User-generated recipes

### Phase 3: Advanced Features
- [ ] AI-powered recipe recommendations (ML model)
- [ ] Video recording & playback (TikTok-style)
- [ ] Nutrition tracking dashboard
- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Recipe collections/folders

### Phase 4: Monetization
- [ ] Sponsored recipe cards
- [ ] Premium subscriptions
- [ ] Partner integrations (grocery delivery)
- [ ] Ad placements

## 🤝 Contributing

This is a starter template. Feel free to extend and customize!

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 💡 Tips

- Use **mock data** first to test UI/UX before implementing full backend
- Start with Firebase for quick prototyping
- Add **offline support** for better UX
- Implement **image caching** for better performance
- Consider using **Expo Application Services (EAS)** for building standalone apps

---

**Made by Salem Bagnied**