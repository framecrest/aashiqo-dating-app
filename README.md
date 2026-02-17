# Aashiqo - Find Your Dil Connection

Aashiqo is a full-stack mobile dating application tailored for the Indian market, built with React Native (Expo), Node.js, and MongoDB.

## Features

- **Authentication**: Email/Password registration and login with JWT protection.
- **Discovery**: Profile swiping system to find potential matches.
- **Matching**: Real-time mutual interest matching.
- **Chat**: Instant messaging using Socket.io with message history.
- **Profile**: Customizable user profiles with bio, city, and interests.

## Tech Stack

### Frontend
- React Native (Expo)
- React Navigation
- Context API (State Management)
- Axios (HTTP Client)
- Socket.io Client (Real-time)
- Lucide React Native (Icons)

### Backend
- Node.js & Express
- MongoDB Atlas (Database)
- Mongoose (ORM)
- Socket.io (Real-time Server)
- JWT & bcryptjs (Security)

## Getting Started

### Prerequisites
- Node.js (v16+)
- Expo Go app on your mobile device (for testing)

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (one has been provided as a template) and add your `MONGO_URI`.
4. Start the server:
   ```bash
   npm run start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `src/utils/constants.js` with your local IP address for `API_BASE_URL` (instead of localhost if testing on a physical device).
4. Start the Expo project:
   ```bash
   npx expo start
   ```

## Folder Structure

### Backend
- `config/`: DB and Socket configurations.
- `controllers/`: Logic for Auth, Users, Matches, and Chat.
- `models/`: Mongoose schemas.
- `routes/`: API endpoint definitions.
- `middleware/`: Auth and Error handlers.

### Frontend
- `src/screens/`: All application screens.
- `src/navigation/`: Auth and Main navigation flows.
- `src/context/`: Auth state management.
- `src/services/`: API communication layer.
- `src/utils/`: Theme and constants.
