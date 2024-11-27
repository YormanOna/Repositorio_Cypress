import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://team:SIANSHYO@cluster0.ccwlf.mongodb.net"

const connectDb = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://team:SIANSHYO@cluster0.ccwlf.mongodb.net');
        console.log("DB is connected")
    }catch(error){
        console.log(error);
    }
};

export { connectDb };




