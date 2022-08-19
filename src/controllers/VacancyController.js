const express = require('express')
const router = express.Router();
const vacancyServices = require('../service/VacancyService.js')
const Vacancy = require('../models/VacancyModel');
const masterDataService = require('../service/MasterDataService');
const userDataService = require('../service/UserService');
const logger = require('../logging/logger.js');

router.get("/",async (req,res)=>{

    try{
        const vacancies= await vacancyServices.getAll();
        res.json(vacancies)
    } catch(err)
    {   
        res.json(err)
    }
})
router.get("/getvacancyfordays/:noOfDays", async (req, res, next) => {
    try{
        var masterData = await masterDataService.getMasterData()
        logger.log.trace(masterData);
        var allUsers = await userDataService.getAllUsers()        
        logger.log.trace(allUsers)
        for(let i = 0; i < allUsers.length; i++){
            var dob = allUsers[i].dob;
            logger.log.trace(allUsers[i]);
            logger.log.trace(dob);
            dob.setFullYear(dob.getFullYear() + masterData.RetirementAge);
            logger.log.trace(dob)
            var todayDate = new Date();
            const days = (dob, todayDate) =>{
                let difference = dob.getTime() - todayDate.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                return TotalDays;
            }
            var diffDays = days(dob, todayDate);
            logger.log.trace(diffDays +" days to retirement");
            var tmp = [];
            var noOfDays = req.params.noOfDays
            console.log(diffDays);
            console.log(noOfDays)
            if(diffDays <= noOfDays){
                allUsers[i].exit = "pending";
                tmp.push(allUsers[i]);
            }
            else{
                if(allUsers[i].exit = "pending")
                    allUsers[i].exit = "none";
            }    
        }
        res.json(tmp);
    }
    catch(err){
        next(err);
    }
})

router.get("/subscribedvacancies",async (req,res,next)=>{
    try{
        const vacancies=await vacancyServices.getById(req.user);
        res.json(vacancies)
    } catch(err)
    {   
        res.json(err)
    }
  
})

module.exports = router;
