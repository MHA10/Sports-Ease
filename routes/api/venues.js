const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Venue = require("../../models/Venue");

// @route   GET api/venues
// @desc    Get all the venues
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const venues = await Venue.find().sort({ date: -1 });
    res.json(venues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/venues/:id
// @desc    Get venue by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({ msg: "Venue not found" });
    }

    res.json(venue);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Venue not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/venues
// @desc    Register venue
// @access  Private
router.post(
  "/",
  auth,
  [
    check("name", "Name is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
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

    const { name, address } = req.body;

    try {
      // See if venue exists
      let venue = await Venue.findOne({ address });

      if (venue) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Venue already exists" }] });
      }

      // Get venue gravatar
      const avatar = gravatar.url(address, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      venue = new Venue({
        name,
        address,
        avatar,
      });
      await venue.save();
      res.json({ msg: "Venue added" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/venues/:id
// @desc    Update a venue
// @access  Public
router.post("/:id", auth, async (req, res) => {
  // Non-admin user should not be able to register a venue
  if (!req.user.isAdmin) {
    return res.status(401).send("Unauthorized, must be an Admin!");
  }
  const { name, address } = req.body;

  // Build venue object
  const venueFields = {};
  if (name) venueFields.name = name;
  if (address) venueFields.address = address;

  try {
    // See if venue already exists with same address
    let venue = await Venue.findOne({ address });
    if (venue) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Venue already exists with same address" }] });
    }

    // See if venue exists
    venue = await Venue.findOne({ _id: req.params.id });
    if (venue) {
      // Update
      venue = await Venue.findOneAndUpdate(
        { _id: req.params.id },
        { $set: venueFields },
        { new: true }
      );
      return res.json(venue);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   Delete api/venues/:id
// @desc    Get the venue
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ msg: "Venue not found" });
    }
    await venue.remove();
    res.json({ msg: "Venue removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Venue not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
