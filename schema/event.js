import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    booked: {
      type: Number,
      required: true,
      default: 0
    },
    bookedArr: {
      type: Array
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      enum: ["open", "seated"],
      required: true,
      default: "open"
    },
    imageUrl: {
      type: String,
      default: "",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("events", eventSchema);

export default EventModel