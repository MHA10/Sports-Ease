const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  venue: {
    type: Schema.Types.ObjectId,
    ref: "venue",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Booking = mongoose.model("booking", BookingSchema);
