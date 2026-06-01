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

<img width="1895" height="824" alt="Screenshot 2026-06-01 130308" src="https://github.com/user-attachments/assets/dd7ea766-8738-4802-8ac8-69f6bb75358e" />
<img width="1892" height="862" alt="Screenshot 2026-06-01 130348" src="https://github.com/user-attachments/assets/22c57145-002e-4c44-8d87-e10705438811" />


---




