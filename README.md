# FoodBridge – Save Food. Share Hope.
> **Full-Stack Food Waste Management & Donation Platform (React + Firebase + Capacitor Android)**

FoodBridge connects commercial food suppliers (Hotels, Restaurants, Supermarkets, Caterers) with verified NGOs and food banks in real time to rescue surplus edible food before expiration.

---

## 🌟 Key Features

1. **Three Dynamic User Roles**:
   - **Food Suppliers**: Rapid 30-second surplus food posting with mandatory allergen warnings, storage conditions, and expiry deadlines.
   - **Registered NGOs**: Filter donations by distance and category, claim surplus batches with automated concurrency locking, and assign driver logistics.
   - **Admin Platform**: Verify supplier licenses & NGO Darpan credentials, audit donation batches, and inspect food waste impact metrics.

2. **Full Lifecycle Collection Workflow**:
   - `Available` ➔ `Requested` ➔ `Accepted` ➔ `Picked Up` ➔ `Delivered` (or `Cancelled`).
   - Double-claim protection via atomic state transitions.

3. **Special Hackathon Innovations**:
   - **Interactive Proximity Map**: Live visual geolocation of food donations and NGO shelters in Bangalore.
   - **Live GPS Dispatch Tracking**: Milestone audit progress with route simulation and driver contact details.
   - **Environmental Impact Analytics**: Live counter of meals rescued and methane emissions prevented.
   - **One-Click Role Switcher**: Quick test bar in the sidebar for hackathon judges to inspect Supplier, NGO, and Admin perspectives immediately.

---

## 🚀 How to Run the Web Application

1. Open PowerShell / Command Prompt in this folder:
   ```bash
   npm run dev
   ```
2. Open your browser at:
   ```
   http://localhost:3000
   ```

---

## 🔥 Firebase Setup (Optional)

FoodBridge runs out of the box with responsive in-memory and `localStorage` persistence. To connect your live Firebase instance:

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project named **FoodBridge**.
2. Enable **Authentication** (Email/Password).
3. Create a **Firestore Database** (start in Test Mode).
4. Copy your web app config keys into a `.env` file based on `.env.example`:
   ```env
   VITE_FIREBASE_API_KEY=your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
5. Apply the provided security rules in `firestore.rules`.

---

## 📱 How to Build and Run the Android APK

The Capacitor Android project is configured with Application ID: `com.foodbridge.app`.

### Option A: Open with Android Studio
1. Run:
   ```bash
   npx cap open android
   ```
   *(Or launch Android Studio and choose "Open" -> select the `android` folder in this directory).*
2. Wait for Gradle to finish indexing.
3. In Android Studio, click **Build** ➔ **Build Bundle(s) / APK(s)** ➔ **Build APK(s)**.
4. Once built, click **locate** to find `app-debug.apk` and install it on any Android device or emulator!

### Option B: Build APK Directly from Terminal (Requires Android SDK & Java)
```bash
cd android
./gradlew assembleDebug
```
The generated APK will be at:
`android/app/build/outputs/apk/debug/app-debug.apk`

