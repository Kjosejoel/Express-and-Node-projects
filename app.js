const express=require('express');
const app=express();
const tasks=require('./Routes/Tasks')
app.use(express.json())
app.use('/api/v1/tasks/',tasks);
app.get('/',(req,res)=>{
    res.send('<h1>Task Manager app</h1>');
})

port=3000;
app.listen(port,console.log(`Server is listening on port ${port}`));