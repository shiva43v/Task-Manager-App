import { useEffect, useState } from "react";
import API from "../services/api";

/* ── Stage config ─────────────────────────────────── */
const STAGES = ["Todo", "In Progress", "Done"];

const COLUMN_META = {
  "Todo":        { dot: "column-dot-todo",     col: "task-column-todo",     badge: "column-badge-todo",     icon: "📋", statIcon: "stat-icon-todo",     statVal: "stat-value-todo",     empty: "No tasks yet — create one below!" },
  "In Progress": { dot: "column-dot-progress", col: "task-column-progress", badge: "column-badge-progress", icon: "🔄", statIcon: "stat-icon-progress", statVal: "stat-value-progress", empty: "Nothing in progress yet." },
  "Done":        { dot: "column-dot-done",     col: "task-column-done",     badge: "column-badge-done",     icon: "✅", statIcon: "stat-icon-done",     statVal: "stat-value-done",     empty: "Complete some tasks to see them here!" },
};

/* ── Dashboard ─────────────────────────────────────── */
function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stage: "Todo",
  });

  const [loading, setLoading] = useState(false);

  const fetchTasks = () => {
    API.get("/tasks")
      .then(({ data }) => setTasks(data))
      .catch(console.error);
  };

  useEffect(() => { fetchTasks(); }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/tasks", formData);
      setFormData({ title: "", description: "", stage: "Todo" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStage = async (id, stage) => {
    try {
      await API.put(`/tasks/${id}`, { stage });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const grouped = {
    "Todo":        tasks.filter((t) => t.stage === "Todo"),
    "In Progress": tasks.filter((t) => t.stage === "In Progress"),
    "Done":        tasks.filter((t) => t.stage === "Done"),
  };

  return (
    <div className="dashboard">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">⚡</div>
          <span className="navbar-title">TaskFlow</span>
        </div>

        <div className="navbar-right">
          <div className="navbar-user">
            <div className="navbar-avatar">U</div>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>My Board</span>
          </div>
          <button id="logout-btn" onClick={logout} className="btn btn-logout">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="dashboard-content">

        {/* ── Stats ── */}
        <div className="stats-row">
          {STAGES.map((stage) => {
            const meta = COLUMN_META[stage];
            return (
              <div className="stat-card" key={stage}>
                <div className={`stat-icon ${meta.statIcon}`}>{meta.icon}</div>
                <div>
                  <div className="stat-label">{stage}</div>
                  <div className={`stat-value ${meta.statVal}`}>{grouped[stage].length}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Create Task ── */}
        <section className="create-task-section">
          <div className="section-header">
            <div className="section-icon">✨</div>
            <h2 className="section-title">Create New Task</h2>
          </div>

          <form id="create-task-form" onSubmit={createTask}>
            <div className="create-task-grid">
              <div className="form-group">
                <label className="form-label">Task title</label>
                <input
                  id="task-title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="What needs to be done?"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  id="task-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add details (optional)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Stage</label>
                <select
                  id="task-stage"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="form-select"
                >
                  {STAGES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <button
              id="create-task-btn"
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "auto", padding: "12px 28px" }}
            >
              {loading ? (
                <><span className="spinner"></span> Creating…</>
              ) : (
                <>+ Add Task</>
              )}
            </button>
          </form>
        </section>

        {/* ── Task Board ── */}
        <div className="task-board">
          {STAGES.map((stage) => (
            <TaskColumn
              key={stage}
              title={stage}
              tasks={grouped[stage]}
              meta={COLUMN_META[stage]}
              updateStage={updateStage}
              deleteTask={deleteTask}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Task Column ─────────────────────────────────── */
function TaskColumn({ title, tasks, meta, updateStage, deleteTask }) {
  return (
    <div className={`task-column ${meta.col}`}>
      <div className="column-header">
        <div className="column-title-group">
          <div className={`column-dot ${meta.dot}`} />
          <span className="column-title">{title}</span>
        </div>
        <span className={`column-badge ${meta.badge}`}>{tasks.length}</span>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">{meta.icon}</div>
            <span>{meta.empty}</span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              updateStage={updateStage}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ── Task Card ───────────────────────────────────── */
function TaskCard({ task, updateStage, deleteTask }) {
  return (
    <div className="task-card">
      <h3 className="task-card-title">{task.title}</h3>
      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}
      <div className="task-card-footer">
        <select
          value={task.stage}
          onChange={(e) => updateStage(task._id, e.target.value)}
          className="task-select"
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button
          onClick={() => deleteTask(task._id)}
          className="btn btn-danger"
          title="Delete task"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default Dashboard;