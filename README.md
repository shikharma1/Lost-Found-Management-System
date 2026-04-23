# Lost & Found Item Management System - MERN Stack

A complete Lost & Found Item Management System built with MongoDB, Express, React, and Node.js. Students can register, login securely, report lost/found items, search for items, and manage their own postings.

## 🎯 Features

### Authentication
- ✅ User Registration with email validation
- ✅ Secure Login with JWT authentication
- ✅ Password hashing using bcrypt
- ✅ Protected routes (authentication required)
- ✅ Secure token storage in localStorage
- ✅ Logout functionality

### Lost & Found Management
- ✅ Report Lost Items
- ✅ Report Found Items
- ✅ View All Items
- ✅ Search items by name, category, or type
- ✅ View Item Details
- ✅ Update own items
- ✅ Delete own items
- ✅ Mark items as Open/Resolved
- ✅ Contact information for item posters

### User Interface
- ✅ Beautiful responsive design with Bootstrap
- ✅ Modern gradient UI with smooth animations
- ✅ Intuitive navigation
- ✅ Real-time form validation
- ✅ Success and error notifications
- ✅ Mobile-friendly layout

## 🏗️ Project Structure

```
student-auth-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Student.js (User model)
│   │   └── Item.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── itemController.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── items.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ProtectedRoute.js
    │   │   └── PublicRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   └── Dashboard.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   └── index.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 📦 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed with bcrypt),
  timestamps: true
}
```

### Item Model
```javascript
{
  itemName: String (required),
  description: String (required),
  type: String ('Lost' or 'Found'),
  location: String (required),
  date: Date (required),
  category: String (Electronics, Documents, Accessories, Clothing, Books, Other),
  contactInfo: String (required),
  user: ObjectId (reference to User),
  status: String ('Open' or 'Resolved'),
  image: String (optional),
  timestamps: true
}
```

## 🔌 API Endpoints

### Authentication APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/update-password` | Update password | Yes |

### Item APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/items` | Create new item | Yes |
| GET | `/api/items` | Get all items | No |
| GET | `/api/items/:id` | Get item by ID | No |
| GET | `/api/items/search/query` | Search items | No |
| GET | `/api/items/user/my-items` | Get user's items | Yes |
| PUT | `/api/items/:id` | Update item | Yes |
| DELETE | `/api/items/:id` | Delete item | Yes |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
MONGODB_URI=mongodb://localhost:27017/lost-found
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

4. **Start the backend server**
```bash
npm run dev
```
The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start the React application**
```bash
npm start
```
The application will run on `http://localhost:3000`

## 📝 Usage

### Register
1. Navigate to `/register`
2. Enter your name, email, and password
3. Click "Register" to create your account
4. You'll be automatically logged in and redirected to dashboard

### Login
1. Navigate to `/login`
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the dashboard

### Dashboard Features

#### Add Item
1. Click "Add Item" in the sidebar
2. Fill in the item details:
   - Item Name
   - Type (Lost/Found)
   - Description
   - Category
   - Location
   - Date
   - Contact Info
3. Click "Create Item"

#### View All Items
1. Click "All Items"
2. Browse through all reported items
3. Click on any item to see details and contact information

#### Search Items
1. Click "Search"
2. Enter search criteria:
   - Item Name (partial match supported)
   - Category
   - Type (Lost/Found)
3. Click "Search" to find matching items

#### My Items
1. Click "My Items"
2. View all items you've posted
3. Click "Edit" to update an item
4. Click "Delete" to remove an item

## 🔐 Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token-based authentication
- ✅ Protected routes with middleware
- ✅ Only item owners can update/delete their items
- ✅ Token stored securely in localStorage
- ✅ CORS enabled for safe cross-origin requests
- ✅ Email validation on registration

## 🎨 UI/UX Features

- Modern gradient color scheme (purple-blue)
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Loading states on buttons
- Alert notifications for success/errors
- Icon integration with Font Awesome
- Clean typography and spacing

## 📱 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap** - CSS framework
- **Font Awesome** - Icons
- **CSS3** - Styling and animations

## 🐛 Error Handling

The application includes comprehensive error handling:
- Invalid login credentials
- Duplicate email during registration
- Unauthorized access to protected routes
- Item not found errors
- Field validation errors
- Network error handling

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5",
  "express-validator": "^7.0.0"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "bootstrap": "^5.x"
}
```

## 🚢 Deployment

### Deploy Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Set environment variables in Render dashboard
5. Deploy

### Deploy Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

## 📚 API Testing

You can test the APIs using:
- Postman
- Insomnia
- Thunder Client
- cURL commands

Example cURL for login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## 🔄 Workflow

1. User registers with email and password
2. Password is hashed and stored in database
3. JWT token is generated and sent to frontend
4. Token is stored in localStorage
5. Token is sent with every API request in Authorization header
6. Middleware verifies token on protected routes
7. User can create, read, update, and delete items
8. Search is performed on backend using MongoDB regex

## 💡 Features Explained

### JWT Authentication Flow
- User logs in → Backend generates JWT → Frontend stores token → Token sent in headers → Backend verifies → Access granted

### Item CRUD Operations
- **Create**: Users can post lost/found items
- **Read**: All users can view items, including detailed information
- **Update**: Only item owners can update their items
- **Delete**: Only item owners can delete their items

### Search Functionality
- Search by item name (case-insensitive, partial matching)
- Filter by category
- Filter by type (Lost/Found)
- Combine multiple filters

## ❓ FAQ

**Q: Can anyone see all items?**
A: Yes, the "All Items" section is public. Only authentication is required to post items.

**Q: Can I edit someone else's item?**
A: No, only the owner of an item can edit or delete it.

**Q: What information is visible to other users?**
A: Item details, location, date, category, and poster's contact information.

**Q: How long are tokens valid?**
A: Tokens are valid for 7 days (configurable in .env).

## 📧 Contact Information

For issues or questions, please create an issue in the GitHub repository.

## 📄 License

This project is open source and available under the MIT License.
    │   │   ├── Auth.css
    │   │   └── Dashboard.css
    │   ├── App.js
    │   ├── index.js
    │   ├── App.css
    │   └── index.css
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure `.env` with your MongoDB URI and JWT secret:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-auth
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

**POST** `/api/auth/register`
- Register a new student
- Body: `{ name, email, password, course }`
- Returns: JWT token and student data

**POST** `/api/auth/login`
- Login student
- Body: `{ email, password }`
- Returns: JWT token and student data

**GET** `/api/auth/me`
- Get current logged-in student
- Headers: `Authorization: Bearer <token>`
- Returns: Student data

**PUT** `/api/auth/update-password`
- Update student password
- Headers: `Authorization: Bearer <token>`
- Body: `{ oldPassword, newPassword }`
- Returns: Success message

**PUT** `/api/auth/update-course`
- Update student course
- Headers: `Authorization: Bearer <token>`
- Body: `{ course }`
- Returns: Updated student data

## Available Courses

- CS - Computer Science
- IT - Information Technology
- ECE - Electronics & Communication
- ME - Mechanical Engineering
- CE - Civil Engineering
- EE - Electrical Engineering

## Technology Stack

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **Context API** - State management

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-auth
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

## Deployment

### Deploy Backend on Render

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: Your JWT secret (use a strong random string)
   - `NODE_ENV`: production
6. Set build command: `npm install`
7. Set start command: `npm start`
8. Deploy

### Deploy Frontend on Vercel

1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set environment variables:
   - `REACT_APP_API_URL`: Your Render backend URL
6. Deploy

## Usage

1. **Register**: Create a new account with your name, email, password, and course
2. **Login**: Use your email and password to login
3. **Dashboard**: View your profile after login
4. **Update Password**: Change your password securely
5. **Change Course**: Update your course selection
6. **Logout**: Securely logout and return to login page

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ Protected routes requiring authentication
- ✅ Secure token storage
- ✅ Email uniqueness validation
- ✅ Password comparison verification
- ✅ CORS protection

## Error Handling

The application handles various error scenarios:
- Invalid login credentials
- Duplicate email registration
- Unauthorized access attempts
- Missing required fields
- Invalid token/session
- MongoDB connection errors

## Testing

### Test Registration
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "course": "CS"
}
```

### Test Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

This project is open source and available under the MIT License.

## Support

For support, email support@example.com or open an issue in the repository.
