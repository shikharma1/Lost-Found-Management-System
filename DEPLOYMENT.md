# Deployment Guide for Student Authentication System

## Backend Deployment on Render

### Step 1: Prepare Your Backend
1. Ensure all code is pushed to GitHub
2. Verify `.env.example` has all required variables

### Step 2: Create Render Service
1. Log in to [Render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Select your GitHub repository
4. Configure:
   - **Name**: `student-auth-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for production)

### Step 3: Set Environment Variables
In Render dashboard, add these environment variables:
```
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<generate-a-random-secure-secret>
NODE_ENV=production
```

### Step 4: Deploy
Click **Deploy**. Render will:
- Install dependencies
- Start the server
- Provide a public URL (e.g., https://student-auth-backend.onrender.com)

---

## Frontend Deployment on Vercel

### Step 1: Prepare Your Frontend
1. Ensure all code is pushed to GitHub
2. Update API endpoint configuration

### Step 2: Create Vercel Project
1. Log in to [Vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Set Environment Variables
In Vercel dashboard, add:
```
REACT_APP_API_URL=<your-render-backend-url>
```

Example:
```
REACT_APP_API_URL=https://student-auth-backend.onrender.com/api
```

### Step 4: Deploy
Click **Deploy**. Vercel will:
- Build the React app
- Deploy to edge network
- Provide a public URL (e.g., https://student-auth-frontend.vercel.app)

---

## Local Deployment with Docker

### Prerequisites
- Docker installed
- Docker Compose installed

### Running with Docker Compose

1. Navigate to project root:
```bash
cd student-auth-system
```

2. Create `.env` file in backend directory with proper MongoDB URI

3. Start all services:
```bash
docker-compose up -d
```

4. Services will be available at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - MongoDB: localhost:27017

5. Stop services:
```bash
docker-compose down
```

---

## MongoDB Atlas Setup (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/student-auth?retryWrites=true&w=majority
   ```
4. Use this as `MONGODB_URI` in environment variables

---

## Production Checklist

- [ ] Set strong `JWT_SECRET` (min 32 characters)
- [ ] Use MongoDB Atlas for database
- [ ] Enable HTTPS/SSL
- [ ] Set `NODE_ENV=production` on backend
- [ ] Configure CORS properly
- [ ] Set strong password requirements
- [ ] Enable rate limiting (optional)
- [ ] Set up monitoring and logging
- [ ] Test all features after deployment
- [ ] Verify environment variables are set
- [ ] Test token expiration

---

## Troubleshooting

### Backend won't connect to MongoDB
- Verify MongoDB URI is correct
- Check if MongoDB is running (for local)
- Ensure IP address is whitelisted (for Atlas)

### Frontend can't reach backend
- Verify `REACT_APP_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running and accessible

### Authentication not working
- Check JWT_SECRET is the same on backend
- Verify token is being stored in localStorage
- Check browser console for errors

---

## Useful Commands

```bash
# Local development
cd backend && npm run dev

# Build frontend
cd frontend && npm run build

# Run with Docker
docker-compose up

# Stop Docker services
docker-compose down

# View Docker logs
docker-compose logs -f

# Restart services
docker-compose restart
```

---

## Support
For issues or questions, refer to the main README.md file.
