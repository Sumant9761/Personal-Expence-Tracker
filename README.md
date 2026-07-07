# Financely - Personal Expense Tracker

Financely is a fully responsive personal finance and expense tracker built with **React**, **Vite**, **Ant Design**, and **Firebase**. It allows users to track their incomes and expenses, visualize financial analytics, and manage transaction history seamlessly with CSV import/export support.

### 🌐 Live Demo
Access the live application here: **[https://personal-finance-tracker-sky.vercel.app/](https://personal-finance-tracker-sky.vercel.app/)**

---

## ✨ Features

- **🔒 Secure Authentication**: Sign up and log in securely using your Email & Password or sign in instantly with **Google OAuth**.
- **💳 Balance Dashboard**: View your real-time **Current Balance**, **Total Income**, and **Total Expenses** at a glance.
- **📊 Interactive Financial Analytics**:
  - **Line Chart**: Tracks your financial history and balance trends over time.
  - **Pie Chart**: Visualizes your spending distribution across different categories (Food, Bills, Rent, Travel, Shopping, etc.).
- **➕ Easy Transaction Tracking**: Add Income or Expenses instantly through interactive modals with custom categories, dates, and names.
- **📑 Advanced Transaction Table**:
  - Search transactions by name.
  - Filter transactions by type (All, Income, Expense).
  - Sort transactions by Date or Amount.
  - **Export to CSV**: Download your transactions history.
  - **Import from CSV**: Import transaction logs from a CSV file directly into your account.
- **📱 Fully Responsive Design**: Seamlessly optimized for all device sizes (mobile, tablet, and desktop viewports).

---

## 🛠️ Tech Stack

- **Frontend Library**: [React (v19)](https://react.dev/)
- **Build Tool**: [Vite (v8)](https://vite.dev/)
- **Styling**: Custom Vanilla CSS & [Ant Design (v6)](https://ant.design/) UI elements
- **Charts & Graphs**: [@ant-design/charts](https://charts.ant.design/)
- **Database & Auth**: [Firebase (v12)](https://firebase.google.com/) (Firestore Database & Firebase Authentication)
- **Utilities**: 
  - `react-firebase-hooks` (Firebase state wrapper)
  - `papaparse` (CSV parser)
  - `moment` (date format utilities)
  - `react-router-dom` (routing)
  - `react-toastify` (alert popups)

---

## 📂 Project Structure

```text
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── assets/             # Vector icons and graphics (search, user, transactions)
│   ├── components/         # Reusable UI Components
│   │   ├── Button/         # Custom Buttons
│   │   ├── Cards/          # Dashboard balance cards
│   │   ├── Charts/         # Line and Pie analytics charts
│   │   ├── Header/         # Navigation Navbar
│   │   ├── Input/          # Custom form input fields
│   │   ├── Modals/         # Modals for Add Income & Add Expense
│   │   ├── TransactionTable/ # Searchable, sortable transaction grid
│   │   └── NoTransactions.jsx # Empty state illustration
│   ├── pages/              # Page views
│   │   ├── Dashboard.jsx   # Main tracking workspace
│   │   └── Signup.jsx      # Login and Registration page
│   ├── firebase.jsx        # Firebase Client SDK Configuration
│   ├── App.jsx             # Navigation Routing
│   ├── index.css           # Global typography & root styles
│   └── main.jsx            # Application entrypoint
├── vercel.json             # Vercel SPA routing redirects configuration
├── package.json            # Scripts & project dependencies
└── vite.config.js          # Vite config settings
```

---

## 🚀 Commands & Development Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
Clone the repository and install the project dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your Firebase API key:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
```

### 3. Run Development Server Local
Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for Production
Compile the project to optimized static assets in the `dist` folder:
```bash
npm run build
```

### 5. Preview Production Build Locally
Verify the production build locally before deploying:
```bash
npm run preview
```

---

## ☁️ Deployment Settings (Vercel)

The project is configured for seamless deployment on Vercel:

1. **SPA Routing**: The `vercel.json` file is configured with fallback rewrites to ensure subpages (like `/dashboard`) route correctly on browser page refreshes.
2. **Environment Variable**: Ensure you add the environment variable `VITE_FIREBASE_API_KEY` in your Vercel Project Settings (`Settings` -> `Environment Variables`) so Firebase initializes correctly on the live site.
3. **Google Authentication Authorization**: In your Firebase Console under **Authentication** -> **Settings** -> **Authorized domains**, make sure to add your deployed Vercel domain (`personal-finance-tracker-sky.vercel.app`) to authorize login popup redirects.
