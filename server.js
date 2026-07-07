const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registrationRoutes = require("./routes/registrationRoutes");
const Event = require("./models/Event");

const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/events", eventRoutes);
app.use("/registrations", registrationRoutes);
app.use("/auth", authRoutes);

async function seedEvents() {
    try {
        const count = await Event.countDocuments();
        if (count > 0) return;

        const sampleEvents = [
            {
                title: "Summer Music Festival",
                date: new Date("2024-06-15T10:00:00"),
                endTime: "10:00 PM",
                location: "Mumbai, India",
                category: "Music",
                description: "Enjoy a day of amazing music and great vibes with top artists. This festival brings together the best musicians from around the world for an unforgettable experience of live performances, food stalls, and community celebration.",
                organizer: "MusicWorld Events",
                speakers: ["DJ Shadow - International DJ", "Prateek Kuhad - Indie Artist", "Nucleya - Electronic Music"],
                price: 1499,
                image: "images/music-festival.png"
            },
            {
                title: "Tech Conference 2024",
                date: new Date("2024-06-22T10:00:00"),
                endTime: "05:00 PM",
                location: "Bangalore, India",
                category: "Technology",
                description: "Tech Conference 2024 is the premier gathering of tech enthusiasts, professionals, and innovators. Gain insights, share knowledge, and build connections that can shape the future. This conference includes keynote speeches, panel discussions, and networking opportunities.",
                organizer: "TechWorld",
                speakers: ["John Doe - CEO, TechCorp", "Jane Smith - CTO, InnovaX", "Alex Johnson - AI Expert"],
                price: 999,
                image: "images/tech-conference.png"
            },
            {
                title: "Entrepreneur Workshop",
                date: new Date("2024-06-30T09:00:00"),
                endTime: "06:00 PM",
                location: "Pune, India",
                category: "Business",
                description: "Learn, network and grow your startup ideas with experts. This workshop covers business planning, fundraising strategies, and growth hacking techniques from successful entrepreneurs and venture capitalists.",
                organizer: "StartupHub India",
                speakers: ["Rahul Verma - Founder, GrowthX", "Sneha Patel - VC Partner, InvestIndia", "Amit Kumar - Serial Entrepreneur"],
                price: 799,
                image: "images/business-workshop.png"
            }
        ];

        await Event.insertMany(sampleEvents);
        console.log("Sample events seeded successfully");
    } catch (err) {
        console.error("Error seeding events:", err.message);
    }
}

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("MongoDB Connected");
    await seedEvents();
})
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});