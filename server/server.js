import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();

await connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running`);
});
