
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    opinion: {
        type: String,
        required: true
    },
    learned: {
        type: String,
        required: true
    },
    suggestions: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Feedback", feedbackSchema);
