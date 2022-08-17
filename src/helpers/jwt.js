const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const logger = require('../logging/logger.js')
const Admin = require('../models/AdminModel')

// get password vars from .env file
dotenv.config();



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
    
        req.user = user
        Admin.findOne({email: req.user.data})
            .then((user)=>{
                if(user)
                    req.role = "user"
                else
                    req.role = "admin"
                logger.log.trace("role "+ req.role)
                next()
            })
    })
}

function generateAccessToken(email) {
    return jwt.sign({data: email}, process.env.TOKEN_SECRET, { expiresIn: '96h' });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}



