import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, X, CheckCircle2, Circle } from "lucide-react";
import "./App.css";
import { toast } from "sonner";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const openCreateModal = () => {
    setIsEditingTask(false);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setIsEditingTask(true);
    setEditId(task._id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", description: "", status: "Pending" });
    setIsEditingTask(false);
    setEditId(null);
  };

  const addNewTask = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`);
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      } else {
        console.log("Error fetching tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (!isEditingTask) {
      addNewTask();
    } else {
      updateTask();
    }
    closeModal();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div className="header">
            <div className="header-content">
              <div className="header-title">
                <h1>Task Manager</h1>
              </div>
              <button onClick={openCreateModal} className="add-task-btn">
                <Plus size={20} />
                Add Task
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="card">
              <div className="stat-value-box blue">
                <div className="stat-value">{tasks.length}</div>
              </div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="card">
              <div className="stat-value-box green">
                <div className="stat-value">
                  {tasks.filter((t) => t.status === "Completed").length}
                </div>
              </div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="card">
              <div className="stat-value-box orange">
                <div className="stat-value">
                  {tasks.filter((t) => t.status === "In Progress").length}
                </div>
              </div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>

          {tasks.length > 0 ? (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div key={task._id} className="task-card">
                  <div className="task-header">
                    <div
                      className={`status-badge ${task.status === "Completed" ? "completed" : task.status === "In Progress" ? "in-progress" : "pending"}`}
                    >
                      {task.status === "Completed" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Circle size={16} />
                      )}
                      {task.status}
                    </div>
                    <div className="task-actions">
                      <button
                        onClick={() => openEditModal(task)}
                        className="task-action-btn edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="task-action-btn delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">{task.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <Plus size={40} />
              </div>
              <h3 className="empty-title">No tasks yet</h3>
              <p className="empty-description">
                Create your first task to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {isEditingTask ? "Edit Task" : "Create New Task"}
              </h2>
              <button onClick={closeModal} className="modal-close-btn">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="form-input"
                  placeholder="Enter task title..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="form-textarea"
                  placeholder="Enter task description..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {isEditingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
