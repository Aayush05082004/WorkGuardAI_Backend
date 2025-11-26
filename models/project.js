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
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:['active','on hold','completed'],
        default:'active'
    },
    budget:{
        type:Number
    },
    remainders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Remainders"
    }
},
{timestamps:true}
)

module.exports=mongoose.model("Project",projectSchema);