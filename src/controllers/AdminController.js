const express = require('express')
const router = express.Router();
const userServices = require('../service/UserService.js')
const logger = require('../logging/logger.js')
const Admin = require('../models/AdminModel');
const User = require('../models/UserModel.js');


router.post('/login', async (req, res, next) => {
    const { email, password} = req.body;
    try{
        const user = await userServices.login({email, password})
        const status = await Admin.findOne({email: email}) 
        if(user && status != null){
            User.findOneAndUpdate({email: email}, user);         
            res.status(200).json(user);
        } 
        else{
            res.json({ error: 'Email or password is incorrect' });
        }
    }
    catch(err){
        next(err);
    }
})


module.exports = router;