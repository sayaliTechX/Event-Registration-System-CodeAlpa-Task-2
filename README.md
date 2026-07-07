# Event Registration System

A simple Node.js + Express web application to create and manage events and handle user registrations. It includes JWT-based authentication, role-based admin functions, image uploads for events, and a minimal frontend in `public/`.

**Quick links**
- **Server:** [server.js](server.js)
- **API routes:** [routes/](routes/)
- **Models:** [models/](models/)
- **Frontend:** [public/](public/)
- **Env example:** [.env.example](.env.example)

**Features**
- User signup/login with JWT (`/auth`)
- Role-based admin operations (create/delete events)
- Event listing and event details
- Event registration (authenticated or guest)
- Image upload for events (via `multer`)
- Seeded sample events on first DB connect

**Tech stack**
- Node.js + Express
- MongoDB via Mongoose
- JWT for authentication
- `multer` for file uploads
- Vanilla HTML/CSS/JS frontend in `public/`

**Requirements**
- Node.js 18+ (or compatible)
- A running MongoDB instance (Atlas or local)

**Install & run**
1. Install dependencies:
```bash
npm install
```
2. Create a `.env` (copy from [.env.example](.env.example)) and set values:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```
3. Start the server:
```bash
npm run dev   # uses nodemon (dev)
# or
npm start
```
4. Open the frontend at `http://localhost:5000` (or the port in your `.env`).

**Seed data**
On first successful MongoDB connection the app inserts three sample events (see `server.js` -> `seedEvents`).

**API reference (overview)**
Base URL: `http://localhost:<PORT>`

- Auth
  - `POST /auth/signup` — body: `{ name, email, password }` → returns `{ token, user }`
  - `POST /auth/login` — body: `{ email, password }` → returns `{ token, user }`
  - `GET /auth/me` — header: `Authorization: Bearer <token>` → returns current user

- Events
  - `GET /events` — list all events
  - `GET /events/:id` — event details (includes registration count)
  - `POST /events` — (admin only) create event; multipart/form-data with fields: `title`, `date`, `location`, `description` (optional), `category` (optional), and file field `image`
  - `DELETE /events/:id` — (admin only) delete event (also removes related registrations)

- Registrations
  - `POST /registrations` — body: `{ userName, email, eventId }` — create registration as guest
  - `POST /registrations/me` — header: `Authorization: Bearer <token>` and body `{ eventId }` — create registration for logged-in user
  - `GET /registrations` — list all registrations
  - `GET /registrations/user/:email` — registrations filtered by user email
  - `GET /registrations/:id` — get single registration
  - `DELETE /registrations/:id` — cancel registration

**Authentication & Authorization**
- Uses JWT stored client-side. Obtain a token from `/auth/login` or `/auth/signup`.
- Protected routes use `authenticateJWT` middleware (`middleware/auth.js`).
- Admin-only actions use `requireAdmin` (user `role` must be `admin`).

**File uploads**
- Event images are saved to `public/images` using `multer` in [routes/eventRoutes.js](routes/eventRoutes.js).
- Upload field name: `image` (multipart/form-data).

**Frontend**
- Minimal static pages live in `public/`:
  - `index.html` — landing / events list
  - `event-detail.html` — event detail page
  - `admin.html` — admin dashboard (create/delete events)
  - `login.html`, `register.html`, `dashboard.html`, etc.

**Development notes**
- Main code entry is [server.js](server.js). The app serves static files from `public/` and exposes JSON APIs under `/events`, `/registrations`, and `/auth`.
- Environment variables are read via `dotenv` (see [.env.example](.env.example)).

**Testing**
- There are no automated tests included. Use tools like Postman / curl to exercise the API.

**Contributing**
- Fork the repo, create a feature branch, make changes, and open a pull request.
- Suggested improvements: add tests, input validation improvements, pagination for events, more robust role management, and CI.

**License**
- Add a `LICENSE` file or specify a license in `package.json` if you want to open-source this project.

---

Postman examples

Quick Postman setup:
- Create an environment variable `baseUrl` with value `http://localhost:5000` (or your port).
- Create a variable `token` to store the JWT returned by login.

1) Signup (create user)
- Method: POST
- URL: `{{baseUrl}}/auth/signup`
- Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

2) Login (get token)
- Method: POST
- URL: `{{baseUrl}}/auth/login`
- Body (raw JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
- Save the returned `token` value into your Postman `token` variable.

3) Get all events
- Method: GET
- URL: `{{baseUrl}}/events`

4) Create event (admin only, multipart/form-data)
- Method: POST
- URL: `{{baseUrl}}/events`
- Headers: `Authorization: Bearer {{token}}`
- Body: form-data
  - `title` (text)
  - `date` (text, e.g. `2024-08-01T10:00:00`)
  - `location` (text)
  - `category` (text, optional)
  - `description` (text, optional)
  - `image` (file)

5) Register for an event (guest)
- Method: POST
- URL: `{{baseUrl}}/registrations`
- Body (raw JSON):
```json
{
  "userName": "John Doe",
  "email": "john@example.com",
  "eventId": "<eventId_here>"
}
```

6) Register for an event (authenticated user)
- Method: POST
- URL: `{{baseUrl}}/registrations/me`
- Headers: `Authorization: Bearer {{token}}`
- Body (raw JSON):
```json
{
  "eventId": "<eventId_here>"
}
```

7) Delete event (admin)
- Method: DELETE
- URL: `{{baseUrl}}/events/<eventId>`
- Headers: `Authorization: Bearer {{token}}`

Tips
- Use the `token` environment variable to authorize requests: set `Authorization` header to `Bearer {{token}}`.
- For file uploads in Postman, choose `Body -> form-data` and set the `image` key type to `File`.

If you want, I can also export a ready-to-import Postman collection JSON for this API.
# Event Registration System

A full-stack event registration application built with Express.js, MongoDB, and modern frontend technologies. Users can browse events, register, manage their registrations, and admin users can create and manage events.

## Features

### User Features
- **User Authentication**
  - Sign up with email and password
  - Login with email and password
  - JWT-based authentication for secure sessions
  
- **Event Management**
  - Browse all available events
  - View event details including date and location
  - Register for events
  - View your registrations on dashboard
  - Cancel registrations
  
- **Dashboard**
  - View all your registrations
  - Browse available events
  - Manage your event registrations
  - User profile information

### Admin Features
- **Event Management** (Admin only)
  - Create new events
  - View all events with registration counts
  - Delete events (also removes related registrations)
  
- **Registration Management** (Admin only)
  - View all user registrations
  - Remove registrations
  - Monitor event attendance

## Tech Stack

- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Additional**: CORS, dotenv

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Event-Registration-System
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your MongoDB connection string and JWT secret:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/signup` - Register a new user
  - Body: `{ name, email, password }`
  - Returns: `{ token, user }`

- `POST /auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

- `GET /auth/me` - Get current user (requires auth)
  - Returns: User object

### Event Routes (`/events`)
- `GET /events` - Get all events
  - Returns: Array of events

- `POST /events` - Create new event (admin only, requires auth)
  - Body: `{ title, date, location, description }`
  - Returns: Created event

- `GET /events/:id` - Get event details with registration count
  - Returns: Event with registrations count

- `DELETE /events/:id` - Delete event (admin only, requires auth)
  - Returns: Success message

### Registration Routes (`/registrations`)
- `POST /registrations` - Register for event (guest)
  - Body: `{ userName, email, eventId }`
  - Returns: Registration object

- `POST /registrations/me` - Register for event (authenticated user, requires auth)
  - Body: `{ eventId }`
  - Returns: Registration object

- `GET /registrations` - Get all registrations
  - Returns: Array of all registrations

- `GET /registrations/user/:email` - Get registrations by user email
  - Returns: Array of user's registrations

- `GET /registrations/:id` - Get single registration
  - Returns: Registration object

- `DELETE /registrations/:id` - Cancel registration
  - Returns: Success message

## Frontend Pages

### Public Pages
- **`index.html`** - Home page with event list
- **`register.html`** - Guest registration for events
- **`login.html`** - User login page
- **`signup.html`** - User signup page

### Authenticated Pages
- **`dashboard.html`** - User dashboard with registrations
- **`admin.html`** - Admin panel for event management (admin only)

## Project Structure

```
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── Event.js             # Event model
│   ├── Registration.js      # Registration model
│   └── User.js              # User model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── eventRoutes.js       # Event management routes
│   └── registrationRoutes.js # Registration routes
├── public/
│   ├── index.html           # Home page
│   ├── register.html        # Registration page
│   ├── login.html           # Login page
│   ├── signup.html          # Signup page
│   ├── dashboard.html       # User dashboard
│   ├── admin.html           # Admin panel
│   ├── script.js            # Frontend scripts
│   └── style.css            # Styling
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
└── .env.example            # Example environment variables
```

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  role: String (enum: ["user", "admin"], default: "user"),
  timestamps: true
}
```

### Event Model
```javascript
{
  title: String (required),
  date: Date (required),
  location: String (required),
  description: String
}
```

### Registration Model
```javascript
{
  userName: String (required),
  email: String (required),
  userId: ObjectId (ref: "User"),
  eventId: ObjectId (ref: "Event", required),
  timestamps: true
}
```

## Usage Examples

### 1. User Sign Up
```javascript
POST http://localhost:5000/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. User Login
```javascript
POST http://localhost:5000/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Create Event (Admin)
```javascript
POST http://localhost:5000/events
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Tech Conference 2026",
  "date": "2026-12-15T10:00:00Z",
  "location": "Convention Center",
  "description": "Annual tech conference with industry experts"
}
```

### 4. Register for Event
```javascript
POST http://localhost:5000/registrations
Content-Type: application/json

{
  "userName": "Jane Smith",
  "email": "jane@example.com",
  "eventId": "507f1f77bcf86cd799439011"
}
```

## Security Features

1. **Password Hashing**: bcrypt is used to securely hash passwords
2. **JWT Authentication**: Secure token-based authentication
3. **Role-based Access Control**: Admin routes are protected
4. **Input Validation**: All user inputs are validated
5. **Email Validation**: Email format is validated

## Error Handling

The API provides comprehensive error messages:
- 400: Bad Request (missing or invalid fields)
- 401: Unauthorized (missing or invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource not found)
- 500: Internal Server Error

## Future Enhancements

1. Add event capacity limits and waitlist
2. Send confirmation emails to registrants
3. Add event categories and filtering
4. Implement event search functionality
5. Add rating and review system
6. Export registrations to CSV
7. Add calendar view for events
8. Implement recurring events
9. Add payment integration for paid events
10. Send event reminders via email

## License

ISC

## Author

Created as part of CodeAlpha Internship Event Registration System

## Support

For issues or questions, please create an issue in the repository.
