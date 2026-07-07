# Event Registration System - Test Plan

## Testing Checklist

### Backend Testing

#### Authentication Routes
- [ ] POST `/auth/signup`
  - Test with valid data (name, email, password)
  - Test with missing fields
  - Test with invalid email format
  - Test with short password
  - Test with duplicate email
  - Expected: JWT token returned on success

- [ ] POST `/auth/login`
  - Test with valid credentials
  - Test with wrong password
  - Test with non-existent email
  - Test with missing fields
  - Expected: JWT token returned on success

- [ ] GET `/auth/me`
  - Test with valid token
  - Test without token
  - Test with invalid token
  - Expected: User data returned (without password)

#### Event Routes
- [ ] GET `/events`
  - Test without authentication
  - Expected: List of all events

- [ ] POST `/events`
  - Test as admin with valid data
  - Test as regular user (should fail)
  - Test without token (should fail)
  - Test with missing fields
  - Expected: Event created for admin, error for others

- [ ] GET `/events/:id`
  - Test with valid event ID
  - Test with invalid event ID
  - Expected: Event details with registration count

- [ ] DELETE `/events/:id`
  - Test as admin
  - Test as regular user (should fail)
  - Test with valid event ID
  - Expected: Event deleted for admin, related registrations removed

#### Registration Routes
- [ ] POST `/registrations`
  - Test guest registration with valid data
  - Test with missing fields
  - Test with invalid email
  - Test duplicate registration (should fail)
  - Expected: Registration created

- [ ] POST `/registrations/me`
  - Test authenticated registration
  - Test without token (should fail)
  - Test duplicate registration (should fail)
  - Expected: Registration created for authenticated user

- [ ] GET `/registrations`
  - Test without authentication
  - Expected: List of all registrations

- [ ] GET `/registrations/user/:email`
  - Test with valid email
  - Test with non-existent email
  - Expected: User's registrations

- [ ] DELETE `/registrations/:id`
  - Test with valid registration ID
  - Test with invalid registration ID
  - Expected: Registration cancelled

### Frontend Testing

#### Home Page (index.html)
- [ ] Load events from API
- [ ] Display events in card format
- [ ] Show Login/Sign Up links when not authenticated
- [ ] Show Dashboard link when authenticated
- [ ] Logout functionality works
- [ ] Error handling when API fails

#### Authentication Pages
- [ ] Signup page (signup.html)
  - Form validation
  - Password strength validation
  - Error messages display correctly
  - Success redirects to dashboard
  - Link to login page works

- [ ] Login page (login.html)
  - Form validation
  - Error messages display correctly
  - Success redirects to dashboard
  - Link to signup page works

#### Registration Page (register.html)
- [ ] Get event ID from URL parameter
- [ ] Error message if no event selected
- [ ] Form validation
- [ ] Show loading state
- [ ] Handle registration errors
- [ ] Show success message
- [ ] Redirect to home on success

#### User Dashboard (dashboard.html)
- [ ] Require authentication
- [ ] Show user name
- [ ] Display user's registrations
- [ ] Show available events to register for
- [ ] Cancel registration functionality
- [ ] Register for event from dashboard
- [ ] Logout functionality

#### Admin Panel (admin.html)
- [ ] Check user role is admin
- [ ] Create new event form
- [ ] Validate event form inputs
- [ ] Show all events
- [ ] Delete event functionality
- [ ] Show all registrations
- [ ] Remove registration functionality
- [ ] Logout functionality

### Data Validation Tests

- [ ] Email validation
  - Valid: user@example.com
  - Invalid: user@, @example.com, user.example.com

- [ ] Password validation
  - Minimum 6 characters

- [ ] Event data validation
  - Title required
  - Date required and valid format
  - Location required
  - Description optional

- [ ] Registration data validation
  - Username required
  - Email required and valid format
  - Event ID required and valid

### Error Handling Tests

- [ ] HTTP 400: Bad Request
- [ ] HTTP 401: Unauthorized
- [ ] HTTP 403: Forbidden (admin required)
- [ ] HTTP 404: Not Found
- [ ] HTTP 500: Server Error

### User Flow Tests

#### Flow 1: Guest Registration
1. Go to home page
2. See available events
3. Click register on an event
4. Fill in name and email
5. Submit registration
6. Verify success message
7. Redirected to home

#### Flow 2: User Authentication Flow
1. Go to home page
2. Click Sign Up
3. Create account with name, email, password
4. Get redirected to dashboard
5. View my registrations (empty initially)
6. Browse available events
7. Register for event
8. Check registration appears in "My Registrations"
9. Logout
10. Login with same credentials
11. Verify registration is still there
12. Cancel registration
13. Verify registration is removed

#### Flow 3: Admin Event Management
1. Create admin account (manually update role in DB or signup)
2. Go to home page
3. Click Admin panel (or navigate directly)
4. Create new event with all details
5. Verify event appears in events list
6. Verify event appears on home page
7. View all registrations
8. Delete an event
9. Verify event is removed
10. Verify related registrations are removed

### Performance Tests

- [ ] Load test with multiple events
- [ ] Response time for event list < 500ms
- [ ] Database queries are optimized (using indexes)
- [ ] Pagination for large registration lists (optional enhancement)

### Security Tests

- [ ] JWT tokens expire properly
- [ ] Invalid tokens are rejected
- [ ] Admin routes are protected
- [ ] Passwords are hashed (check DB)
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CORS is properly configured

### Browser Compatibility

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Responsive Design Tests

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Navigation works on all screen sizes
- [ ] Forms are readable on mobile

## Test Data

### Sample User
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

### Sample Admin User
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

### Sample Event
```json
{
  "title": "Tech Conference 2026",
  "date": "2026-12-15T10:00:00Z",
  "location": "Convention Center, New York",
  "description": "Annual technology conference with industry leaders and networking opportunities"
}
```

## Running Tests

### Start the server
```bash
npm run dev
```

### Test endpoints using curl or Postman

Example:
```bash
# Signup
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'

# Create event (requires admin token)
curl -X POST http://localhost:5000/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Event","date":"2026-12-15T10:00:00Z","location":"Place"}'
```

## Bugs Found and Fixed

### During Development
- [ ] Authentication not working
- [ ] MongoDB connection issues
- [ ] Frontend not loading events
- [ ] CORS errors
- [ ] Registration validation issues

## Sign-Off

- [ ] All tests passed
- [ ] No critical bugs remaining
- [ ] Code is production-ready
- [ ] Documentation is complete
- [ ] User stories are satisfied

Date: ________________
Tested By: ________________
