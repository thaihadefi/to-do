# To-Do - Minimalist Task Management Platform

[![JavaScript](https://img.shields.io/badge/Language-JavaScript%20ES6+-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Express](https://img.shields.io/badge/Backend-Express%205-339933?style=flat-square&logo=express)](https://expressjs.com/)
[![Pug](https://img.shields.io/badge/Template-Pug-A86454?style=flat-square&logo=pug)](https://pugjs.org/)
[![CSS3](https://img.shields.io/badge/Styling-CSS3-1572B6?style=flat-square&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

To-Do is a minimalist task management web platform built with Node.js, Express 5, Pug, CSS3, and MongoDB via Mongoose. Designed with a clean 3-tier layered architecture (Routes → Controllers → Services → Models), the application delivers a seamless user experience featuring server-side rendered views, asynchronous form submissions with Fetch API, and real-time toast feedback notifications.

---

## Key Features

### Task Management & Workflow
- **Task Creation & Ownership:** Create assignments with designated assignee attribution and customizable task titles (`controllers/task.controller.js`, `views/task-form.pug`).
- **Completion & Lifecycle Transitions:** Mark task completion with immediate visual updates and strike-through indicators (`services/task.service.js`, `public/js/app.js`, `public/css/style.css`).
- **Task Deletion & Clean-up:** Remove obsolete tasks with real-time DOM sliding transitions and state cleanup (`views/index.pug`, `public/js/app.js`).

### Client Interface & User Experience
- **Interactive Form Handling & Fetch API:** Asynchronous client-side submissions (`public/js/app.js`); task completion and deletion update the DOM in place with slide transitions, while task creation redirects after a success toast.
- **Dynamic Toast Feedback System:** User feedback alert system (`public/js/notify.js`) delivering toast notifications with CSS keyframe slide-in/slide-out animations for task operations.
- **Styling & Visual Design:** Modern UI designed with pure Vanilla CSS3 (`public/css/style.css`), featuring a two-tone gradient background, an elevated card container, interactive button hover/transition states, and a fluid max-width Flexbox layout.

### Backend & Persistence
- **Controller & Service Architecture:** Thin controllers handling HTTP requests and delegating business logic to a dedicated service layer with standardized JSON responses (`code: "success"`) for client operations (`controllers/task.controller.js`, `services/task.service.js`).
- **Database Persistence & Queries:** Persistence powered by MongoDB via Mongoose with a typed schema; the service layer returns tasks sorted newest-first (`config/database.config.js`, `models/task.model.js`, `services/task.service.js`).

---

## Technology Stack

- **Frontend:** Server-Side Rendering with Pug Templates, Vanilla CSS3 (Flexbox layout, gradient background, transitions), Client-Side ES6+ JavaScript (Fetch API, DOM Events, custom Toast module with keyframe animations).
- **Backend:** Node.js, Express 5, CORS, gzip response compression (`compression`), Dotenv.
- **Database & Storage:** MongoDB (Mongoose ODM with schema validation; Atlas or local instance).
- **Infrastructure & Design Patterns:** 3-Tier Layered Architecture (Routes → Controllers → Services → Models), Thin Controllers, Dedicated Service Layer (`services/task.service.js`), Centralized Route Aggregation (`routes/index.route.js`).

---

## Project Structure

```text
to-do/
├── config/                           # Application configurations
│   └── database.config.js            # MongoDB connection initialization via Mongoose
├── controllers/                      # HTTP request handlers (request parsing & response mapping)
│   └── task.controller.js            # Task controller delegating to task service layer
├── models/                           # Mongoose data models & schemas
│   └── task.model.js                 # Task schema definition & model export
├── public/                           # Static web assets served by Express
│   ├── css/                          # Application styling
│   │   └── style.css                 # Custom stylesheet (Flexbox layout, gradient, transitions)
│   └── js/                           # Client-side scripts
│       ├── app.js                    # Client-side form submissions & UI animations
│       └── notify.js                 # Toast notification system
├── routes/                           # Express routing definitions
│   ├── index.route.js                # Main route aggregator
│   └── task.route.js                 # Task web routes
├── services/                         # Core Business Logic & Database operations
│   └── task.service.js               # Task service (database queries & mutations)
├── views/                            # Server-rendered Pug templates
│   ├── 404.pug                       # Custom 404 Not Found page
│   ├── index.pug                     # Main task dashboard page
│   ├── layout.pug                    # Master template layout
│   └── task-form.pug                 # Create new task form page
├── .env                              # Environment variables (private, gitignored)
├── .env.example                      # Template for environment variables
├── .gitignore                        # Git ignore rules
├── app.js                            # Express app configuration, middleware stack & 404/error handling
├── index.js                          # Server entry point (Port 6969)
├── LICENSE                           # MIT License
├── package.json                      # Project dependencies & npm scripts
├── README.md                         # Project documentation
└── yarn.lock                         # Yarn dependency lockfile
```

---

## Getting Started

### Prerequisites
- Node.js (v20+)
- Yarn or npm
- MongoDB Atlas cluster or local MongoDB instance

### Quick Start

```bash
# Clone the repository
git clone https://github.com/thaihadefi/to-do.git
cd to-do

# Install dependencies
yarn install

# Configure Environment Variables
cp .env.example .env

# Run development server
yarn dev
```

Server will be running at: `http://localhost:6969`

---

## License

This project is licensed under the [MIT License](LICENSE).
