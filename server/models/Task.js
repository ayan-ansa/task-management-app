import mongoose from "mongoose";

const taskModel = mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { strict: "throw" },
);

export default mongoose.model("Task", taskModel);
