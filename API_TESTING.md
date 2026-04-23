# API Testing Guide

This guide shows how to test all APIs using curl or Postman.

## BASE URL
- **Local**: `http://localhost:5000/api`
- **Deployed**: `https://your-backend-url.onrender.com/api`

## 1. Register API

**Endpoint**: `POST /auth/register`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "course": "CS"
  }'
```

**Response** (200):
```json
{
  "success": true,
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": "123abc456def",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "CS"
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "Student with this email already exists"
}
```

---

## 2. Login API

**Endpoint**: `POST /auth/login`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": "123abc456def",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "CS"
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 3. Get Current User API

**Endpoint**: `GET /auth/me`

**Request**:
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Replace `YOUR_TOKEN_HERE` with the token received from login/register.

**Response** (200):
```json
{
  "success": true,
  "student": {
    "id": "123abc456def",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "CS"
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Token is not valid"
}
```

---

## 4. Update Password API

**Endpoint**: `PUT /auth/update-password`

**Request**:
```bash
curl -X PUT http://localhost:5000/api/auth/update-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "oldPassword": "password123",
    "newPassword": "newpassword456"
  }'
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

---

## 5. Update Course API

**Endpoint**: `PUT /auth/update-course`

**Request**:
```bash
curl -X PUT http://localhost:5000/api/auth/update-course \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "course": "IT"
  }'
```

**Valid Courses**: CS, IT, ECE, ME, CE, EE

**Response** (200):
```json
{
  "success": true,
  "message": "Course updated successfully",
  "student": {
    "id": "123abc456def",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "IT"
  }
}
```

---

## Using Postman

1. **Import Collection**: Import the exported Postman collection (if available)
2. **Set Variables**: 
   - Set `base_url` = `http://localhost:5000/api`
   - Set `token` = your JWT token from login
3. **Make Requests**: Use the pre-configured requests

### Postman Collection (Manual Setup)

1. Create a new collection: `Student Auth API`
2. Set collection variable: `base_url` = `http://localhost:5000/api`
3. Create the following requests:

**Request 1**: Register
- Method: POST
- URL: `{{base_url}}/auth/register`
- Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "course": "CS"
}
```

**Request 2**: Login
- Method: POST
- URL: `{{base_url}}/auth/login`
- Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Request 3**: Get Me
- Method: GET
- URL: `{{base_url}}/auth/me`
- Headers: `Authorization: Bearer {{token}}`

**Request 4**: Update Password
- Method: PUT
- URL: `{{base_url}}/auth/update-password`
- Headers: `Authorization: Bearer {{token}}`
- Body (JSON):
```json
{
  "oldPassword": "password123",
  "newPassword": "newpassword456"
}
```

**Request 5**: Update Course
- Method: PUT
- URL: `{{base_url}}/auth/update-course`
- Headers: `Authorization: Bearer {{token}}`
- Body (JSON):
```json
{
  "course": "IT"
}
```

---

## Testing with Thunder Client (VS Code)

If using VS Code, install Thunder Client extension:

1. Install Thunder Client from VS Code Extensions
2. Create a new request for each endpoint
3. Set headers and body as shown above
4. Test all functionality

---

## Error Codes Reference

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Please provide all required fields | Missing email, password, etc. |
| 400 | Student with this email already exists | Email already registered |
| 400 | Please provide email and password | Login fields missing |
| 401 | Invalid credentials | Wrong email or password |
| 401 | No token, authorization denied | Missing JWT token |
| 401 | Token is not valid | Invalid or expired token |
| 401 | Current password is incorrect | Wrong old password |
| 404 | Route not found | Wrong endpoint URL |
| 500 | Something went wrong | Server error |

---

## Tips

- Always include `Content-Type: application/json` header for POST/PUT requests
- Store the token from login response for subsequent requests
- Token expires based on `JWT_EXPIRE` setting (default: 7 days)
- When token expires, user needs to login again
- Use `Bearer <token>` format in Authorization header
- Test with different email addresses to ensure uniqueness validation
- Try invalid passwords to test security

---

**All APIs are now ready for testing!**
