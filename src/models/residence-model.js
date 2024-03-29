import mongoose from "mongoose";

const residenceSchema = new mongoose.Schema(
  {
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
        require: true
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state:{
      type: String,
      required: true,
    },
    postalCode: {
        type: String,
        required: true,
    } 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Residence", residenceSchema);