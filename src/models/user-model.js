import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    apartment: {
      type: String,
      required: true,
    },
    plans: {
      plan1: {
        _id: {
          type: Number,
          default: 1
        },
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
        }
      },
      plan2: {
        _id: {
          type: Number,
          default: 2
        },
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
        }
      },
      plan3: {
        _id: {
          type: Number,
          default: 3
        },
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
        }
      }
    },
    streak: {
      type: Number,
      default: 0
    },
    userType: {
      type: String,
      default: "user",
    },
    residence: {
      type: mongoose.Schema.Types.Number,
      ref: "Residence",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
