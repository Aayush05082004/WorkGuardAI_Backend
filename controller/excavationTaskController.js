const asyncHandler=require('express-async-handler');
const tasks=require('../models/excavationGrid');
const Project=require('../models/project')

//Create Task-----> POST
const createTasks=asyncHandler(async(req,res)=>{
    const{projectId,taskName,description,assignedTo,plannedStartDate,plannedEndDate,actualEndDate,currentStatus,}=req.body;

    if(!projectId || !taskName || !currentStatus){
        res.status(400);
        throw new Error("Project ID, Task Name and Status are required");
    }

    const project=await Project.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    if (project.createdBy.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You cannot add tasks to another user's project");
    }

    const task=await tasks.create({
        projectId,
        taskName,
        description,
        assignedTo,
        plannedStartDate,
        plannedEndDate,
        actualEndDate,
        currentStatus
    })

    if(!task){
        res.status(401);
        throw new Error("Invalid Task Data");
    }
    res.status(201).json({
        success:true,
        task
    })
})

//get All Tasks------>GET 
const getAllTasks=asyncHandler(async(req,res)=>{
    const {projectId}=req.params;
    const getTasks=await tasks.find({projectId})
        .populate("assignedTo","username email")
        .populate("projectId","name location");

    res.status(200).json({
        success:true,
        getTasks
    })
})

//get Task by Id------>GET
const getTaskById=asyncHandler(async(req,res)=>{
    const taskById=await tasks.findById(req.params.id)
        .populate("assignedTo","username email")
        .populate("projectId","name location");

    if(!taskById){
        res.status(400);
        throw new Error("Task not found");
    }

    res.status(200).json({
        success:true,
        taskById
    })
})

//update Task by Id------>PUT
const updateTask=asyncHandler(async (req,res) => {
    const findTask=await tasks.findById(req.params.id);

    if(!findTask){
        res.status(400);
        throw new Error("Task not found");
    }

    const updatedTask=await tasks.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.status(200).json({
        success:true,
        task:updatedTask
    })
})


//delete Task------>DELETE
const deleteTask=asyncHandler(async (req,res) => {
    const taskToDelete=await tasks.findById(req.params.id);

    if(!taskToDelete){
        res.status(400);
        throw new Error("Task not found")
    }

    await tasks.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Task deleted successfully"
    })
})

module.exports={
    createTasks,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}