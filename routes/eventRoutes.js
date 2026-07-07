const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const { authenticateJWT, requireAdmin } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, "event-" + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Get all events
router.get("/", async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// Add a new event (admin only)
router.post("/", authenticateJWT, requireAdmin, upload.single("image"), async (req, res) => {
    try {
        const { title, date, location, description, category } = req.body;
        
        // Validate required fields
        if (!title || !date || !location) {
            return res.status(400).json({ error: "Missing required fields: title, date, location" });
        }

        // Validate date
        const eventDate = new Date(date);
        if (isNaN(eventDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        let imagePath = null;
        if (req.file) {
            imagePath = "images/" + req.file.filename;
        }

        const event = new Event({
            title,
            date: eventDate,
            location,
            category: category || "Event",
            description: description || "",
            image: imagePath
        });
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//Add Event details
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });
        const registrationsCount = await Registration.countDocuments({ eventId: event._id });
        res.json({ ...event.toObject(), registrationsCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an event (admin)
router.delete("/:id", authenticateJWT, requireAdmin, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        // also remove related registrations
        await Registration.deleteMany({ eventId: req.params.id });
        res.json({ message: "Event deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
