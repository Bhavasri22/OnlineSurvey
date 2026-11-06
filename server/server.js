
const express = require("express");
const cors = require("cors");
const dbConnection = require("./db");
const Feedback = require("./Survey");

const app = express();

app.use(cors());
app.use(express.json());

// Test backend
app.get("/", (req, res) => {
    res.send("Feedback Backend is Working!");
});

// Receive and save frontend data
app.post("/feedback", async (req, res) => {
    try {
        console.log("\n========== NEW FEEDBACK ==========");
        console.log("Name:", req.body.name);
        console.log("Reason:", req.body.reason);
        console.log("Opinion:", req.body.opinion);
        console.log("Learned:", req.body.learned);
        console.log("Suggestions:", req.body.suggestions);
        console.log("==================================");

        const feedback = new Feedback(req.body);
        const savedFeedback = await feedback.save();

        res.status(201).json({
            message: "Feedback saved successfully!",
            data: savedFeedback
        });
    } catch (error) {
        console.error("Error saving feedback:", error.message);

        res.status(400).json({
            message: error.message
        });
    }
});

// Show all saved feedback
app.get("/feedback", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({
            createdAt: -1
        });

        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Start backend after database connects
dbConnection
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(5000, () => {
            console.log("Backend running on http://localhost:5000");
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error.message);
    });
