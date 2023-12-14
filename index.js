require('dotenv').config();
const express = require('express');
const server = express();

// connect DB
const DBConnection = require('./db/connectDB');

// auth related router
const authRouter = require('./routes/authRoute');
const jobsRouter = require('./routes/jobRoute');

// error handler middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// to use json data
server.use(express.json());

// home route
server.get('/', (req,res) => {
    res.send('Jobs api');
})

// login & register routes
server.use('/api/v1/auth',authRouter);

// jobsAPI route
server.use('/api/v1/jobs',jobsRouter);

server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

const portNo = process.env.PORT || 6464;
const Mongo_URI = process.env.mongoURL;

const start = async () => {
    try {
        await DBConnection(Mongo_URI)
        .then(() => console.log('DB Connected'))
        server.listen(portNo, () => {
            console.log(`Server is listening on port ${portNo}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();