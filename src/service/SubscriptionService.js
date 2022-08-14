const Subscription = require('../models/SubscriptionModel');
const College =require('../models/CollegeModel.js')


async function getById(id) {
  
   const subscriptions = await Subscription.find({profileId:ids});
    return subscriptions

}

async function getByFilters(locations,colleges){
  
    const possibleColleges =await College.find({ $or:[ {"location":{"$in":locations}},{"name":{"$in":colleges}}]})
 
    const allDepartmentsSet= new Set();

    possibleColleges.forEach((clg)=>{clg.departments.forEach(allDepartmentsSet.add,allDepartmentsSet)});
    var allDepartments = [...allDepartmentsSet];

      var departments= new Map()
    for(let i=0;i<allDepartments.length;i++)
    { 
      let temp=[]
        for(let j=0;j<possibleColleges.length;j++)
        {
          if(possibleColleges[j].departments.includes(allDepartments[i]))
          {
            console.log(possibleColleges[j].name)
            temp.push(possibleColleges[j].name)
          }
        }
        console.log(temp)
        departments.set(allDepartments[i],temp)
    }

    var deps=[]

    departments.forEach(function(val,key)
    {
        deps.push({department:key,colleges:val})
    });
   // console.log(departments);
    return deps
} 
async function createSubscription(profileId,department,locations,colleges)
{
  const subscription = await Subscription.insertMany({profileId,department,locations,colleges});
  console.log(subscription)
  return subscription;
}



module.exports = {
  getById,
  getByFilters,
  createSubscription
};