# API Reference Guide - Lost & Found System

## 📌 Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## 🔐 Authentication Header
All protected endpoints require:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 👤 Authentication APIs

### Register User
**Endpoint:** `POST /auth/register`
**Authentication:** Not required
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
**Status Codes:** 201 (Created), 400 (Invalid), 500 (Error)

---

### Login User
**Endpoint:** `POST /auth/login`
**Authentication:** Not required
**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
**Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Error)

---

### Get Current User
**Endpoint:** `GET /auth/me`
**Authentication:** Required
**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
**Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Error)

---

### Update Password
**Endpoint:** `PUT /auth/update-password`
**Authentication:** Required
**Body:**
```json
{
  "oldPassword": "CurrentPassword123",
  "newPassword": "NewPassword456"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```
**Status Codes:** 200 (OK), 400 (Invalid), 401 (Unauthorized), 500 (Error)

---

## 📦 Item APIs

### Create Item
**Endpoint:** `POST /items`
**Authentication:** Required
**Body:**
```json
{
  "itemName": "Blue Backpack",
  "description": "A blue backpack with red straps, lost near library",
  "type": "Lost",
  "location": "Library Building",
  "date": "2024-04-23",
  "category": "Accessories",
  "contactInfo": "john@example.com"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Item created successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "itemName": "Blue Backpack",
    "description": "A blue backpack with red straps...",
    "type": "Lost",
    "location": "Library Building",
    "date": "2024-04-23T00:00:00.000Z",
    "category": "Accessories",
    "contactInfo": "john@example.com",
    "user": "507f1f77bcf86cd799439011",
    "status": "Open",
    "createdAt": "2024-04-23T10:30:00.000Z",
    "updatedAt": "2024-04-23T10:30:00.000Z"
  }
}
```
**Required Fields:** itemName, description, type, location, date, category, contactInfo
**Valid Categories:** Electronics, Documents, Accessories, Clothing, Books, Other
**Valid Types:** Lost, Found
**Status Codes:** 201 (Created), 400 (Invalid), 401 (Unauthorized), 500 (Error)

---

### Get All Items
**Endpoint:** `GET /items`
**Authentication:** Not required
**Query Parameters:** None
**Response:**
```json
{
  "success": true,
  "count": 15,
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "itemName": "Blue Backpack",
      "description": "A blue backpack with red straps...",
      "type": "Lost",
      "location": "Library Building",
      "date": "2024-04-23T00:00:00.000Z",
      "category": "Accessories",
      "contactInfo": "john@example.com",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "Open",
      "createdAt": "2024-04-23T10:30:00.000Z"
    }
    // ... more items
  ]
}
```
**Status Codes:** 200 (OK), 500 (Error)

---

### Get Item by ID
**Endpoint:** `GET /items/:id`
**Authentication:** Not required
**Parameters:** 
- `id` (ObjectId) - Item ID
**Response:**
```json
{
  "success": true,
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "itemName": "Blue Backpack",
    "description": "A blue backpack with red straps...",
    "type": "Lost",
    "location": "Library Building",
    "date": "2024-04-23T00:00:00.000Z",
    "category": "Accessories",
    "contactInfo": "john@example.com",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "Open",
    "createdAt": "2024-04-23T10:30:00.000Z"
  }
}
```
**Status Codes:** 200 (OK), 404 (Not Found), 500 (Error)

---

### Search Items
**Endpoint:** `GET /items/search/query`
**Authentication:** Not required
**Query Parameters:**
- `name` (optional) - Item name (case-insensitive, partial match)
- `category` (optional) - Category filter
- `type` (optional) - Lost or Found

**Examples:**
```
GET /items/search/query?name=backpack
GET /items/search/query?category=Electronics&type=Lost
GET /items/search/query?name=phone&category=Electronics
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "itemName": "Blue Backpack",
      // ... full item object
    }
    // ... more items matching query
  ]
}
```
**Status Codes:** 200 (OK), 500 (Error)

---

### Get User's Items
**Endpoint:** `GET /items/user/my-items`
**Authentication:** Required
**Response:**
```json
{
  "success": true,
  "count": 5,
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "itemName": "Blue Backpack",
      // ... full item object
    }
    // ... more user's items
  ]
}
```
**Status Codes:** 200 (OK), 401 (Unauthorized), 500 (Error)

---

### Update Item
**Endpoint:** `PUT /items/:id`
**Authentication:** Required (must be item owner)
**Parameters:** 
- `id` (ObjectId) - Item ID
**Body:** (All fields optional, but at least one required)
```json
{
  "itemName": "Updated Backpack",
  "description": "Updated description",
  "type": "Lost",
  "location": "Updated Location",
  "date": "2024-04-24",
  "category": "Accessories",
  "contactInfo": "newemail@example.com",
  "status": "Resolved"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Item updated successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "itemName": "Updated Backpack",
    // ... updated item object
  }
}
```
**Status Codes:** 200 (OK), 403 (Forbidden), 404 (Not Found), 500 (Error)

---

### Delete Item
**Endpoint:** `DELETE /items/:id`
**Authentication:** Required (must be item owner)
**Parameters:** 
- `id` (ObjectId) - Item ID
**Response:**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```
**Status Codes:** 200 (OK), 403 (Forbidden), 404 (Not Found), 500 (Error)

---

## ⚠️ Error Responses

### Common Error Formats

**Bad Request (400):**
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

**Unauthorized (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Forbidden (403):**
```json
{
  "success": false,
  "message": "Not authorized to update this item"
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Item not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

---

## 🎯 Category Values

Valid categories for items:
- `Electronics` - Phones, laptops, etc.
- `Documents` - ID cards, certificates, etc.
- `Accessories` - Keys, bags, jewelry, etc.
- `Clothing` - Shirts, jackets, etc.
- `Books` - Textbooks, notebooks, etc.
- `Other` - Anything else

---

## 🏷️ Item Types

Valid types:
- `Lost` - Item reported as lost
- `Found` - Item reported as found

---

## ✅ Item Status

Valid statuses:
- `Open` - Item is still being searched
- `Resolved` - Item has been found/recovered

---

## 🔄 Workflow Examples

### Complete Lost Item Reporting Flow

1. **Register/Login**
   ```bash
   POST /auth/login
   # Get JWT token
   ```

2. **Create Lost Item**
   ```bash
   POST /items
   Authorization: Bearer <TOKEN>
   {
     "itemName": "Blue Notebook",
     "description": "Notebook with class notes",
     "type": "Lost",
     "location": "Library",
     "date": "2024-04-23",
     "category": "Books",
     "contactInfo": "user@example.com"
   }
   ```

3. **View Posted Item**
   ```bash
   GET /items/user/my-items
   Authorization: Bearer <TOKEN>
   ```

4. **Search for Similar Items**
   ```bash
   GET /items/search/query?category=Books&type=Found
   ```

5. **Update Item Status**
   ```bash
   PUT /items/:id
   Authorization: Bearer <TOKEN>
   {
     "status": "Resolved"
   }
   ```

---

## 📊 Data Types

- `String` - Text values
- `ObjectId` - MongoDB unique identifier
- `Date` - ISO 8601 format (YYYY-MM-DD)
- `Enum` - Specific allowed values
- `Boolean` - true/false

---

## 🧪 Testing Commands (cURL)

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Create Item
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "itemName":"Phone",
    "description":"Lost iPhone",
    "type":"Lost",
    "location":"Campus",
    "date":"2024-04-23",
    "category":"Electronics",
    "contactInfo":"john@example.com"
  }'
```

### Get All Items
```bash
curl -X GET http://localhost:5000/api/items
```

### Search Items
```bash
curl -X GET "http://localhost:5000/api/items/search/query?name=phone&type=Lost"
```

---

## 📝 Rate Limiting

Currently, no rate limiting is implemented. Consider adding:
- 100 requests per 15 minutes per IP
- 10 item creations per day per user

---

## 🔗 Pagination (Future)

Current implementation returns all results. Consider adding:
- `?page=1&limit=10` query parameters
- Offset/limit pagination

---

## 📚 Related Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [README](./README.md) - Project overview
- [Feature Comparison](./FEATURE_COMPARISON.md) - Before/After comparison
