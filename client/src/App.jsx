
import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://onlinesurvey-4tx1.onrender.com";

function App() {
    const [form, setForm] = useState({
        name: "",
        reason: "",
        opinion: "",
        learned: "",
        suggestions: ""
    });

    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `${API_URL}/feedback`,
                form
            );

            setMessage(response.data.message);

            setForm({
                name: "",
                reason: "",
                opinion: "",
                learned: "",
                suggestions: ""
            });
        } catch (error) {
            console.error("Feedback error:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to submit feedback. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h1>Feedback Form</h1>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="name">What is your name?</label>
                    <input id="name" name="name" placeholder="Enter your name"
                        value={form.name} onChange={handleChange} required />
                </div>

                <div className="field">
                    <label htmlFor="reason">Why are you attending this session?</label>
                    <textarea id="reason" name="reason" placeholder="Enter your reason"
                        value={form.reason} onChange={handleChange} required />
                </div>

                <div className="field">
                    <label htmlFor="opinion">What is your opinion about this session?</label>
                    <textarea id="opinion" name="opinion" placeholder="Share your opinion"
                        value={form.opinion} onChange={handleChange} required />
                </div>

                <div className="field">
                    <label htmlFor="learned">What did you learn from this session?</label>
                    <textarea id="learned" name="learned" placeholder="Tell us what you learned"
                        value={form.learned} onChange={handleChange} required />
                </div>

                <div className="field">
                    <label htmlFor="suggestions">Any other suggestions or feedback?</label>
                    <textarea id="suggestions" name="suggestions"
                        placeholder="Enter suggestions (optional)"
                        value={form.suggestions} onChange={handleChange} />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            {message && <p className="message" role="status">{message}</p>}

            <a href={`${API_URL}/feedback`} target="_blank" rel="noreferrer">
                View Feedback
            </a>
        </div>
    );
}

export default App;
