const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    endTime: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "Event"
    },
    description: {
        type: String
    },
    organizer: {
        type: String
    },
    speakers: [{
        type: String
    }],
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("Event", eventSchema);
