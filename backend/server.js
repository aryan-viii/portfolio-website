const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer config
const storage = multer.diskStorage({
  destination: "backend/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Load data
let projects = require("./data.json");

// READ
app.get("/projects", (req, res) => {
  res.json(projects);
});

// CREATE (WITH IMAGE)
app.post("/projects", upload.single("image"), (req, res) => {
  const newProject = {
    title: req.body.title,
    description: req.body.description,
    image: req.file ? `/uploads/${req.file.filename}` : ""
  };

  projects.push(newProject);
  fs.writeFileSync("./data.json", JSON.stringify(projects, null, 2));
  res.send("Project added with image");
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
