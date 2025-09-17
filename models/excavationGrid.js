const mongoose=require("mongoose");

const excavationSchema=mongoose.Schema({
    projectId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Project",
        required:true
    },
    cellId:{
        type:String,
        required:true
    },
    coordinates:{
        type:[[Number]],
        required:true
    },
    plannedDepth:{
        type:Number,
        required:true
    },
    currentDepth:{
        type:Number,
    },
    status:{
        type:String,
        enum:["Not Started","In Progress","Completed"],
        default:"Not Started"
    }
},
{
    timestamps:true,
})

module.exports=mongoose.model("ExcavationGrid",excavationSchema);