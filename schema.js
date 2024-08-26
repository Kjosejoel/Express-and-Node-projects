const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxlength:[20,"Can't add more than 20 characters"]
    },
    completed:{
        type:Boolean,
        default:false
    },
    important:{
        type:Boolean,
        default:false,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Task',schema);