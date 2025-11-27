const express=require('express');
const {
    createTasks,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}=require('../controller/excavationTaskController')
const validateToken=require('../middleware/auth')
const router=express.Router();

router.post("/create",validateToken,createTasks);

router.get("/all/:projectId",validateToken,getAllTasks);

router.get("/get/:id",validateToken,getTaskById);

router.put("/update/:id",validateToken,updateTask);

router.delete('/delete/:id',validateToken,deleteTask);

module.exports=router;