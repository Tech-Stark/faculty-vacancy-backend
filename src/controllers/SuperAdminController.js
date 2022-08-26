const express = require('express')
const router = express.Router();
const superAdminService = require('../service/SuperAdminService');


router.get('/getsuperadmindashboard/colleges/:noOfDays', async (req, res, next) => {
    
        var noOfDays = req.params.noOfDays
        const dataSuperAdmin = await superAdminService.getDashboardByColleges(noOfDays);
        res.json(dataSuperAdmin);
})

router.post('/getsuperadmindashboard/collegeanddepartment/:noOfDays', async (req, res, next) => {
    
        var noOfDays = req.params.noOfDays
        var collegeId=req.body.collegeId;
        var department=req.body.department;
        const dataSuperAdmin = await superAdminService.getDashboardByCollegeAndDepartment(noOfDays,collegeId,department);
        res.json(dataSuperAdmin);
})
router.get('/getsuperadmindashboard/locations/:noOfDays', async (req, res, next) => {
    
        var noOfDays = req.params.noOfDays
        const dataSuperAdmin = await superAdminService.getDashboardByLocations(noOfDays);
        res.json(dataSuperAdmin);
})

module.exports = router;