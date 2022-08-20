const AdminData = require('../models/AdminModel');
const User = require('../models/UserModel')
const logger = require('../logging/logger.js')
const Subscription= require('../models/SubscriptionModel');
const Vacancy = require('../models/VacancyModel');
const Department=require('../models/DepartmentModel');

function getAllAdminData() {
    return AdminData.find()
        .then((adminData) => {
            // logger.log.trace(masterData)
            return adminData          
        })
}

async function getAllSubscribedTeachers(vacancyId){
    //
    const teachers = await User.find();

    const vacancy= await Vacancy.find({vacancyId});
    const department=vacancy.department;
    const college=vacancy.college;
    const location =vacancy.location;

    const subscribedTeachers=[];

    for(let i=0;i<teachers.length;i++)
    {
        const subscription= await Subscription.find({$or:[{profileId:User.profileId,department,college},{profileId:User.profileId,department,location}]});
        if(subscription.length>0){
            subscribedTeachers.push(teachers[i]);
        }
    }
    return subscribedTeachers

}

async function getDashboard(collegeId){
    const departments=Department.find({collegeId})//capacity
    const vacancies=Vacancy.find({collegeId});//vacancy count
    const teachers=User.find({collegeId})//teachers count


    for(let i = 0; i < departments.length; i++){
        var vacCount = 0, teacherCount = 0;
        for(let j = 0; j < vacancies; j++){
            if(departments[i].name== vacancies[j].department){
                vacCount++;
            }
        }
        for(let j = 0; j < teachers; j++){
            if(departments[i].name == teachers[j].department){
                teacherCount++;
            }
        }
        departments[i].vacancyCount = vacCount;
        departments[i].teacherCount = teacherCount;

    }
    return departments;
}


module.exports = {
    getAllAdminData,
    getAllSubscribedTeachers,
    getDashboard
};