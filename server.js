const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const connectDb=require("./config/database");
const errorHandler = require("./middleware/errorhandler");
connectDb();

app.use(express.json());
app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/project", require("./routes/projectRoutes"))
app.use("/api/tasks",require("./routes/excavationTaskRoutes"))
app.use(errorHandler)

const port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Working on port no 8080`);
})
