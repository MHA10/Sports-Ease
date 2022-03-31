const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Booking = require("../../models/Booking");

// @route   GET api/bookings
// @desc    Get all the bookings
// @access  Private
router.get("/", async (req, res) => {
  // router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/bookings/:id
// @desc    Get booking by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/bookings
// @desc    Register a booking
// @access  Private
router.post(
  "/",
  auth,
  [
    check("user", "User is required").not().isEmpty(),
    check("venue", "Venue is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
  ],
  async (req, res) => {
    // Non-admin user should not be able to register a venue
    if (!req.user.isAdmin) {
      return res.status(401).send("Unauthorized, must be an Admin!");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, venue, date } = req.body;

    try {
      // See if booking already exists
      let booking = await Booking.findOne({ user, venue, date });

      if (booking) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Booking already exists" }] });
      }

      booking = new Booking({
        user,
        venue,
        date,
      });
      await booking.save();
      res.json({ msg: "Booking added" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   Delete api/bookings/:id
// @desc    Delet the booking
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  // Non-admin user should not be able to delete a venue
  if (!req.user.isAdmin) {
    return res.status(401).send("Unauthorized, must be an Admin!");
  }
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    await booking.remove();
    res.json({ msg: "Booking removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/bookings/:id
// @desc    Update a booking
// @access  Private
router.post("/:id", async (req, res) => {
  // Non-admin user should not be able to register a venue
  // if (!req.user.isAdmin) {
  //   return res.status(401).send("Unauthorized, must be an Admin!");
  // }
  const { user, venue, date } = req.body;

  // Build venue object
  const bookingFields = {};
  if (user) bookingFields.user = user;
  if (venue) bookingFields.venue = venue;
  if (date) bookingFields.date = date;

  try {
    // See if booking exists
    booking = await Booking.findOne({ _id: req.params.id });
    if (booking) {
      // Update date should not overlap any other booking
      sameDateBooking = await Booking.findOne({ venue: venue, date: date });
      if (sameDateBooking) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Booking for the ground already exists" }] });
      }
      // Update
      booking = await Booking.findOneAndUpdate(
        { _id: req.params.id },
        { $set: bookingFields },
        { new: true }
      );
      return res.json(booking);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
