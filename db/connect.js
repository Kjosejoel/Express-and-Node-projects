const mongoose=require('mongoose');
const connectDB=async (url)=>{
    await mongoose.connect(url).then(console.log('Connected to database')
    ).catch((err)=>{console.log('Not connected',err);
    });
}
module.exports=connectDB;
