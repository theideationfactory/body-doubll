# Neurodivergent Tools

A web platform designed to provide tools and resources for neurodivergent individuals. Built using **React**, **Vite**, and **Firebase**, it features interactive and accessible components to enhance usability and engagement.

## Features

- **User Authentication** (Google OAuth via Firebase)
- **Dynamic UI** with Framer Motion & Tailwind CSS
- **Data Visualization** using Chart.js
- **Audio Support** with Howler.js
- **Real-time Database & Hosting** via Firebase

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Hosting)
- **Libraries**: Framer Motion, Chart.js, Howler.js, React Router

## Installation & Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up Firebase**

   - Create a `.env` file and add your Firebase config:
     ```sh
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     ```

4. **Run the development server**

   ```sh
   npm run dev
   ```

## Deployment

To deploy the project on Firebase Hosting:

```sh
npm run build
firebase deploy
```