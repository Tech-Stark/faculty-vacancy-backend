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

    const data=[{"collegeId":"1","collegeName":"National Institute of Technology, Durgapur","currentVacancies":"10","createdVacancies":"9","pendingVacancies":"1"},{"collegeId":"2","collegeName":"National Institute of Technology, Surathkal", "currentVacancies":"24","createdVacancies":"5","pendingVacancies":"19"}, {"collegeId":"3","collegeName":"Indian Institute of Technology, Bombay","currentVacancies":"30","createdVacancies":"28","pendingVacancies":"2"}, {"collegeId":"4","collegeName":"National Institute of Technology, Rourkela","currentVacancies":"12","createdVacancies":"12","pendingVacancies":"0"}, {"collegeId":"5","collegeName":"Indian Institute of Technology (Banaras Hindu University), Varanasi","currentVacancies":"44","createdVacancies":"43","pendingVacancies":"1"}, {"collegeId":"6","collegeName":"Indian Institute of Technology, Kharagpur","currentVacancies":"15","createdVacancies":"2","pendingVacancies":"13"}, {"collegeId":"8","collegeName":"Indian Institute of Technology, Delhi","currentVacancies":"22","createdVacancies":"10","pendingVacancies":"12"}, {"collegeId":"9","collegeName":"Delhi Technological University, Delhi","currentVacancies":"7","createdVacancies":"7","pendingVacancies":"0"}, {"collegeId":"10","collegeName":"National Institute of Technology, Bhopal","currentVacancies":"21","createdVacancies":"20","pendingVacancies":"1"}, {"collegeId":"11","collegeName":"Indian Institute of Technology, Roorkee","currentVacancies":"0","createdVacancies":"0","pendingVacancies":"0"}, {"collegeId":"12","collegeName":"Indian Institute of Technology, Guwahati","currentVacancies":"18","createdVacancies":"9","pendingVacancies":"9"}]
    return data; 
}

module.exports = {
    getDashboard,
};