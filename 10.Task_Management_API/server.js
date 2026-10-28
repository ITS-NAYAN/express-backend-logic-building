
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initial tasks array
let tasks = [
    { id: 1, title: "Learn Express", completed: false },
    { id: 2, title: "Practice APIs", completed: true },
    { id: 3, title: "Build a project", completed: false }
];

// GET: Get all tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// POST: Create a new task
app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            message: "A valid task title is required"
        });
    }

    const newTask = {
        id: tasks.length
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1,
        title: title.trim(),
        completed: false
    };

    tasks.push(newTask);
    return res.status(201).json(newTask);
});

// GET: Get a single task
app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    return res.status(200).json(task);
});

// PUT: Update title and completion status
app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    if (
        typeof title !== "string" ||
        title.trim() === "" ||
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({
            message: "Valid title and boolean completed status are required"
        });
    }

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.title = title.trim();
    task.completed = completed;

    return res.status(200).json(task);
});

// PATCH: Update only the completion status
app.patch("/tasks/:id/complete", (req, res) => {
    const id = Number(req.params.id);
    const { completed } = req.body;

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed must be true or false"
        });
    }

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.completed = completed;

    return res.status(200).json(task);
});

// DELETE: Delete a task
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    return res.status(204).end();
});

// Handle malformed JSON
app.use((err, req, res, next) => {
    if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        "body" in err
    ) {
        return res.status(400).json({
            message: "Invalid JSON format"
        });
    }

    next(err);
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
