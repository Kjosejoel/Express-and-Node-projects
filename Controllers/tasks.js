const getAllTasks = (req, res) => {
    return res.send('Sending data....');
}

const getSingleTask=(req,res)=>{
    return res.send('Sending single data');
}

const postTasks=(req,res)=>{
    return res.json(req.body);
}

const patchTasks=(req,res)=>{
    return res.send('Sending patch requests');
}

const deleteTasks=(req,res)=>{
    return res.send('Deleting specified task');
}
module.exports = {getAllTasks,getSingleTask,postTasks,patchTasks,deleteTasks};