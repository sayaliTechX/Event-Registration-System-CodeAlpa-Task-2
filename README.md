# 🎉 EventHub – Event Registration System

A full-stack Event Registration System developed as part of the **CodeAlpha Web Development Internship (Task 2)**. The application enables users to browse events, register for them, manage their registrations, and provides an admin panel for organizers to create and manage events.

---

## ✨ Features

### 👤 User

- User Registration & Login
- Secure JWT Authentication
- Browse Available Events
- View Event Details
- Register for Events
- View Registered Events
- Cancel Event Registration
- Responsive Interface

### 👨‍💼 Admin

- Secure Admin Login
- Dashboard Overview
- Create Events
- Edit Events
- Delete Events
- View User Registrations
- Event Management

---

## 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcrypt.js

### API Testing

- Postman

---

# 📂 Project Structure

```text
Event-Registration-System/
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Event.js
│   ├── Registration.js
│   └── User.js
│
├── public/
│   ├── images/
│   ├── admin.html
│   ├── dashboard.html
│   ├── event-detail.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── signup.html
│   ├── script.js
│   └── style.css
│
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
│
├── .env.example
├── package.json
├── package-lock.json
├── server.js
├── README.md
├── REQUIREMENTS_COMPLETION.md
└── TEST_PLAN.md
```

---

## 🚀 Features Implemented

- JWT Authentication
- Password Hashing
- Role-Based Authentication (Admin/User)
- REST API
- CRUD Operations
- Event Management
- Registration Management
- MongoDB Integration
- Express Routing
- Responsive Frontend
- Modern Admin Dashboard

---

# 🔗 REST API

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register a User |
| POST | /auth/login | Login User |

---

## Events

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /events | Get All Events |
| GET | /events/:id | Get Event Details |
| POST | /events | Create Event |
| PUT | /events/:id | Update Event |
| DELETE | /events/:id | Delete Event |

---

## Registrations

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /registrations | View Registrations |
| POST | /registrations | Register for Event |
| DELETE | /registrations/:id | Cancel Registration |

---

# ⚙ Installation

Clone Repository

```bash
git clone https://github.com/sayaliTechX/Event-Registration-System-CodeAlpa-Task-2.git
```

Move into project

```bash
cd Event-Registration-System-CodeAlpa-Task-2
```

Install Dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

Run Server

```bash
node server.js
```

or

```bash
npm run dev
```

Open

```
http://localhost:5000
```

---

## 📸 Screenshots

Add screenshots of:

- Home Page
  
  <img width="1908" height="918" alt="image" src="https://github.com/user-attachments/assets/39355c45-08fa-4faf-aea3-99ee8cee59f7" />


- Login Page

  <img width="1903" height="905" alt="image" src="https://github.com/user-attachments/assets/cb55249e-2465-4008-a0be-723fae6b3117" />


- Register Page
  
<img width="1902" height="904" alt="image" src="https://github.com/user-attachments/assets/7bf18ebd-4acc-4c89-b015-92042f3ecc4e" />


- User Dashboard
  
  <img width="1911" height="897" alt="image" src="https://github.com/user-attachments/assets/468d4800-19f4-468e-86b5-fc6fa8863b25" />


- Event Details

<img width="1902" height="908" alt="image" src="https://github.com/user-attachments/assets/302fa5d3-c319-426f-94bd-49781343ba06" />


- Admin Dashboard

  <img width="1906" height="920" alt="image" src="https://github.com/user-attachments/assets/3e9ab7c1-6785-4af5-a3c7-9358f2626c6a" />
  

- Add Event

<img width="1869" height="900" alt="image" src="https://github.com/user-attachments/assets/9b18d1b3-d277-49f9-92b7-e4d4677a7a87" />

  
- Manage Events

  <img width="1526" height="907" alt="image" src="https://github.com/user-attachments/assets/b95d57e7-0f87-4a16-8ed1-d834f0c255d7" />


---

## 🎯 Learning Outcomes

During this project I gained practical experience with:

- Building REST APIs
- MongoDB CRUD Operations
- Express.js Routing
- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Access Control
- Frontend & Backend Integration
- API Testing using Postman
- Full-Stack Project Development

---

## 🚀 Future Enhancements

- Email Notifications
- QR Code Event Tickets
- Payment Gateway Integration
- Event Categories
- Search & Filters
- Calendar View
- Analytics Dashboard
- Dark / Light Theme
- Event Capacity Management

---

## 👩‍💻 Author

**Sayali Mangale**

🔗 GitHub

https://github.com/sayaliTechX/Event-Registration-System-CodeAlpa-Task-2

🔗 LinkedIn

https://www.linkedin.com/in/sayali-mangale-s1593/

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

Happy Coding! 🚀
