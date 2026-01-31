import express from "express";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createNewTask);

router.get("/", getAllTasks);

router.patch("/:taskId", updateTask);

router.delete("/:taskId", deleteTask);

export default router;
