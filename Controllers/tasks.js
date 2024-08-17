const Task=require('../schema.js');

const getAllTasks = (req, res) => {
    return res.send('Sending data....');
}

const getSingleTask=(req,res)=>{
    return res.send('Sending single data');
}

const postTasks = (req, res) => {
    Task.create(req.body)
        .then(task => res.status(201).json({ task })) // Send the created task with a 201 status
        .catch(error => res.status(400).json({ error: error.message })); // Send error message with a 400 status
};


const patchTasks=(req,res)=>{
    return res.send('Sending patch requests');
}

const deleteTasks=(req,res)=>{
    return res.send('Deleting specified task');
}
module.exports = {getAllTasks,getSingleTask,postTasks,patchTasks,deleteTasks};