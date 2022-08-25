const express = require('express')
const router = express.Router();
const superAdminService = require('../service/SuperAdminService');


router.get('/getsuperadmindashboard/:noOfDays', async (req, res, next) => {
    
        var noOfDays = req.params.noOfDays
        const dataSuperAdmin = superAdminService.getDashboard(noOfDays);
        res.json(dataSuperAdmin);
})

module.exports = router;