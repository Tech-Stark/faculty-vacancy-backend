const express = require('express')
const router = express.Router();
const userServices = require('../service/UserService.js')
const vacancyService = require('../service/VacancyService')
const adminService = require('../service/AdminService')
const logger = require('../logging/logger.js')
const Admin = require('../models/AdminModel');
const User = require('../models/UserModel.js');
const Mailer = require('../service/mailer')
const Constants = require('../Constants')
const bcrypt = require('bcryptjs')
const masterDataService = require('../service/MasterDataService')
const profileService = require('../service/ProfileService');
const College = require('../models/CollegeModel.js');

router.post('/login', async (req, res, next) => {

    const { email, password } = req.body;
    try {
        const user = await userServices.login({ email, password })
        const status = await Admin.findOne({ email: email })
        if (user && status != null) {
            // User.findOneAndUpdate({email: email}, user);         
            res.status(200).json(user);
        }
        else {
            res.json({ error: 'Email or password is incorrect' });
        }
    }
    catch (err) {
        next(err);
    }
})


router.post('/createvacancy', async (req, res, next) => {
    vacancyService.createVacancy(req.body)
        .then(() => {
            res.status(200).json({ "status": "success" });
        })
        .catch(err => next(err));

})

router.post('/createteacher', async (req, res, next) => {
    const { password } = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
    userServices
        .register(req.body, res)
})
// router.post("/closevacancy/:id", async(req, res,next) =>{
//     //when the position in filled

//     vacancyServices.closeVacancyById(req.params.id)
//         .then(()=> {
//             // TODO:    
//             res.status(200).json({"status":"success"});
//         })
//     .catch(err => next(err));

// })

router.get('/deletevacancy/:id', async (req, res) => {
    vacancyService.deleteVacancyById(req.params.id);
    res.json({ success: "true" });
})

router.get('/getallteachers', async (req, res, next) => {
    const teachers = await userServices.getAllTeachers();
    res.json(teachers);
})

router.get('/getmycollegeteachers', async (req, res, next) => {
    const adminCollege = req.collegeId;
    const teachers = await userServices.getCollegeTeachers(adminCollege);
    res.json(teachers)
})

router.get('/getvacancyfordays/:noOfDays', async (req, res, next) => {
    try {
        var masterData = await masterDataService.getMasterData()
        logger.log.trace(masterData);
        var allUsers = await userServices.getCollegeTeachers(req.collegeId)
        logger.log.trace(allUsers)
        for (let i = 0; i < allUsers.length; i++) {
            var dob = allUsers[i].dob;
            logger.log.trace(allUsers[i]);
            logger.log.trace(dob);

            if (dob == null) continue;
            console.log(dob)
            console.log(masterData)
            dob.setFullYear(dob.getFullYear() + masterData.RetirementAge);
            logger.log.trace(dob)
            var todayDate = new Date();
            const days = (dob, todayDate) => {
                let difference = dob.getTime() - todayDate.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return TotalDays;
            }
            var diffDays = days(dob, todayDate);
            logger.log.trace(diffDays + " days to retirement");
            var tmp = [];
            var noOfDays = req.params.noOfDays
            console.log(diffDays);
            console.log(noOfDays)
            if (diffDays <= noOfDays && (allUsers[i].exit == "none" || allUsers[i].exit == "pending")) {
                allUsers[i].exit = "pending";
                tmp.push(allUsers[i]);
            }

        }
        res.json(tmp);
    }
    catch (err) {
        next(err);
    }
})

router.get('/profilebyprofileId/:profileId', async (req, res, next) => {

    var profile = await profileService.getProfileByProfileId(req.params.profileId)
    console.log(profile)
    res.json(profile)
})

router.post('/mail/invite', async (req, res, next) => {
    const { vacancyId, profileIdList } = req.body;
    // send the url to all the profile email ids 
    vacancy = await vacancyService.getVacancyById(vacancyId);
    var mailingList = []
    for (let i = 0; i < profileIdList.length; i++) {
        var user = await User.getUserByProfileId(profileIdList[i]);
        mailingList.add(user.email);
    }
    for (let i = 0; i < mailingList.length; i++) {
        var params = {}
        params.to = mailingList[i];
        params.subject = Constants.MAIL_INVITE_SUBJECT
        params.text = Constants.MAIL_INVITE_TEXT + 'at ' + (vacancy.url != null ? vacancy.url : '');
        Mailer.sendMail(params)
    }

})

router.get('/getongoingvacancies', async (req, res, next) => {
    try {
        const ongoingVac = await vacancyService.getOngoingVacancies(req.collegeId);
        res.json(ongoingVac)
    }
    catch (err) {
        next(err);
    }
})

router.get('/getcompletedvacancies', async (req, res, next) => {
    try {
        const completedVac = await vacancyService.getCompletedVacancies(req.collegeId)
        res.json(completedVac)
    }
    catch (err) {
        next(err);
    }
})

router.post('/markcompleted/:vacancyId', async (req, res, next) => {
    try {
        const vacancy = await vacancyService.markCompleted(req.params.vacancyId);

        res.json({ success: "true" })
    }
    catch (err) {
        next(err)
    }
})

router.get('/getsubscribedteachers/:vacancyId', async (req, res, next) => {
    try {

        const teachers = await adminService.getAllSubscribedTeachers(req.params.vacancyId);
        res.json(teachers)
    }
    catch (err) {
        next(err);
    }
})

router.get('/dashboarddata', async (req, res, next) => {
    const collegeId = req.collegeId
    const departments = await adminService.getDashboard(collegeId);

    res.json(departments);



})

router.post('/createcollege', async (req, res) => {
    const college = await adminService.createCollege(req.body)
    res.json(college)
})
// router.post('/microservice/mail', async(req, res, next) =>{
//     var params = {}
//     const params.to = req.to;
//     const params.subject = req.email;
//     const 
// })

router.get('/getmycollege',async(req,res)=>{
    const collegeId=req.collegeId;

    const newcollege=await adminService.getMyCollege(collegeId)
   

    res.json(newcollege)

})

router.get('/getdepartments',async(req,res)=>{
    const collegeId=req.collegeId;

    const departments=await adminService.getDepartments(collegeId)

    res.json(departments)
})

// total capacity post req

// 
module.exports = router;