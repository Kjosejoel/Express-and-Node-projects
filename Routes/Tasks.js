const express=require('express')
const tasks=express.Router()
tasks.get('/',(req,res)=>{
    return res.send('Sending data....');
})

module.exports=tasks;