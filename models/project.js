const mongoose=require("mongoose");

const projectSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the name of construction site"]
    },
    location:{
        type:String,
        required:[true,"Please enter the location"]
    },
    planFile:{
        type:String,
        required:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{timestamps:true}
)

module.exports=mongoose.model("Project",projectSchema);