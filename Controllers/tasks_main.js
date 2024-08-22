const Task_schema=require('../schema.js');

const getAllTasks = async (req, res) => {
    try{
        const tasks=await Task_schema.find({});
        res.status(200).json({tasks});
    }
    catch(err){
        res.status(500).json({msg:err});
    }
}

const getSingleTask=async (req,res)=>{
    try{
        const {id:taskID}=req.params;
        const gotTask=await Task_schema.findOne({_id:taskID});
        if(!gotTask){
            return res.status(404).json({msg:`No task with id: ${taskID}`});
        }
        res.status(200).json({ gotTask });
    }
    catch(err){
        res.status(500).json({msg:err});
    }

}

const postTasks = (req, res) => {
    Task_schema.create(req.body)
        .then(task => res.status(201).json({ task })) // Send the created task with a 201 status
        .catch(error => res.status(400).json({ error: error.message })); // Send error message with a 400 status
};


const patchTasks=async (req,res)=>{
    try{
        const {id:TaskID}=req.params;
        const updatetask=await Task_schema.findOneAndUpdate({_id:TaskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!updatetask){
            return res.status(404).json({msg:`No task with id: ${taskID}`});
        }
        return res.status(200).json(updatetask);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}

const deleteTasks=async (req,res)=>{
    try{
        const {id:TaskID}=req.params;
        const deletedTask=await Task_schema.findOneAndDelete({_id:TaskID});
        if(!deletedTask){
            return res.status(404).json({msg:`No task with id: ${taskID}`});
        }
        return res.status(200).json({deletedTask});
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}
module.exports = {getAllTasks,getSingleTask,postTasks,patchTasks,deleteTasks};