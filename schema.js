const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    name:String,
    completed:Boolean
})

module.exports=mongoose.model('Task',schema);