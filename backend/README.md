# KRMBet – Backend

This repository contains the backend of **KRMBet**, a sports betting and casino gaming platform. It includes all services, controllers, models, and routes required for:

- User authentication (registration, login, profile)
- Sports odds integration (using The Odds API)
- Bet management (create, list, cancel)
- Payment operations (deposit and withdraw simulation)
- Promotions (list, create, apply)
- Casino functionality (card games, roulette, slots)
- Internationalization (i18n) in English, Spanish, and Portuguese
- Security features like rate limiting and global error handling

Deployed on Render: https://krmbet.onrender.com

---

## 📋 Table of Contents

1. [Technologies & Dependencies](#-technologies--dependencies)  
2. [Prerequisites](#-prerequisites)  
3. [Installation & Setup](#-installation--setup)  
4. [Environment Variables](#-environment-variables)  
5. [Folder Structure](#-folder-structure)  
6. [Running Locally](#-running-locally)  
7. [Main Endpoints](#-main-endpoints)  
8. [API Testing](#-api-testing)  
9. [Deploy to Render](#-deploy-to-render)  
10. [Contributing & License](#-contributing--license)

---

## 🚀 Technologies & Dependencies

The backend is built with **Node.js** and **Express**, using:

- **mongoose**: ORM for MongoDB connection and operations  
- **jsonwebtoken (JWT)**: for issuing and verifying authentication tokens  
- **bcrypt**: for secure password hashing  
- **axios**: for HTTP requests to The Odds API  
- **express-rate-limit**: to limit repeated requests and prevent abuse  
- **helmet**: to set secure HTTP headers  
- **morgan**: to log HTTP requests  
- **nodemon** (devDependency): to automatically restart the server during development

---

## 📦 Prerequisites

Make sure you have the following installed:

1. **Node.js** (v16 or higher recommended)  
2. **npm** (comes with Node.js)  
3. **MongoDB Atlas account** (or your own MongoDB instance)  
4. **The Odds API key** (free or paid)  
5. **Render account** (if you plan to deploy there)

---

## ⚙️ Installation & Setup

1. Clone this repository (backend folder):

   ```bash
   git clone https://github.com/AraMyst/KRMBet.git
   cd KRMBet/backend/src
