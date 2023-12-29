require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// express
const express = require('express');
const server = express();

// connect DB
const DBConnection = require('./db/connectDB');

// authentication middleware import to protect user
const authenticateUser = require('./middleware/authentication')

// auth & job router imports
const authRouter = require('./routes/authRoute');
const jobsRouter = require('./routes/jobRoute');

// error handler middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// enable if your app behind a reverse proxy
server.set('trust proxy', 1);

// setup for rate limiter middleware
server.use(rateLimiter({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100              // limit each IP to 100 requests per windowMs
}))

// to use json data
server.use(express.json());

// middleware setup for additional packages
server.use(helmet())
server.use(cors())
server.use(xss())

// Swagger UI setup
const swaggerUI = require('swagger-ui-express')
const yaml = require('yamljs')

// const swaggerDocument = yaml.load('');


// home route
server.get('/', (req,res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
})

// server.use()

// login & register routes
server.use('/api/v1/auth',authRouter);

// jobsAPI route
server.use('/api/v1/jobs', authenticateUser, jobsRouter);

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