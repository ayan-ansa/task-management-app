import Task from "../models/Task.js";

const createNewTask = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    await Task.create({
      title,
      description,
      status,
    });

    return res
      .status(201)
      .json({ success: true, message: "Task added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      status,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTask= async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export { createNewTask, getAllTasks, updateTask, deleteTask };