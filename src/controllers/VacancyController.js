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
router.get("/subscribedvacancies/:id",async (req,res)=>{

    try{
        const vacancies=await vacancyServices.getById(req.params.id);
        res.json(vacancies);
    } catch(err)
    {   
        res.json(err)
    }
  
})

module.exports = router;
