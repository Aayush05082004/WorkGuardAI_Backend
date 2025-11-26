const asyncHandler = require("express-async-handler");
const Project = require("../models/project");

// @Desc Create a new project
// @Route POST /api/project/create
// @Access Private (needs auth)
const createProject = asyncHandler(async (req, res) => {
    const { name, location, planFile, status, budget, remainders } = req.body;

    if (!name || !location) {
        res.status(400);
        throw new Error("Name and location are required");
    }

    const project = await Project.create({
        name,
        location,
        planFile,
        status,
        budget,
        remainders,
        createdBy: req.user.id
    });

    if (!project) {
        res.status(400);
        throw new Error("Invalid project data");
    }

    res.status(201).json({
        success: true,
        project
    });
});

// @Desc Get all projects of a user
// @Route GET /api/project/all
// @Access Private
const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ createdBy: req.user.id });

    res.status(200).json({
        success: true,
        projects
    });
});

// @Desc Get single project by ID
// @Route GET /api/project/:id
// @Access Private
const getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    res.status(200).json({
        success: true,
        project
    });
});

// @Desc Update a project
// @Route PUT /api/project/:id
// @Access Private
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    const updated = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({
        success: true,
        project: updated
    });
});

// @Desc Delete a project
// @Route DELETE /api/project/:id
// @Access Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Project deleted successfully"
    });
});

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
