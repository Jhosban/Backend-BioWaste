import mongoose from "mongoose";

const residenceSchema = new mongoose.Schema(
  {
    _id: {
      type: Number
    },
    name: {
      type: String,
      required: true,
    },
    numberOfResidents: {
      type: Number,
      require: true,
    },
    emergencyNumber: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Residence", residenceSchema);
