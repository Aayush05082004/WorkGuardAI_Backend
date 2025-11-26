const mongoose=require("mongoose");
const { currentUser } = require("../controller/userController");

const excavationSchema=mongoose.Schema({
    projectId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"project",
        required:true
    },
    taskName:{
        type:String,
        required:[true,"Enter the task name"]
    },
    description:{
        type:String
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    plannedStartDate:{
        type:Date
    },
    plannedEndDate:{
        type:Date
    },
    actualEndDate:{
        type:Date
    },
    currentStatus:{
        type:String,
        enum:['Not Started','On hold',"Completed"],
        default:"Not Started"
    }
},
{
    timestamps:true,
})

module.exports=mongoose.model("ExcavationGrid",excavationSchema);