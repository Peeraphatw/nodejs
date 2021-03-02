const mongoose = require('mongoose');

const connectDB = async ()=>{
    const connection = await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser : true,
        useCreateIndex : true,
        useFindAndModify : false,
        useUnifiedTopology : true
    });
    console.log(`MongoDB Connect : ${connection.connection.host}`.blue.underline.bold);
}

module.exports = connectDB;