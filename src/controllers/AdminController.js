const express = require('express')
const router = express.Router();
const userServices = require('../service/UserService.js')
const vacancyService = require('../service/VacancyService')
const logger = require('../logging/logger.js')
const Admin = require('../models/AdminModel');
const User = require('../models/UserModel.js');
const Mailer = require('../service/mailer')
const Constants = require('../Constants')


router.post('/login', async (req, res, next) => {
    const { email, password} = req.body;
    try{
        const user = await userServices.login({email, password})
        const status = await Admin.findOne({email: email}) 
        if(user && status != null){
            // User.findOneAndUpdate({email: email}, user);         
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


router.post("/createvacancy", async(req, res,next) =>{
    vacancyServices.createVacancy(req.body)
        .then(()=> {
            res.status(200).json({"status":"success"});
        })
    .catch(err => next(err));

})

router.post("/closevacancy/:id", async(req, res,next) =>{
    //when the position in filled

    vacancyServices.closeVacancyById(req.params.id)
        .then(()=> {
            // TODO:    
            res.status(200).json({"status":"success"});
        })
    .catch(err => next(err));

})

router.post('/deletevacancy/:id', async(req, res) => {
    vacancyServices.deleteVacancyById(req.params.id);
    res.json({success:"true"});
})

router.get('/getallteachers', async(req, res, next) => {
    
})

router.post('/mail/invite', async(req, res, next) => {
    const {vacancyId, profileIdList} = req.body;
    // send the url to all the profile email ids 
    vacancy = await vacancyService.getVacancyById(vacancyId);
    var mailingList =  []
    for(let i = 0; i < profileIdList.length; i++){
        var user = await User.getUserByProfileId(profileIdList[i]);
        mailingList.add(user.email);
    }
    for(let i = 0; i < mailingList.length; i++){
        var params = {}
        params.to = mailingList[i];
        params.subject  = Constants.MAIL_INVITE_SUBJECT
        params.text = Constants.MAIL_INVITE_TEXT + 'at ' + (vacancy.url != null? vacancy.url :'');
        Mailer.sendMail(params)
    }

}) 

module.exports = router;