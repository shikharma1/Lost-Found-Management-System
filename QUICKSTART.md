# Quick Start Guide

This guide will help you get the Student Authentication System running locally in minutes.

## Prerequisites

Before you start, make sure you have:
- **Node.js** (v14+) - Download from [nodejs.org](https://nodejs.org)
- **MongoDB** - Either:
  - Install locally from [mongodb.com](https://www.mongodb.com/try/download/community)
  - Use MongoDB Atlas (free cloud version)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- Git (optional, for cloning)

## Verify Installation

Open your terminal and run:
```bash
node --version
npm --version
mongod --version  # Optional, only if installing locally
```

## Step 1: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. In "Database Access", create a user with username and password
5. In "Network Access", add your IP address
6. Click "Connect" and copy the connection string
7. Replace `<username>` and `<password>` with your credentials

### Option B: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB:
   - **Windows**: MongoDB runs as a service automatically
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

## Step 2: Set Up Backend

### 1. Navigate to backend folder
```bash
cd student-auth-system/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
Copy the `.env.example` file and create `.env`:
```bash
cp .env.example .env
```

### 4. Configure `.env`
Edit the `.env` file with your details:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-auth
JWT_SECRET=your_very_secret_key_change_this_in_production_should_be_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
```

**If using MongoDB Atlas**, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-auth?retryWrites=true&w=majority
```

### 5. Start backend server
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

✅ **Backend is ready at http://localhost:5000**

## Step 3: Set Up Frontend (New Terminal)

### 1. Navigate to frontend folder
```bash
cd student-auth-system/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

The browser will open automatically at `http://localhost:3000`

If not, open it manually and you should see the authentication system.

✅ **Frontend is ready at http://localhost:3000**

## Step 4: Test the Application

### Register a New Student
1. Click "Register here" link on the login page
2. Fill in:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Course: Select any course
3. Click "Register"
4. You'll be redirected to the dashboard

### Login with Your Account
1. On the login page, enter:
   - Email: `john@example.com`
   - Password: `password123`
2. Click "Login"
3. You'll see your dashboard

### Test Dashboard Features
- **Profile Tab**: View your student information
- **Change Password Tab**: 
  - Enter current password: `password123`
  - Enter new password: `newpassword123`
  - Click "Update Password"
- **Change Course Tab**: Select a different course and click "Update Course"
- **Logout Button**: Click to logout and return to login page

## File Structure

```
student-auth-system/
├── backend/
│   ├── config/db.js          → MongoDB connection
│   ├── models/Student.js       → Student schema
│   ├── controllers/            → Business logic
│   ├── routes/auth.js          → API endpoints
│   ├── middleware/auth.js      → JWT verification
│   ├── server.js               → Main server file
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/         → Reusable components
│   │   ├── pages/              → Full pages
│   │   ├── context/AuthContext.js → State management
│   │   ├── services/api.js     → API calls
│   │   ├── styles/             → CSS files
│   │   ├── App.js              → Main component
│   │   └── index.js            → Entry point
│   └── package.json
│
├── README.md                  → Full documentation
├── DEPLOYMENT.md             → Deployment guide
└── docker-compose.yml        → Docker configuration
```

## Troubleshooting

### "MongoDB connection failed"
- Check if MongoDB is running
- Verify MONGODB_URI in `.env` is correct
- For MongoDB Atlas, ensure your IP is whitelisted

### "Port 5000 already in use"
```bash
# Kill the process using port 5000
# Windows Command Prompt (run as admin):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env to different number (e.g., 5001)
```

### "Port 3000 already in use"
```bash
# You can specify a different port when starting:
PORT=3001 npm start
```

### "npm: command not found"
- Node.js is not installed. Download from [nodejs.org](https://nodejs.org)

### "Cannot find module 'express'"
- Run `npm install` in the correct directory (backend or frontend)

### "Invalid credentials" error
- Verify your email and password match what you registered
- Check if the user exists in MongoDB

### CORS errors or API not connecting
- Ensure backend is running on port 5000
- Check that `REACT_APP_API_URL` in frontend matches backend URL
- For Render/Vercel deployment, update the API URL

## Environment Variables Reference

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT (use strong string)
- `JWT_EXPIRE`: Token expiration time (e.g., "7d")
- `NODE_ENV`: development or production

### Frontend (.env.local) - Optional
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Next Steps

After testing locally:

1. **Deploy Backend**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) for Render
2. **Deploy Frontend**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel
3. **Database**: Use MongoDB Atlas for production
4. **Security**: Change JWT_SECRET to a strong random string before deployment

## Common Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start with nodemon
npm start            # Start normally

# Frontend
cd frontend
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
npm run eject        # Eject from Create React App (irreversible)

# Docker (from root)
docker-compose up    # Start all services
docker-compose down  # Stop all services
docker-compose logs  # View logs
```

## Learning Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [React Documentation](https://react.dev)
- [JWT Tutorial](https://jwt.io/introduction)
- [Axios Documentation](https://axios-http.com)

## Project Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB running (local or Atlas)
- [ ] Backend `.env` configured
- [ ] Backend dependencies installed
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 3000
- [ ] Can register a new account
- [ ] Can login with registered account
- [ ] Can update password
- [ ] Can change course
- [ ] Can logout
- [ ] Ready for deployment

## Need Help?

1. Check the [README.md](README.md) for full documentation
2. Review the [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
3. Check browser console for JavaScript errors (F12)
4. Check terminal for server errors
5. Verify environment variables are set correctly

---

**Congratulations!** Your Student Authentication System is now running! 🚀
