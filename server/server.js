
const express = require("express");
const cors = require("cors");
const dbConnection = require("./db");
const Feedback = require("./Survey");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Feedback Backend is Working!");
});

app.post("/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        const savedFeedback = await feedback.save();

        res.status(201).json({
            message: "Feedback saved successfully!",
            data: savedFeedback
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

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

const PORT = process.env.PORT || 5000;

dbConnection
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(PORT, () => {
            console.log(`Backend running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    });
