# MERN Social Media App

Full-stack social media platform built with MERN stack.

## Features

- User authentication (JWT)
- Post creation/editing
- Like & comment system
- User profiles
- Real-time updates

## Tech Stack

- Frontend: React 18
- Backend: Node 25 + Express
- Database: MongoDB
- Real-time: Socket.io

## Setup

````bash
# Backend
cd backend && npm install
npm run dev

# Frontend
cd frontend && npm install
npm start

GET    /posts           - Feed
POST   /posts           - Create post
PUT    /posts/:id/like  - Toggle like

***

### **💻 Step 4: Initialize Git (Project Root)**

```bash
# Navigate to ROOT folder (mern-social-app/)
cd /path/to/your/mern-social-app

# Initialize git
git init

# Add all files (except .gitignore exclusions)
git add .

# First commit
git commit -m "Initial MERN social media app commit"
````
