const AdminData = require('../models/AdminModel');
const User = require('../models/UserModel')
const logger = require('../logging/logger.js')
const Subscription= require('../models/SubscriptionModel');
const Vacancy = require('../models/VacancyModel');
const Department=require('../models/DepartmentModel');
const College =require('../models/CollegeModel')

function getAllAdminData() {
    return AdminData.find()
        .then((adminData) => {
            // logger.log.trace(masterData)
            return adminData          
        })
}

async function getAllSubscribedTeachers(vacancyId){
    //
    const newteachers=await User.find({exit:"none"});
    const teachers=newteachers.filter(checknotadmin)
    function checknotadmin(newteacher)
    {
        return (newteacher.email!="admin@nitdgp.com"&&newteacher.email!="superadmin@aicte.com")
    }

    const vacancy= await Vacancy.findOne({vacancyId});
    console.log(vacancy)
    const department=vacancy.department;
    const college=vacancy.college;
    const location =vacancy.location;

    const subscribedTeachers=[];

    for(let i=0;i<teachers.length;i++)
    {
        const subscription= await Subscription.find({$or:[{profileId:teachers[i].profileId,department,college},{profileId:teachers[i].profileId,department,location}]});
        if(subscription.length>0){
            subscribedTeachers.push(teachers[i]);
        }
    }
    return subscribedTeachers

}

async function getDashboard(collegeId){
    const departments=await Department.find({collegeId})//capacity
    const vacancies=await Vacancy.find({collegeId});//vacancy count
    const newteachers=await User.find({collegeId});
    const teachers=newteachers.filter(checknotadmin)
    function checknotadmin(newteacher)
    {
        return (newteacher.email!="admin@nitdgp.com"&&newteacher.email!="superadmin@aicte.com")
    }
    const deps=[]
    console.log(vacancies)
    for(let i = 0; i < departments.length; i++){
        var vacCount = 0, teacherCount = 0;
        for(let j = 0; j < vacancies.length; j++){
            if(departments[i].name== vacancies[j].department){
                vacCount++;
            }
        }
        for(let j = 0; j < teachers.length; j++){
            if(departments[i].name == teachers[j].department){
                teacherCount++;
            }
        }
        var newdep={...departments[i]._doc}
        newdep.vacancyCount = vacCount;
        newdep.teacherCount = teacherCount;
        deps.push(newdep)
    }
    return deps;
}

async function createCollege(params)
{
    const college = await College.insertMany(params)
    return college
}

async function getMyCollegeData(collegeId)
{
    const college=await College.findOne({collegeId});
    const departments= await Department.find({collegeId});
    var newcollege;

    newcollege={"collegeId":collegeId,"collegeName":college.name,"departments":departments};
    
    return newcollege
}



module.exports = {
    getAllAdminData,
    getAllSubscribedTeachers,
    getDashboard,
    createCollege,
    getMyCollegeData
};