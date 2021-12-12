const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = Venue = mongoose.model("venue", VenueSchema);
