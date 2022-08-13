const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { unless } = require("express-unless");
const port = process.env.PORT || 3000

const auth = require('./helpers/jwt.js');
const users = require('./controllers/UserController.js')
const subscriptions = require('./controllers/SubscriptionController.js')
const errors = require('./helpers/errorHandler.js')
const logger = require('./logging/logger.js');
const Subscription = require('./models/SubscriptionModel.js');

app.use(cors());
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
});
app.use(express.json()) // middleware for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

// middleware for authenticating token submitted with requests
auth.authenticateToken.unless = unless
// app.use(auth.authenticateToken.unless({
//     path: [
//         { url: '/', methods: ['GET']},
//         { url: '/users/login', methods: ['POST']},
//         { url: '/users/register', methods: ['POST']},
//         { url: '/users/refreshToken', methods: ['POST']}
//     ]
// }))

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello World!"})
})
app.use('/users', users) // middleware for listening to routes
app.use('/subscriptions', subscriptions) 
app.use(errors.errorHandler); // middleware for error responses

// MongoDB connection, success and error event responses
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => logger.log.error('connection error:'));
db.once('open', () => logger.log.info(`Connected to mongo at ${uri}`));

app.listen(port, () => {
    logger.log.info(`Example app listening on port ${port}`)
})