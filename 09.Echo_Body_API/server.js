const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// POST endpoint
app.post("/echo", (req, res) => {
    const data = req.body;

    // Check if body is missing or empty
    if (
        data === undefined ||
        data === null ||
        (typeof data === "object" &&
            !Array.isArray(data) &&
            Object.keys(data).length === 0)
    ) {
        return res.status(400).json({
            success: false,
            message: "Request body is required"
        });
    }

    // Return the received data
    return res.status(200).json({
        success: true,
        message: "Data received successfully",
        data: data
    });
});

// Handle malformed JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format"
        });
    }

    next(err);
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
