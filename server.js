const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger')
const morgan = require('morgan');
const colors = require('colors');
const connectionDB = require('./config/db');
const errorHandler = require('./middleware/error');
//router
const bootcamps = require('./routes/bootcamps');
//load config
dotenv.config({path: "./config/config.env"});

connectionDB();
const app = express();
//Body parser
app.use(express.json());
//Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// app.use(logger);
//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} in ${process.env.NODE_ENV} `.blue.bold);
})

//Handle unhandle Rejection
process.on("unhandledRejection",(err,promise) =>{
    console.log(`Unhandle Rejection , ${err.message}`.red.bold);
    server.close(() =>{
        process.exit(1);
    });
})