const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../service/UserService.js')
const profileServices = require('../service/ProfileService.js')
const logger = require('../logging/logger.js')



router.post('/register', (req, res, next) => {
    const {password} = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
    userServices
        .register(req.body, res)
})

router.post('/login', (req, res, next) => {
    const { email, password} = req.body;
    userServices.login({email, password}).then(user => {
            if(user){                
                res.status(200).json(user);
            } 
            else{
                res.json({ error: 'Email or password is incorrect' });
            }
        }
    ).catch(err => next(err))
})

/*
Gets profile by authorization token. 
*/
router.get('/profile', (req, res, next) => {
    logger.log.info("profile requested for user "+ req.user.data);
    profileServices.getProfile(req.user.data).then(
        (profile) =>{ 
            res.json(profile);
        }
    ).catch(err => next(err))
})

router.post('/update-profile', (req, res, next) => {
    logger.log.info("profile updated for user "+ req.user.data);
    profileServices.updateProfile(req.user.data, req.body, res)
})

router.get('/:id', (req, res, next) => {
    userServices.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})


module.exports = router;