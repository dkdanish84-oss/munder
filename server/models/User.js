import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      enum: ["email", "google", "mobile"],
      default: "mobile",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);


