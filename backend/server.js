const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Serve frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Load data
let projects = require("./data.json");

// READ (already working)
app.get("/projects", (req, res) => {
  res.json(projects);
});

// CREATE
app.post("/projects", (req, res) => {
  projects.push(req.body);
  fs.writeFileSync("./data.json", JSON.stringify(projects, null, 2));
  res.send("Project added");
});

// UPDATE
app.put("/projects/:id", (req, res) => {
  projects[req.params.id] = req.body;
  fs.writeFileSync("./data.json", JSON.stringify(projects, null, 2));
  res.send("Project updated");
});

// DELETE
app.delete("/projects/:id", (req, res) => {
  projects.splice(req.params.id, 1);
  fs.writeFileSync("./data.json", JSON.stringify(projects, null, 2));
  res.send("Project deleted");
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

