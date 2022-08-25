const College =require('../models/CollegeModel')
const adminService = require('../service/AdminService')

function getDashboard(days){
    // const clgs = await College.find();
    // const collegeName = clgs.map((clg)=>clg.name);
    // const collegeId = await College.find({collegeId});
    // const collegeData=[];

    // for(let i = 0; i<clgs.length; i++){
    //     const lengthOfRetiringTeachers = adminService.getVacancyForDays(days).length;
    //     const lengthOfNotCreatedVacancyTeachers = adminService.getVacancy
    // }

    const data=[{"collegeId":"1","collegeName":"National Institute of Technology Durgapur","currentVacancies":"10","createdVacancies":"9","pendingVacancies":"1"},{"collegeId":"2","collegeName":"National Institute of Technology Surathkal", "currentVacancies":"24","createdVacancies":"5","pendingVacancies":"19"}]
    return data; 
}

module.exports = {
    getDashboard,
};