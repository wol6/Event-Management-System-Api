import mongoose from "mongoose";

const regEventSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    seatNos: {
      type: Array
    },
    headCount: {
      type: Number,
      required: true,
      default: 0
    },
    paymentStatus: {
      type: String,
      default:''
    },
    bookingStatus: {
      type: String,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    totalAmt:{
      type:Number
    }
  },
  {
    timestamps: true,
  }
);

regEventSchema.index({ event: 1, user: 1 }, { unique: true });

const RegEvent = mongoose.model("registrations", regEventSchema);

export default RegEvent;
