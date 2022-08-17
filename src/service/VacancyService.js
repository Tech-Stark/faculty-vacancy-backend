const Vacancy = require('../models/VacancyModel');
const Subscription = require('../models/SubscriptionModel');
const User = require('../models/UserModel')
const { v4: uuidv4 } = require('uuid');

async function createVacancy(params){
    const vacancy = new Vacancy(params);
    vacancy.vacancyId = uuidv4();
    vacancy
        .save()
}
async function getAll()
{
    const vacancies = await Vacancy.find();
    return vacancies;
}
async function getById(user)
{
  
    const profile=await User.find({email:user.data});
    const profileId=profile[0].profileId
    const subscriptions=await Subscription.find({profileId});
    const vacancies = await Vacancy.find();
    let temp=[];
    for(let i=0;i< subscriptions.length;i++)
    {
        for(let j=0;j<vacancies.length;j++)
        {
            if(vacancies[j].department==subscriptions[i].department&&
                (subscriptions[i].colleges.includes(vacancies[j].college)
                ||(subscriptions[i].locations.includes(vacancies[j].location))))
                {
                    temp.push(vacancies[j])
                }
        }
    }
    return temp;
    
}

module.exports = {
   getAll,
   getById,
   createVacancy
  };