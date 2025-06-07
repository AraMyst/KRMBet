# KRMBet Frontend

Minimalist, elegant React application for the KRMBet sports betting and casino platform.


## Prerequisites

- **Node.js** v16 or higher  
- **npm** (comes with Node.js) or **yarn**  
- Access to the KRMBet backend API (deployed at `https://krmbet.onrender.com/api` by default)

## Installation

1. Clone the frontend repository:  
   ```bash
   git clone https://github.com/AraMyst/KRMBet.git
   cd KRMBet/frontend


Environment Variables
Create a .env file in the project root with:

Copiar código
VITE_API_URL=https://krmbet.onrender.com/api
VITE_API_URL — base URL for all API requests.

Project Structure
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── assets/           # static files (icons, favicon, logo)
├── src/
│   ├── Account/          # user profile, bets history, verification
│   ├── Auth/             # login & registration forms, errors
│   ├── Casino/           # casino banner, game list & detail
│   ├── Chat/             # chatbot UI
│   ├── Common/           # shared UI: spinner, language switcher, protected route
│   ├── components/       # layout: Navbar, Footer, UI primitives
│   ├── contexts/         # React Context providers
│   ├── hooks/            # custom hooks (useAuth, useBets, etc.)
│   ├── i18n/             # translation JSON files
│   ├── pages/            # route-level pages
│   ├── services/         # API wrappers (axios instance, authService, etc.)
│   ├── SportsBetting/    # sports betting flow components
│   ├── utils/            # helpers: constants, validators, formatters
│   ├── App.jsx
│   ├── index.jsx
│   ├── routes.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── .env

Technologies & Dependencies
React with hooks & Context API

Vite for fast bundling & HMR

Tailwind CSS for utility-first styling

React Router v6 for client-side navigation

Axios for HTTP requests

Internationalization via custom context & JSON resource files

(Optional) ESLint & Prettier for code quality & formatting