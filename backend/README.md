# Backend API Documentation

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `/users/register`  
**Method:** `POST`  


#### Request Body
```json
{
  "fullName": {
    "firstName": "string",   
    "lastName": "string"     
  },
  "email": "string",       
  "password": "string"      
}
```

#### Success Response
**Status Code:** `201 Created`

```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "_id": "65f1a2b3c4d5e6f7g8h9i0j",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses
**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Name must be at least 3 characters long",
      "path": "fullName.firstName"
    }
  ]
}
```

#### Common Error Cases
- Missing required fields
- Email already exists
- Invalid email format
- Password too short (< 5 characters)
- First name too short (< 3 characters)

#### Security Features
- Passwords are hashed using bcrypt
- JWT token expires in 1 day
- Emails are stored in lowercase
- Password field is excluded from queries

---

### Login User
Authenticate an existing user.

**Endpoint:** `/users/login`  
**Method:** `POST`  


#### Request Body
```json
{
  "email": "string",        
  "password": "string"      
}
```

#### Validation Rules
- `email`: Required, valid email format
- `password`: Required, minimum 5 characters

#### Success Response
**Status Code:** `200 OK`

```json
{
  "msg": "User login successful",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "_id": "65f1a2b3c4d5e6f7g8h9i0j",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses

**Status Code:** `401 Unauthorized`

```json
{
  "msg": "Invalid email or password"
}
```

### Change Password
Change the password for an existing user.

**Endpoint:** `/users/changePassword`  
**Method:** `PATCH`  

#### Request Body
```json
{
  "email": "string",         
  "oldPassword": "string",   
  "newPassword": "string"    
}
```

#### Validation Rules
- `email`: Required, valid email format
- `oldPassword`: Required, minimum 5 characters
- `newPassword`: Required, minimum 5 characters

#### Success Response
**Status Code:** `200 OK`

```json
{
  "success": true,
  "msg": "Password updated successfully"
}
```

#### Error Responses

**Status Code:** `401 Unauthorized`

```json
{
  "error": "User not found"
}
```

**Status Code:** `401 Unauthorized`

```json
{
  "error": "Incorrect old password"
}
```

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Error during changing password"
}
```

---

### Get User Profile
Retrieve the profile of the authenticated user.

**Endpoint:** `/users/profile`  
**Method:** `GET`  
**Authentication:** Required (Bearer token)

#### Success Response
**Status Code:** `200 OK`

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "socketId": null,
  "_id": "65f1a2b3c4d5e6f7g8h9i0j",
  "createdAt": "2024-03-15T12:00:00.000Z",
  "updatedAt": "2024-03-15T12:00:00.000Z"
}
```

#### Error Responses
**Status Code:** `401 Unauthorized`

```json
{
  "msg": "Authentication required"
}
```

---

### Logout User
Log out the authenticated user.

**Endpoint:** `/users/logout`  
**Method:** `GET`  
**Authentication:** Required (Bearer token)

#### Success Response
**Status Code:** `200 OK`

```json
{
  "msg": "User logged out"
}
```

#### Error Responses
**Status Code:** `401 Unauthorized`

```json
{
  "msg": "Authentication required"
}
```

## Notes:
- Ensure that the email provided is unique and not already registered.
- Passwords are hashed before being stored in the database.
- JWT token is generated with 1 day expiration.
- Emails are stored in lowercase.


## Captain Endpoints

### Register Captain
Create a new captain account.

**Endpoint:** `/captains/register`  
**Method:** `POST`  
**Content-Type:** `application/json`

#### Request Body
```json
{
  "fullName": {
    "firstName": "string",   // minimum 3 characters
    "lastName": "string"     // optional, minimum 3 characters
  },
  "email": "string",         // valid email format
  "password": "string",      // minimum 5 characters
  "vehicle": {
    "color": "string",       // minimum 3 characters
    "plate": "string",       // minimum 5 characters
    "capacity": "number",    // minimum 1
    "vehicleType": "string"  // one of ['car', 'bike', 'auto']
  }
}
```

#### Success Response
**Status Code:** `201 Created`

```json
{
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null,
    "status": "inactive",
    "_id": "65f1a2b3c4d5e6f7g8h9i0j",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses

**Status Code:** `401 Unauthorized`

```json
{
  "msg": "Captain with this email already exists"
}
```

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Error during creating captain"
}
```

## Notes:
- Ensure that the email provided is unique and not already registered.
- Passwords are hashed before being stored in the database.
- JWT token is generated with 1 day expiration.
- Emails are stored in lowercase.


### Login Captain
Authenticate an existing captain.

**Endpoint:** `/captains/login`  
**Method:** `POST`  
**Content-Type:** `application/json`

#### Request Body
```json
{
  "email": "string",         // valid email format
  "password": "string"       // minimum 5 characters
}
```

#### Validation Rules
- `email`: Required, valid email format
- `password`: Required, minimum 5 characters

#### Success Response
**Status Code:** `200 OK`

```json
{
  "msg": "Captain login successful",
  "captain": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null,
    "status": "inactive",
    "_id": "65f1a2b3c4d5e6f7g8h9i0j",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses


**Status Code:** `401 Unauthorized`

```json
{
  "msg": "Invalid email or password"
}
```

---

### Get Captain Profile
Retrieve the profile of the authenticated captain.

**Endpoint:** `/captains/profile`  
**Method:** `GET`  
**Authentication:** Required (Bearer token)

#### Success Response
**Status Code:** `200 OK`

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "socketId": null,
  "status": "inactive",
  "_id": "65f1a2b3c4d5e6f7g8h9i0j",
  "createdAt": "2024-03-15T12:00:00.000Z",
  "updatedAt": "2024-03-15T12:00:00.000Z"
}
```

#### Error Responses
**Status Code:** `401 Unauthorized`

```json
{
  "msg": "Authentication required"
}
```

---

### Logout Captain
Log out the authenticated captain.

**Endpoint:** `/captains/logout`  
**Method:** `GET`  
**Authentication:** Required (Bearer token)

#### Success Response
**Status Code:** `200 OK`

```json
{
  "msg": "Captain logged out"
}
```

#### Error Responses
**Status Code:** `401 Unauthorized`

```json
{
  "msg": "Authentication required"
}
```

## Notes:
- Ensure that the email provided is unique and not already registered.
- Passwords are hashed before being stored in the database.
- JWT token is generated with 1 day expiration.
- Emails are stored in lowercase.

## Maps Endpoints

### Get Coordinates
Retrieve the coordinates for a given address.

**Endpoint:** `/maps/get-coordinate`  
**Method:** `GET`  
**Authentication:** Required (Bearer token)

#### Query Parameters
- `address`: Required, string, minimum 3 characters

#### Success Response
**Status Code:** `200 OK`

```json
{
  "lat": 37.7749,
  "lng": -122.4194
}
```

#### Error Responses
**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Invalid address",
      "param": "address"
    }
  ]
}
```

**Status Code:** `404 Not Found`

```json
{
  "error": "Coordinate not found"
}
```

### Get Distance and Time
Retrieve the distance and time between two addresses.

**Endpoint:** `/maps/get-destance-time`  
**Method:** `GET`  
**Authentication:** Required (Bearer token)

#### Query Parameters
- `origin`: Required, string, minimum 3 characters
- `destination`: Required, string, minimum 3 characters

#### Success Response
**Status Code:** `200 OK`

```json
{
  "distance": "10 km",
  "time": "15 mins"
}
```

#### Error Responses
**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Invalid origin or destination",
      "param": "origin"
    }
  ]
}
```

**Status Code:** `404 Not Found`

```json
{
  "error": "Distance and time not found"
}
```

### Get Autocomplete Suggestions
Retrieve autocomplete suggestions for a given input.

**Endpoint:** `/maps/get-suggestions`  
**Method:** `GET`  
**Authentication:** Required (Bearer token)

#### Query Parameters
- `input`: Required, string, minimum 3 characters

#### Success Response
**Status Code:** `200 OK`

```json
[
  "San Francisco, CA, USA",
  "San Jose, CA, USA"
]
```

#### Error Responses
**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Invalid input",
      "param": "input"
    }
  ]
}
```

**Status Code:** `404 Not Found`

```json
{
  "error": "Suggestions not found"
}
```

## Ride Endpoints

### Create Ride
Create a new ride.

**Endpoint:** `/ride/create`  
**Method:** `POST`  
**Authentication:** Required (Bearer token)

#### Request Body
```json
{
  "pickup": "string",        // minimum 3 characters
  "destination": "string",   // minimum 3 characters
  "vehicleType": "string"    // one of ['auto', 'car', 'bike']
}
```

#### Validation Rules
- `pickup`: Required, minimum 3 characters
- `destination`: Required, minimum 3 characters
- `vehicleType`: Required, one of ['auto', 'car', 'bike']

#### Success Response
**Status Code:** `201 Created`

```json
{
  "message": "Ride created successfully",
  "ride": {
    "userId": "65f1a2b3c4d5e6f7g8h9i0j",
    "pickup": "123 Main St",
    "destination": "456 Elm St",
    "otp": "12345",
    "fare": 100,
    "_id": "75g2b3c4d5e6f7g8h9i0j1k",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z"
  }
}
```

#### Error Responses
**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup"
    }
  ]
}
```

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Internal server error"
}
```

## Notes:
- Ensure that the pickup and destination addresses are valid and have a minimum length of 3 characters.
- The vehicle type must be one of ['auto', 'car', 'bike'].

## API Endpoints

### /get-fare

**Method:** GET

**Description:** Calculates the fare for a ride based on the pickup and destination locations.

**Query Parameters:**
- `pickup` (string): The pickup location.
- `destination` (string): The destination location.

**Response:**
- `200 OK`: Returns the calculated fare for different vehicle types.
  ```json
  {
    "auto": number,
    "car": number,
    "bike": number
  }
  ```
 - 400 Bad Request: If the required parameters are missing
 ```json
 {
  "error": "Error calculating fare"
}
```
**Example Request**
- curl -X GET "http://localhost:3000/get-fare?pickup=LocationA&destination=LocationB"

   **Example Request**
 ```json
 {
   "auto": 150,
  "car": 250,
  "bike": 100
}
```

