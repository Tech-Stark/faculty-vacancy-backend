const express = require('express')
const router = express.Router();
const vacancyServices = require('../service/VacancyService.js')
const Vacancy = require('../models/VacancyModel');

router.get("/",async (req,res)=>{

    try{
        const vacancies= await vacancyServices.getAll();
        res.json(vacancies)
    } catch(err)
    {   
        res.json(err)
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
            res.status(200).json({"status":"success"});
        })
    .catch(err => next(err));

})

router.post("/", async(req, res,next) =>{
    vacancyServices.createVacancy(req.body)
        .then(()=> {
            res.status(200).json({"status":"success"});
        })
    .catch(err => next(err));

})
module.exports = router;
