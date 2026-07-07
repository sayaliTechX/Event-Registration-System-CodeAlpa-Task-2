const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { authenticateJWT } = require("../middleware/auth");

// Register for an event
router.post("/", async (req, res) => {
    try {
        const { userName, email, eventId } = req.body;
        
        // Validate input
        if (!userName || !email || !eventId) {
            return res.status(400).json({ error: "Missing required fields: userName, email, eventId" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        // Check for duplicate registration
        const existing = await Registration.findOne({ email, eventId });
        if (existing) return res.status(400).json({ error: "You are already registered for this event" });

        const registration = new Registration({ userName, email, eventId });
        await registration.save();
        await registration.populate("eventId");
        res.json(registration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register for an event as authenticated user
router.post("/me", authenticateJWT, async (req, res) => {
    try {
        const { id: userId, email: userEmail, name: userName } = req.user;
        const { eventId } = req.body;
        
        if (!eventId) return res.status(400).json({ error: "Missing eventId" });

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        const existing = await Registration.findOne({ userId, eventId });
        if (existing) return res.status(400).json({ error: "You are already registered for this event" });

        const registration = new Registration({ userId, userName, email: userEmail, eventId });
        await registration.save();
        await registration.populate("eventId");
        res.json(registration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View all registrations
router.get("/", async (req, res) => {
    try {
        const registrations = await Registration.find().populate("eventId userId");
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View registrations for a specific user (by email)
router.get("/user/:email", async (req, res) => {
    try {
        const registrations = await Registration.find({ email: req.params.email }).populate("eventId");
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single registration
router.get("/:id", async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id).populate("eventId");
        if (!registration) return res.status(404).json({ error: "Registration not found" });
        res.json(registration);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Cancel a registration
router.delete("/:id", async (req, res) => {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration Cancelled" });
});

module.exports = router;
