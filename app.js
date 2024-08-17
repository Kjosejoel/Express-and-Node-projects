const express=require('express');
const app=express();
const tasks=require('./Routes/Tasks')
const connectDB=require('./db/connect');
require('dotenv').config();
app.use(express.json())
app.use('/api/v1/tasks/',tasks);
app.get('/',(req,res)=>{
    res.send('<h1>Task Manager app</h1>');
})
port=3000;

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.error("Error occurred while connecting to the database:", error);
    }
}
start()