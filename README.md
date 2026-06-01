# ⚡ TaskFlow — Task Manager App

A full-stack task management application with a modern dark glassmorphism UI. Organize your work across **Todo**, **In Progress**, and **Done** columns with a beautiful kanban-style board.

---

## 🚀 Getting Started


### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

---

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb
JWT_SECRET=your_super_secret_key_here
```

> 💡 Replace `MONGO_URI` with your MongoDB Atlas connection string if using the cloud.

Start the server:

```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

The API will be running at **http://localhost:5000**

---

### 3. Set Up the Frontend

Open a **new terminal** in the project root:

```bash
cd client
npm install
npm run dev
```

The app will be running at **http://localhost:5173**

---


**Register / Login body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "yourpassword"
}
```
---




