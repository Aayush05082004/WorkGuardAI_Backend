const express = require("express");
const { 
    createProject, 
    getAllProjects, 
    getProjectById, 
    updateProject, 
    deleteProject 
} = require("../controller/projectController");
const validateToken = require("../middleware/auth");
const router = express.Router();

// Create a project
router.post("/create", validateToken, createProject);

// Get all projects of logged-in user
router.get("/all", validateToken, getAllProjects);

// Get single project by ID
router.get("/:id", validateToken, getProjectById);

// Update project
router.put("/:id", validateToken, updateProject);

// Delete project
router.delete("/:id", validateToken, deleteProject);

module.exports = router;
