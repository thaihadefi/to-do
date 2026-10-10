# To-Do

Minimalist task management web app built with Node.js, Express, Pug, CSS, and MongoDB.

---

## Features

- View all tasks with status (pending / completed)
- Create new tasks with title and assignee
- Mark tasks as completed
- Delete tasks with immediate UI updates
- Toast notifications for user feedback
- REST API endpoints for task resources

---

## Tech Stack

- **Backend:** Node.js, Express 5, CORS, compression, dotenv
- **Database:** MongoDB, Mongoose
- **Frontend:** Pug templates, Vanilla CSS, Vanilla JavaScript (Fetch API)

---

## Project Structure

```text
to-do/
├── config/
│   └── database.config.js
├── controllers/
│   └── task.controller.js
├── helpers/
│   └── http-response.helper.js
├── models/
│   └── task.model.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       └── notify.js
├── routes/
│   ├── index.route.js
│   └── task.route.js
├── services/
│   └── task.service.js
├── views/
│   ├── 404.pug
│   ├── index.pug
│   ├── layout.pug
│   └── task-form.pug
├── .env.example
├── app.js
├── index.js
├── LICENSE
├── package.json
├── README.md
└── yarn.lock
```

---

## API Endpoints

All JSON API endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get all tasks | `200 OK` |
| `GET` | `/api/tasks/:id` | Get task by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/tasks` | Create a task | `201 Created` / `400 Bad Request` |
| `PATCH` | `/api/tasks/:id` | Update a task (`title`, `user`, `isDone`) | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/tasks/:id` | Delete a task | `200 OK` / `404 Not Found` |

### Response Format

**Success:**
```json
{
  "code": "success",
  "message": "Task created successfully!",
  "data": { ... }
}
```

**Error:**
```json
{
  "code": "error",
  "message": "Title and user are required!"
}
```

---

## Getting Started

### Prerequisites

- Node.js (v20+)
- Yarn or npm
- MongoDB instance or MongoDB Atlas

### Installation

```bash
git clone https://github.com/thaihadefi/to-do.git
cd to-do

yarn install

cp .env.example .env

yarn dev
```

The application will run on `http://localhost:6969`.

---

## License

MIT
