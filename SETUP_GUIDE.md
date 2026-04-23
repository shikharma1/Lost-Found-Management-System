# Lost & Found Item Management System - Complete Setup Guide

## 🎯 Quick Start (5 minutes)

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following content
MONGODB_URI=mongodb://localhost:27017/lost-found
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development

# Start the backend server
npm run dev
# Server will run on http://localhost:5000
```

### Step 2: Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file with the following content
REACT_APP_API_URL=http://localhost:5000/api

# Start the React application
npm start
# Application will open on http://localhost:3000
```

That's it! You now have a fully functional Lost & Found System.

---

## 📋 What Changed from Original System

The student authentication system has been transformed into a Lost & Found Item Management System:

### ✂️ Removed Features
- Course selection field (from User model)
- Change Course functionality
- updateCourse API endpoint
- Course display on profile

### ✨ New Features Added

#### Backend
1. **Item Model** - Complete schema for Lost/Found items
2. **Item Controller** - Full CRUD operations with search
3. **Item Routes** - API endpoints for item management
4. **Search Functionality** - Find items by name, category, or type

#### Frontend
1. **Item Management Dashboard** - Add, view, update, delete items
2. **Search Interface** - Search items with multiple filters
3. **My Items Section** - View and manage own postings
4. **Modern UI** - Enhanced styling with animations
5. **Item Cards** - Beautiful presentation of item information

---

## 🏗️ System Architecture

### Backend Architecture
```
Client Request
    ↓
Express Server (Port 5000)
    ├── Auth Routes (/api/auth)
    │   ├── POST /register
    │   ├── POST /login
    │   ├── GET /me
    │   └── PUT /update-password
    │
    ├── Item Routes (/api/items)
    │   ├── POST / (Create Item)
    │   ├── GET / (Get All Items)
    │   ├── GET /:id (Get Item by ID)
    │   ├── GET /search/query (Search Items)
    │   ├── GET /user/my-items (Get My Items)
    │   ├── PUT /:id (Update Item)
    │   └── DELETE /:id (Delete Item)
    │
    └── Auth Middleware (Protect Routes)
            ↓
        MongoDB Database
```

### Frontend Architecture
```
React App (Port 3000)
    ├── Auth Pages
    │   ├── Register
    │   ├── Login
    │
    └── Dashboard
        ├── All Items Tab
        ├── My Items Tab
        ├── Add Item Tab
        └── Search Tab
        
    Context API (AuthContext)
        └── User State & Authentication Logic
    
    Services (API)
        ├── authAPI (Authentication endpoints)
        └── itemAPI (Item endpoints)
```

---

## 📊 Database Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  password: "bcrypt_hashed_password",
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Items Collection
```javascript
{
  _id: ObjectId,
  itemName: "Blue Backpack",
  description: "A blue backpack with red straps, lost near library",
  type: "Lost",
  location: "Library Building",
  date: ISODate,
  category: "Accessories",
  contactInfo: "john@example.com",
  user: ObjectId (User reference),
  status: "Open",
  image: null,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

---

## 🔑 Environment Variables

### Backend .env
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/lost-found
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/lost-found

# JWT Configuration
JWT_SECRET=your_very_secret_key_use_strong_random_string
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development  # or 'production'
```

### Frontend .env
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
# For production: https://your-backend-url/api
```

---

## 🧪 Testing the System

### Test Registration
1. Go to http://localhost:3000/register
2. Enter a new email, name, and password
3. Click Register
4. You should be logged in and redirected to dashboard

### Test Item Creation
1. Go to Dashboard → Add Item tab
2. Fill in all required fields:
   - Item Name: "Blue Notebook"
   - Type: Select "Lost"
   - Description: "A blue notebook with handwritten notes"
   - Category: "Books"
   - Location: "Library"
   - Date: Select today's date
   - Contact Info: "your@email.com"
3. Click "Create Item"
4. Success message should appear
5. Go to "My Items" to see your posted item

### Test Search
1. Go to Dashboard → Search tab
2. Search by:
   - Item Name (partial search)
   - Category
   - Type (Lost/Found)
3. Click Search
4. Results should display matching items

### Test Logout
1. Click the "Logout" button
2. You should be redirected to login page
3. Token should be removed from localStorage

---

## 📱 API Request Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Item
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "itemName": "Blue Backpack",
    "description": "A blue backpack lost near library",
    "type": "Lost",
    "location": "Library Building",
    "date": "2024-04-23",
    "category": "Accessories",
    "contactInfo": "john@example.com"
  }'
```

### Search Items
```bash
curl -X GET "http://localhost:5000/api/items/search/query?name=backpack&type=Lost&category=Accessories"
```

### Get All Items
```bash
curl -X GET http://localhost:5000/api/items
```

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:**
- Ensure MongoDB is running locally: `mongod`
- For MongoDB Atlas, check connection string in .env
- Verify MongoDB URI syntax

### Issue: CORS Error
**Solution:**
- Backend CORS is enabled for all origins
- Check that frontend URL matches REACT_APP_API_URL
- Restart both frontend and backend

### Issue: JWT Token Error
**Solution:**
- Clear localStorage and login again
- Ensure JWT_SECRET is set in backend .env
- Check token is being sent in Authorization header

### Issue: Items Not Appearing
**Solution:**
- Refresh the page
- Check browser console for errors
- Verify API is running on correct port
- Check MongoDB has items collection

### Issue: Can't Update/Delete Items
**Solution:**
- Ensure you're logged in as the item owner
- Check JWT token is still valid
- Verify Authorization header is sent

---

## 📈 Next Steps / Enhancements

Consider adding these features:

1. **Image Upload** - Allow users to upload photos of items
2. **Email Notifications** - Notify users when item matches found/lost
3. **Item Comments** - Add comment section for item discussions
4. **User Ratings** - Rate users based on interactions
5. **Map Integration** - Show item locations on Google Maps
6. **Admin Panel** - Dashboard for admins to manage items
7. **Email Verification** - Verify email during registration
8. **Two-Factor Authentication** - Additional security layer
9. **Item Categories Filter** - Advanced filtering options
10. **Archive System** - Archive resolved items

---

## 📦 Deployment Guide

### Deploy Backend to Render

1. **Create Render Account** - Visit https://render.com
2. **Connect GitHub** - Link your repository
3. **Create Web Service:**
   - Name: `lost-found-backend`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Set Environment Variables:**
   - MONGODB_URI
   - JWT_SECRET
   - JWT_EXPIRE
   - NODE_ENV=production
5. **Deploy** - Render will auto-deploy on push

### Deploy Frontend to Vercel

1. **Create Vercel Account** - Visit https://vercel.com
2. **Import Project** - Connect your GitHub repo
3. **Set Environment Variables:**
   - REACT_APP_API_URL=`https://your-render-backend-url/api`
4. **Deploy** - Vercel will auto-deploy on push

---

## 🔒 Security Best Practices

1. **Environment Variables** - Never commit .env files
2. **JWT Secret** - Use a strong random string (32+ characters)
3. **HTTPS** - Always use HTTPS in production
4. **CORS** - Restrict CORS to specific domains in production
5. **Rate Limiting** - Implement rate limiting for APIs
6. **Input Validation** - Validate all user inputs
7. **Password Strength** - Enforce strong password requirements
8. **Token Expiration** - Set reasonable token expiration times

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review error messages in console
3. Check MongoDB logs
4. Review API response status codes
5. Create an issue on GitHub

Happy coding! 🚀
